<span
  class="btn-contributor"
  {...disabled(busy || isContributorned)}
  class:text-success={isContributorned}
  on:click|preventDefault|stopPropagation={prompt}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
  {:else}
    <i class="fa fa-fw fa-btn fa-plus"/>
  {/if}
  {#if busy && isContributorned}
    <span>uncontributorning</span>
  {:else if busy && !isContributorned}
    <span>contributorning</span>
  {:else if isContributorned}
    <span>contributorned</span>
  {:else}
    <span>contributor</span>
  {/if}
  {#if false}
  <b-modal v-model="showingContributorModal" title="Contributor User" size="md"
      no-close-on-backdrop="no-close-on-backdrop" scrollable="scrollable" lazy="lazy"
      on:click|preventDefault|stopPropagation>
    {#if existingContributor}
    <div class="alert alert-warning">
      { name } is already contributorned! <TimeAgo value={existingContributor.date} />
      {#if existingContributor.note}
        <span class="badge badge-secondary">note: { existingContributor.note }</span>
      {/if}
    </div>
    {/if}
    <a href="/r/{item.subreddit}/about/contributors">Contributors Page</a>
    {#if !existingContributor}
      <div class="form-group">
        <label>who to contributor:</label>
        <input
          class="form-control"
          bind:value={name}
        />
      </div>
      {#if success}
        <div class="alert alert-success">{success}</div>
      {/if}
      {#if error}
        <ErrorAlert value={error} />
      {/if}
      <div class="w-100" v-slot="modal-footer">
        <div class="btn-group float-right">
          {#if !success}
            <button
              class="btn btn-sm btn-primary"
              {...disabled(busy)}
              on:click|preventDefault|stopPropagation={() => showingContributorModal=false}
            >CANCEL</button>
          {/if}
          {#if success}
            <button
              class="btn btn-sm btn-primary"
              {...disabled(busy)}
              on:click|preventDefault|stopPropagation={() => showingContributorModal=false}
            >DONE</button>
          {/if}
          {#if !success}
            <button
              class="btn btn-sm btn-primary"
              {...disabled(busy)}
              on:click|preventDefault|stopPropagation={contributor}
            >ADD</button>
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
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropContributor from '~/lib/validateProp/contributor';
import validatePropString from '~/lib/validateProp/string';

// contributor is the moderator action of contributorning a user from subreddit participation

// props
export let item;
let showingContributorModal = false;
let busy = false;
let error = null;
let success = null;
let existingContributor = null;
let name = null;
let duration = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);
$: validatePropBoolean(showingContributorModal);
$: existingContributor===null || validatePropContributor(existingContributor);
$: name===null || validatePropString(name);
$: duration===null || validatePropString(duration);
$: isContributorned = item && item.isSappitContributorned;

async function prompt($event) {
  if (showingContributorModal) return;
  const { subreddit, name } = item;
  const responses = {};

  try {
    busy = true;
    showingContributorModal = true;

    name = item.author;

    // check if already contributorned
    const contributornedListReponse = await reddit.get(
      `/r/${subreddit}/about/contributors`,
      {
        params: {
          user: name,
        },
      },
    );

    existingContributor =
      contributornedListReponse.data.data.children[0];
  } finally {
    busy = false;
  }
}
async function contributor(payload) {
  const { isSappitContributorned } = item;
  const { author, subreddit } = item.data;
  const minWait = startMinWait();

  try {
    busy = true;
    const response = await reddit.post(`/r/${subreddit}/api/friend`, {
      // name: 'le contributorned username',
      name: name,
      api_type: 'json',
      type: 'contributor',
    });
    item.isSappitContributorned = !isSappitContributorned;

    success = 'Contributorned!';
  } catch (err) {
    console.error(err);
    error = err;
  } finally {
    await minWait;
    busy = false;
  }
}
</script>

