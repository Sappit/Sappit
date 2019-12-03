<div class="post-form container">
  <div class="form-group post-kind row">
    <label class="col-6">Kind</label>
    <select class="form-control col-6  r-select" bind:value={dirty.kind}>
      {#each kinds as kind (kind.value)}
        <option value={kind.value}>{kind.text}</option>
      {/each}
    </select>
  </div>
  {#if dirty.kind === "link"}
    <div class="form-group post-url">
      <label>URL</label>
      <input
        class="form-control"
        class:disabled={isEditing}
        disabled={isEditing}
        bind:value={dirty.url}
      />
    </div>
  {/if}
  {#if dirty.kind === "image" && !isEditing}
      Not Supported
<!--     <div class="form-group post-choose-image">
      <label>Upload</label>
      <input
        type="file"
        class="form-control"
        multiple
        bind:files={files}
      />
    </div> -->
  {/if}
  <div class="form-group post-url">
    <label>Title</label>
    <input
      class="form-control"
      class:disabled={isEditing}
      disabled={isEditing}
      bind:value={dirty.title}
    />
  </div>
  {#if dirty.kind === "self"}
  <div class="form-group post-kind">
    <label>Text</label>
    <textarea
      class="form-control"
      value={dirty.body}
      on:input={(event) => dirty.body = event.target.value}
      rows="3"
    ></textarea>
  </div>
  {/if}
  <div class="form-group post-url">
    <label>
      subreddit
      {#if isCrossPosting}
        x-post from /r/{ parent.subreddit }
      {/if}
    </label>
    <input
      class="form-control"
      class:disabled={isEditing}
      disabled={isEditing}
      bind:value={dirty.sr}
    />
  </div>
  <div class="form-group">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input" type="checkbox" id="inlineCheckbox1"
        class:disabled={isEditing}
        disabled={isEditing}
        bind:checked={dirty.sendreplies}
      />
      <label class="form-check-label" for="inlineCheckbox1">sendreplies</label>
    </div>
  </div>
  <div class="form-group">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input" type="checkbox" id="inlineCheckbox1"
        class:disabled={isEditing}
        disabled={isEditing}
        bind:checked={dirty.nsfw}
      />
      <label class="form-check-label" for="inlineCheckbox1">nsfw</label>
    </div>
  </div>
  <div class="form-group">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input" type="checkbox" id="inlineCheckbox1"
        class:disabled={isEditing}
        disabled={isEditing}
        bind:checked={dirty.spoiler}
      />
      <label class="form-check-label" for="inlineCheckbox1">spoiler</label>
    </div>
  </div>
  {#if originalContentTagEnabled}
    <div class="form-group">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input" type="checkbox" id="inlineCheckbox1"
          class:disabled={isEditing}
          disabled={isEditing}
          bind:checked={dirty.oc}
        />
        <label class="form-check-label" for="inlineCheckbox1">oc</label>
      </div>
    </div>
  {/if}
  {#if !isEditing && dirty.kind === 'link'}
    <div class="form-group">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input" type="checkbox" id="inlineCheckbox1"
          bind:checked={dirty.resubmit}
        />
        <label class="form-check-label" for="inlineCheckbox1">allow resubmit</label>
      </div>
    </div>
  {/if}
  <p>
    {#if isEditing}
      Editing
    {:else if isCrossPosting}
      Cross Posting
    {:else}
      New Submission
    {/if}
    as
    {#if isEditing}
      <UserLink username={selected_username || $username} />
    {:else}
      <SelectAuthUsername bind:value={selected_username}/>
    {/if}
  </p>
  {#if errors}
    <ErrorAlert value={errors} />
  {/if}
  <button
    class="btn btn-secondary"
    class:disabled={isSaveDisabled}
    disabled={isSaveDisabled}
    on:click|preventDefault|stopPropagation={save}
  >
    {#if saving}
      <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
      {#if editingPost && editingPost.id}
        Updating
      {:else}
        Saving
      {/if}
    {:else}
      <i class="fa fa-fw fa-btn fa-floppy"/>
      {#if editingPost && editingPost.id}
        Update
      {:else}
        Save
      {/if}
    {/if}
  </button>
  <button
    class="btn btn-info btn-cancel"
    on:click|preventDefault|stopPropagation={() => dispatch('close')}
  >
    <i class="fa fa-fw fa-btn fa-cancel"/>
    {#if !editingPost || !editingPost.id || dirty.body !== editingPost.body}
      Cancel
      {#if (dirty.body && !editingPost) || (editingPost && dirty.body !== editingPost.body)}
        <small>(unsaved changes!)</small>
      {/if}
    {:else}
      Done
    {/if}
  </button>
  {#if crossPosts.length}
    <div class="crossposts">
      Cross Posts:
      <table>
        <tbody>
          {#each crossPosts as post (post.id)}
            <tr>
              <td>
                <a href="/u/{post.author}">/u/{post.author}</a>
              </td>
              <td>
                <a href="/r/{post.subreddit}">/r/{post.subreddit}</a>
              </td>
              <td><AddToQueueButton item={post}/></td>
              <td>
                <a href={post.permalink}>{post.id}</a>
              </td>
              <td>
                <a rel="nofollow" target="_blank"
                  href="https://www.reddit.com{post.permalink}"
                >
                  <i class="fa fa-fw fa-btn fa-reddit"/>
                </a>
              </td>
              <td><DeleteButton item={post}/></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<script>
import get from 'lodash/get';
import ErrorAlert from '~/components/ErrorAlert';
import AddToQueueButton from '~/components/AddToQueueButton';
import DeleteButton from '~/components/DeleteButton';
import SelectAuthUsername from '~/components/SelectAuthUsername';
import UserLink from '~/components/UserLink';
import undata from '~/lib/undata';
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import { createEventDispatcher, onMount } from 'svelte';
import queryStore from '~/store/query';
import { username } from '~/store/auth';
import validatePropPost from '~/lib/validateProp/post';
import { stores } from '@sapper/app'
const { page } = stores();

const { selftext } = queryStore

const dispatch = createEventDispatcher();
const kinds = Object.freeze([
  { value: 'self', text: 'Self' },
  { value: 'link', text: 'Link' },
  { value: 'image', text: 'Image' },
  // { value: 'video', text: 'Video' },
  // { value: 'videogif', text: 'Video GIF' },
]);

// props
export let parent = null;
export let post = null;

let dirty = {}
let crossPosts = []
let selected_username = null;
let errors = null;
let saving = false;
let editingPost = null;
// let files;

$: parent===null || validatePropPost(parent);
$: post===null || validatePropPost(post);
$: isSaveDisabled = saving || !dirty.title || !(dirty.url || dirty.body);
$: isEditing = !!editingPost;
$: isCrossPosting = parent && !post;
$: originalContentTagEnabled = null;
// $: console.log('files', files);

function freshDirty (post) {
  const dirty = {
    body: '',
    resubmit: false,
  };
  if (post) {
    dirty.title = post.title;
    dirty.body = post.selftext;
    dirty.kind = post.is_self ? 'self' : 'link';
    dirty.sr = post.subreddit;
    dirty.nsfw = post.over_18;
    dirty.sendreplies = post.send_replies;
    dirty.spoiler = post.spoiler;
    selected_username = post.author;
  } else if (isCrossPosting) {
    dirty.kind = 'link';
    dirty.title = parent.title;
    dirty.url = parent.url;
    // dirty.video_poster_url = parent.video_poster_url;
    dirty.body = parent.selftext;
    // dirty.nsfw = parent.nsfw;
    // dirty.resubmit = parent.resubmit;
    // dirty.sendreplies = parent.sendreplies;
    // dirty.spoiler = parent.spoiler;
    selected_username = $username;
  } else {
    dirty.sr = $page.params.subreddit
  }

  if ($page.query.selftext) {
    dirty.kind = 'self';
  }
  if (!dirty.kind) {
    dirty.kind = $page.query.kind || 'link';
  }
  return dirty;
}

// originalContentTagEnabled() {
//   // if (this.sr && this.subredditCache[this.sr]) {
//   //   return this.subredditCache[this.sr].original_content_tag_enabled;
//   // }
//   return null;
// }

onMount(() => {
  editingPost = post;
  dirty = freshDirty(editingPost);
})

async function save($event) {
  const minWait = startMinWait();
  try {
    saving = true;
    errors = null;
    if (editingPost && editingPost.id) {
      // @todo
      const kind = dirty.selftext ? 'self' : 'link';

      if (dirty.body !== editingPost.selftext) {
        const response = await reddit.post(
          '/api/editusertext',
          {
            thing_id: editingPost.name,
            text: dirty.body,
            return_rtjson: true,
            api_type: 'json',
          },
          {
            username: editingPost.author,
          },
        );

        if (get(response, 'data.json.errors.length')) {
          errors = response.data.json.errors;
        } else {
          Object.assign(editingPost. undata(response.data));
          dispatch('updated-post', editingPost);
        }
      }
    } else {
      const response = await reddit.post(
        '/api/submit',
        {
          // thing_id: dirty.editingPost.name,
          extension: 'json',
          sr: dirty.sr,
          title: dirty.title,
          url: dirty.selftext ? void 0 : dirty.url,
          text: dirty.selftext ? dirty.body : void 0,
          return_rtjson: true,
          api_type: 'json',
          // flair_id: // a string no longer than 36 characters
          // flair_text: //a string no longer than 64 characters
          kind: dirty.kind, // one of (link, self, image, video, videogif)
          nsfw: !!dirty.nsfw,
          resubmit: !!dirty.resubmit,
          spoiler: !!dirty.spoiler,
          sendreplies: !!dirty.sendreplies,
          resubmit: !!dirty.resubmit,
        },
        {
          username: selected_username,
        },
      );

      if (get(response, 'data.json.errors.length')) {
        errors = response.data.json.errors;
      } else {
        const xpost_name = response.data.json.data.name;
        const response2 = await reddit.get(`/by_id/${xpost_name}`);
        const xpost = undata(get(response2.data, 'data.children.0'));
        if (xpost) {
          crossPosts.push(xpost);
          crossPosts = crossPosts
        }
        // this.editingPost = {
        //   kind: 't1',
        //   data: response.data,
        // };
        // dispatch('created-post', this.editingPost);
      }
    }
  } catch (err) {
    errors = err;
    throw err;
  } finally {
    await minWait;
    saving = false;
  }
}
</script>
