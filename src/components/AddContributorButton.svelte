<span
  class="btn-contributor"
  class:text-success={item.isSappitContributorned}
  on:click|preventDefault|stopPropagation={prompt}
>
  <i class="fa fa-fw fa-btn fa-plus"/>
  {#if item.isSappitContributorned}
    <span>contributorned</span>
  {:else}
    <span>contributor</span>
  {/if}
</span>

{#if showingContributorModal}
  <div class="card border-info">
    <div class="card-header">
      Add User as Contributor
    </div>
    <div class="card-body">
      {#if existingContributor}
        <div class="alert alert-warning">
          { add_username } is already contributorned!
          <TimeAgo value={existingContributor.date} />
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
            bind:value={add_username}
          />
        </div>
        {#if success}
          <div class="alert alert-success">{success}</div>
        {/if}
        {#if error}
          <ErrorAlert value={error} />
        {/if}
      {/if}
    </div>
    <div class="card-footer w-100">
      <div class="btn-group float-right">
        {#if !success}
          <button
            class="btn btn-sm btn-primary"
            class:disabled={(busy)}
            disabled={(busy)}
            on:click|preventDefault|stopPropagation={() => showingContributorModal=false}
          >CANCEL</button>
        {/if}
        {#if success}
          <button
            class="btn btn-sm btn-primary"
            class:disabled={(busy)}
            disabled={(busy)}
            on:click|preventDefault|stopPropagation={() => showingContributorModal=false}
          >DONE</button>
        {/if}
        {#if !success}
          <button
            class="btn btn-sm btn-primary"
            class:disabled={(busy)}
            disabled={(busy)}
            on:click|preventDefault|stopPropagation={contributor}
          >ADD</button>
        {/if}
      </div>
    </div>
  </div>
{/if}


<script>
import isString from 'lodash/isString';
import { startMinWait } from '~/lib/sleep';
import ErrorAlert from '~/components/ErrorAlert';
import TimeAgo from '~/components/TimeAgo';
import reddit from '~/lib/reddit';
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
let add_username = null;
let duration = null;

$: console.log(item);
$: validatePropItem(item);
$: validatePropBoolean(busy);
$: validatePropBoolean(showingContributorModal);
$: existingContributor===null || validatePropContributor(existingContributor);
$: add_username===null || validatePropString(add_username);
$: duration===null || validatePropString(duration);

async function prompt($event) {
  if (showingContributorModal) return;
  const { subreddit, name } = item;
  const responses = {};

  try {
    busy = true;
    showingContributorModal = true;

    add_username = item.author;

    // check if already contributorned
    const contributornedListReponse = await reddit.get(
      `/r/${subreddit}/about/contributors`,
      {
        params: {
          user: add_username,
        },
      },
    );

    existingContributor = contributornedListReponse.data.data.children[0] || null;
  } finally {
    busy = false;
  }
}
async function contributor(payload) {
  const { isSappitContributorned, author, subreddit } = item;
  const minWait = startMinWait();

  try {
    busy = true;
    const response = await reddit.post(`/r/${subreddit}/api/friend`, {
      // add_username: 'le contributorned username',
      name: add_username,
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

