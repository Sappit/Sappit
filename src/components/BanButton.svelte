<span
  class="btn-ban"
  {...disabled(busy || isBanned)}
  class:text-success={isBanned}
  on:click|preventDefault|stopPropagation={prompt}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if isBanned}
      unbanning
    {:else}
      banning
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-floppy"/>
    {#if isBanned}
      banned
    {:else}
      ban
    {/if}
  {/if}
  {#if false}
  <b-modal v-model="showingBanModal" title="Ban User" size="md" no-close-on-backdrop="no-close-on-backdrop"
      scrollable="scrollable" lazy="lazy" on:click|preventDefault|stopPropagation>
    {#if existingBan}
      <div class="alert alert-warning">
        { name } is already banned! <TimeAgo value={existingBan.date} />
        {#if existingBan.note}
          <span class="badge badge-secondary">note: { existingBan.note }</span>
        {/if}
      </div>
    {/if}
    <a href="/r/{item.subreddit}/about/banned">Banned Users Page</a>
    {#if !existingBan}
      <div class="form-group">
        <label>who to ban:</label>
        <input
          class="form-control"
          bind:value={name}
        />
      </div>
      <div class="form-group">
        <select
          class="form-control r-select"
          id="exampleFormControlSelect1"
          bind:value={selectedReason}
        >
          {#if rules && rules.length}
          <optgroup label="Subreddit Rules">
            {#each rules as rule, index}
              <option value={rule}>
                {rule.short_name || rule.violation_reason}
              </option>
            {/each}
          </optgroup>
          {/if}
          {#if site_rules && site_rules.length}
          <optgroup label="Site Rules">
            {#each site_rules as rule, index}
              <option value={rule}>
                {rule}
              </option>
            {/each}
          </optgroup>
          {/if}
          <option value="other">other</option>
        </select>
        {#if selectedReason && selectedReason.description_html}
          <div class="alert alert-info">{@html selectedReason.description_html}</div>
        {/if}
      </div>
      <div class="form-group">
        <label>duration:</label>
        <input
          class="form-control"
          value={duration}
          on:change={(event) => duration = event.target.value}
        />
        <em class="text-muted">1 to 999, blank is permanent</em>
      </div>
      <div class="form-group">
        <label>Mod Log Note:</label>
        <input
          class="form-control"
          value={note}
          on:change={(event) => note = event.target.value}
        />
      </div>
      <div class="form-group">
        <label>Ban Message:</label>
        <textarea
          class="form-control"
          value={ban_message}
          on:input={(event) => ban_message = event.target.value}
        ></textarea>
      </div>
      {#if error}
        <ErrorAlert value={error} />
      {/if}
      {#if success}
        <div class="alert alert-success"><tt><pre>{success}</pre></tt></div>
      {/if}
      <div class="w-100" v-slot="modal-footer">
        <div class="btn-group float-right">
          {#if !success}
            <button
              class="btn btn-sm btn-primary"
              {...disabled(busy)}
              on:click|preventDefault|stopPropagation={() => showingBanModal=false}
            >CANCEL</button>
          {/if}
          {#if success}
            <button
              class="btn btn-sm btn-primary"
              {...disabled(busy)}
              on:click|preventDefault|stopPropagation={() => showingBanModal=false}
            >DONE</button>
          {/if}
          {#if !success}
            <button
              class="btn btn-sm btn-primary"
              {...disabled(busy)}
              on:click|preventDefault|stopPropagation={ban}
            >BAN</button>
          {/if}
        </div>
      </div>
    {/if}
  </b-modal>
  {/if}
</span>

<script>
import isString from 'lodash/isString';
import { startMinWait } from '~/lib/sleep';
import ErrorAlert from '~/components/ErrorAlert';
import TimeAgo from '~/components/TimeAgo';
import reddit from '~/lib/reddit';
import disabled from '~/lib/disabled';
import validatePropArray from '~/lib/validateProp/array';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropObject from '~/lib/validateProp/object';
import validatePropString from '~/lib/validateProp/string';
// ban is the moderator action of banning a user from subreddit participation

// props
export let item;
let busy = false;
let error = null;
let success = null;
let showingBanModal = false;
let rules = null;
let site_rules = null;
let existingBan = null;
let selectedReason = null;
let name = null;
let duration = null;
let note = null;
let ban_message = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);
$: validatePropBoolean(showingBanModal);
$: rules===null || validatePropArray(showingBanModal);
$: site_rules===null || validatePropArray(site_rules);
$: existingBan===null || validatePropObject(existingBan);
$: selectedReason===null || validatePropObject(selectedReason);
$: name===null || validatePropString(name);
$: duration===null || validatePropString(duration);
$: note===null || validatePropString(note);
$: ban_message===null || validatePropString(ban_message);
$: isBanned = item.isSappitBanned

async function prompt($event) {
  if (showingBanModal) return;
  const { subreddit, name } = item;
  const responses = {};

  try {
    busy = true;
    showingBanModal = true;

    name = item.author;

    // check if already banned
    const bannedListReponse = await reddit.get(
      `/r/${subreddit}/about/banned`,
      {
        params: {
          user: name,
        },
      },
    );

    existingBan = bannedListReponse.data.data.children[0];

    const srRulesResponse = await reddit.get(
      `/r/${subreddit}/about/rules`,
    );

    rules = srRulesResponse.data.rules;
    site_rules = srRulesResponse.data.site_rules;

    selectedReason = rules[0] || site_rules[0];
  } finally {
    busy = false;
  }
}
async function ban(payload) {
  const { author, subreddit, isSappitBanned } = item;
  const minWait = startMinWait();

  const ban_reason = (() => {
    if (selectedReason) {
      if (selectedReason.violation_reason) {
        return selectedReason.violation_reason;
      }
      if (isString(selectedReason)) {
        return selectedReason;
      }
    }
    return null;
  })();

  try {
    busy = true;
    const response = await reddit.post(`/r/${subreddit}/api/friend`, {
      // ban_context: 'fullname of a thing' // we'll assuem subreddit fullname for now
      // ban_context: subreddit_id,
      // ban_message: 'markdown to pm to le banned user'
      ban_message: ban_message,
      // ban_reason: 'up to 100 characters, usually straight from rule.violation_reason'
      ban_reason,
      // container: ???
      // duration: an integer between 1 and 999,
      duration: duration,
      // name: 'le banned username',
      name: name,
      // note: 'private note for mod team',
      note: note,
      api_type: 'json',
      type: 'banned',
    });
    item.isSappitBanned = !isSappitBanned;

    success = 'Banned!';
  } catch (err) {
    console.error(err);
    error = err;
  } finally {
    await minWait;
    busy = false;
    item = item;
  }
}
</script>
