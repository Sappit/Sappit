<span
  class="cursor-pointer"
  on:click|preventDefault|stopPropagation={prompt}
>
  <i class="fa fa-fw fa-btn fa-megaphone"/>
  report
</span>
{#if showingReportModal}
  <div class="card border-warning">
    <div class="card-header">
      Report Content
    </div>
    <div class="card-body">
      {#if reportState.step===0}
        <div class="form-group">
          <label>Reporting Category?</label>

          <div role="radiogroup" tabindex="-1">
            <div class="w-100 custom-control custom-control-inline custom-radio">
              <input
                type="radio"
                autocomplete="off"
                class="custom-control-input"
                value={-1}
                bind:group={reportState.step0}
              >
              <label
                class="custom-control-label cursor-pointer"
                on:click|preventDefault|stopPropagation={() => reportState.step0 = -1}
              >It breaks r/{ item.subreddit }'s rules</label>
            </div>
          </div>
        </div>
      {/if}
      {#if reportState.step===1 && reportState.step0 === -1}
        <div
          class="form-group sub-rules"
          on:click|preventDefault|stopPropagation
        >
          <label>r/{ item.subreddit } Rules</label>
          {#if !(reportState.rules.length > 0)}
            <p class="text-muted">
              <em>
                r/{ item.subreddit } has not configured any rule metadata.
              </em>
            </p>
          {/if}

          <div role="radiogroup" tabindex="-1">
            {#if reportState.rules.length > 0}
              {#each reportState.rules as rule, index}
                <div class="w-100 custom-control custom-control-inline custom-radio">
                  <input
                    type="radio"
                    autocomplete="off"
                    class="custom-control-input"
                    value={index}
                    bind:group={reportState.step1}
                  >
                  <label
                    class="custom-control-label cursor-pointer"
                    on:click|preventDefault|stopPropagation={() => reportState.step1 = index}
                  >{ rule.violation_reason }</label>
                </div>
              {/each}

              <div class="w-100 custom-control custom-control-inline custom-radio">
                <input
                  type="radio"
                  autocomplete="off"
                  class="custom-control-input"
                  value="other"
                  bind:group={reportState.step1}
                >
                <label
                  class="custom-control-label cursor-pointer"
                  on:click|preventDefault|stopPropagation={() => reportState.step1 = 'other'}
                >Other: </label>
              </div>
              <input
                class="form-control"
                bind:value={reportState.other_reason}
                class:disabled={(reportState.step1 !== 'other')}
                disabled={(reportState.step1 !== 'other')}
                placeholder="max 100 characters"
              />
              {#if reportState.other_reason}
                <p
                  class:text-danger={(reportState.other_reason||'').length > 100}
                >
                  { (reportState.other_reason||'').length }/100
                </p>
              {/if}
            {/if}
          </div>
        </div>
      {/if}
      {#if reportState.completeErr}
        <ErrorAlert value={reportState.completeErr}/>
      {/if}
      {#if reportState.completeMsg}
        <div class="alert alert-success">{reportState.completeMsg}</div>
      {/if}
      {#if !reportState.completeMsg}
        <ShowSource value={({payload})} />
      {/if}
    </div>
    <div class="card-footer">
      <div class="w-100">
        <div class="btn-group float-right">
          {#if !reportState.completeMsg}
            <button
              class="btn btn-sm btn-primary"
              on:click|preventDefault|stopPropagation={() => showingReportModal=false}
            >
              CANCEL
            </button>
          {/if}
          {#if reportState.completeMsg}
            <button
              class="btn btn-sm btn-primary"
              on:click|preventDefault|stopPropagation={() => showingReportModal=false}
            >
              DONE
            </button>
          {/if}
          {#if showReportModalSubmit}
            <button
              class="btn btn-sm btn-primary"
              class:disabled={(disableReportModalSubmit)}
              disabled={(disableReportModalSubmit)}
              on:click|preventDefault|stopPropagation={reportModalSubmit}
            >
              SUBMIT
            </button>
          {/if}
          {#if showReportModalNext}
            <button
              class="btn btn-sm btn-primary"
              class:disabled={(disableReportModalNext)}
              disabled={(disableReportModalNext)}
              on:click|preventDefault|stopPropagation={reportModalNext}
            >
              NEXT
            </button>
          {/if}
        </div>
        <div class="report-form-content-policy">
          <p on:click|preventDefault|stopPropagation>
            Read the
            <a rel="nofolloow" target="_blank" href="https://www.reddit.com/help/contentpolicy">
              Reddit Content Policy
            </a>
            and
            <a href="/r/{item.subreddit}/about/rules">
              r/{ item.subreddit }'s rules
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import ShowSource from '~/components/ShowSource';
import get from 'lodash/get';
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropObject from '~/lib/validateProp/object';
import validatePropString from '~/lib/validateProp/string';

function init_report_state() {
  return {
    step0: null,
    step1: null,
    step: 0,
    rules: [],
    site_rules: [],
    site_rules_flow: [],
    completeErr: null,
    completeMsg: null,
  };
}

// props
export let item;
let busy = false;
let error = null;
let showingReportModal = false;
let additional_info = '';
let reportState = init_report_state();

$: validatePropItem(item);
$: validatePropBoolean(busy);
$: validatePropBoolean(showingReportModal);
$: validatePropString(additional_info);
$: validatePropObject(reportState);
$: showReportModalSubmit = getShowReportModalSubmit(reportState);
$: showReportModalNext = getShowReportModalNext(reportState, showReportModalSubmit);
$: disableReportModalSubmit = getDisableReportModalSubmit(reportState);
$: disableReportModalNext = getDisableReportModalNext(reportState);
$: payload = getPayload(item, reportState)

function getShowReportModalSubmit(reportState) {
  const { step, step0, site_rules_flow, completeMsg } = reportState;
  if (completeMsg) return false;
  if (step === 0) {
    if (step0 >= 0 && site_rules_flow[step0]) {
      return true;
      // @todo finish implementing nested site-rules
      // return !site_rules_flow[step0].nextStepHeader;
    }
    return false;
  }
  return true;
}
function getShowReportModalNext(reportState, showReportModalSubmit) {
  const { step, step0, completeMsg } = reportState;
  if (completeMsg) return false;
  if (showReportModalSubmit) return false;
  return true;
}
function getDisableReportModalSubmit(reportState) {
  const { step, step0 } = reportState;
  if (step === 0 && step0 === null) return true;
  return false;
}
function getDisableReportModalNext(reportState) {
  if (showReportModalSubmit) return true;
  const { step, step0 } = reportState;
  if (step === 0 && step0 === null) return true;
  return false;
}

function getPayload (item, reportState) {
  const { name } = item;

  const reason = (() => {
    const { step, step0, step1, rules, site_rules_flow } = reportState;
    // subreddit rules
    if (step0 === -1) {
      if (step1 === 'other') {
        return 'other';
      }
      if (rules[step1] && rules[step1].violation_reason) {
        return rules[step1].violation_reason;
      }
    }
    // site rules
    // @todo finish implementing nested subrules
    if (step0 >= 0) {
      if (site_rules_flow[step0] && site_rules_flow[step0].reasonText) {
        return site_rules_flow[step0].reasonText;
      }
    }
    return void 0;
  })();
  const site_reason = (() => {
    const { step, step0, step1, rules, site_rules_flow } = reportState;
    // site rules
    // @todo finish implementing nested subrules
    if (step0 >= 0) {
      if (site_rules_flow[step0] && site_rules_flow[step0].reasonText) {
        return site_rules_flow[step0].reasonText;
      }
    }
    return void 0;
  })();
  const rule_reason = (() => {
    const { step, step0, step1, rules, site_rules_flow } = reportState;
    // subreddit rules
    if (step0 === -1) {
      if (step1 === 'other') {
        return 'other';
      }
      if (rules[step1] && rules[step1].violation_reason) {
        return rules[step1].violation_reason;
      }
    }
    return void 0;
  })();

  const payload = {
    api_type: 'json',
    thing_id: name,
    // modmail_conv_id: base36 modmail conversation id
    other_reason: reportState.step1 ? reportState.other_reason : void 0,
    reason: reason, // sub reason
    // rule_reason: rule_reason || void 0,
    site_reason: site_reason || void 0,
  };

  return payload;
}

async function reportModalSubmit() {
  try {
    const payload = getPayload(item, reportState);

    const response = await reddit.post('/api/report', payload);
    if (get(response.data, 'json.errors.length')) {
      reportState.completeMsg = null;
      reportState.completeErr = response.data.json.errors;
    } else {
      reportState.completeMsg = 'Thank you for your report!';
      reportState.completeErr = null;
    }
    item.reported = true;
  } catch (err) {
    reportState.completeMsg = null;
    reportState.completeErr = err;
  } finally {
    reportState = reportState;
    item = item;
  }
}
async function prompt($event) {
  if (showingReportModal) return;
  const { subreddit, name } = item;
  const responses = {};

  const srRulesResponse = await reddit.get(
    `/r/${subreddit}/about/rules`,
  );

  const { rules, site_rules, site_rules_flow } = srRulesResponse.data;
  Object.assign(reportState, { rules, site_rules, site_rules_flow });
  // reportState.rules = rules;
  // console.log({ rules, site_rules, site_rules_flow });

  showingReportModal = true;
  reportState = reportState;
}
function resetReportState() {
  reportState = init_report_state();
}
function reportModalNext() {
  reportState.step++;
  reportState = reportState;
}
</script>
