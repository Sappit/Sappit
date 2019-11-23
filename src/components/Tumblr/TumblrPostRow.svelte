<div class="row">
  <div class="col-xs-12">
    {#if post.deleted}
      <span class="badge badge-danger">deleted</span>
    {/if}
    <span class="badge badge-secondary">{post.type}</span>
    <span class="badge badge-secondary">{post.state}</span>
    <!-- {#if post.date}
      <span class="badge badge-secondary">{post.date}</span>
    {/if} -->
    {#if post.date}
      <TimeAgo value={post.timestamp}/>
    {/if}
  </div>
</div>
<div class="row">
  <div class="col-sm-7 col-md-6 col-lg-4 col-xl-3">
    {#each photos as photo (photo.thumbnail)}
      <div>
        <a rel="nofollow" target="_blank" href={photo.href}>
          <img src={photo.thumbnail} alt="Tumblr Post Thumbnail">
        </a>
      </div>
    {/each}
  </div>
  <div class="col-sm-5 col-md-6 col-lg-8 col-xl-9">
    <div>
      <a rel="nofollow" target="_blank" href={post.post_url}>
        <i class="fa fa-fw fa-link-ext"/>
      </a>
      <span>{ post.blog_name }</span>
      <code>{ post.state }</code>
      <span>
        note_count:
        <code>{ post.note_count }</code>
      </span>
    </div>
    {#if post.scheduled_publish_time}
      <div>
        <label>
          <code>scheduled_publish_time:</code>
        </label>
        <TimeAgo value={parseInt(post.scheduled_publish_time)}/>
      </div>
    {/if}
    {#if post.timestamp}
      <div>
        <label><code>created_at:</code></label>
        <DateTime value={post.timestamp}/>
      </div>
    {/if}
    <div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">state</label>
        <select
          class="form-control col-sm-10 r-select"
          name="state"
          bind:value={dirtyState}
        >
          {#each stateOptions as {value, text} (value)}
            <option {value}>{text}</option>
          {/each}
        </select>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">caption</label>
        <textarea
          class="form-control col-sm-10"
          bind:value={dirtyCaption}
          name="caption"
          rows="3"
        ></textarea>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">tags</label>
        <input
          class="form-control col-sm-10"
          bind:value={dirtyTags}
        />
      </div>
      <div class="form-group row">
        <button
          class="btn btn-primary mb-2"
          class:disabled={noChanges || updating}
          disabled={noChanges || updating}
          type="submit"
          on:click|preventDefault|stopPropagation={updatePost}
        >
          {#if updating}
            <i class="fa fa-fw fa-spinner fa-spin"/>
            Updating
          {:else}
            <i class="fa fa-fw fa-floppy"/>
            Update
          {/if}
        </button>
        <button
          class="btn btn-danger mb-2"
          class:disabled={deleting || post.deleted}
          disabled={deleting || post.deleted}
          type="button"
          on:click|preventDefault|stopPropagation={deleteTumblrPost}
        >
          {#if deleting}
            <i class="fa fa-fw fa-spinner fa-spin"/>
            Deleting
          {:else}
            <i class="fa fa-fw fa-trash"/>
            Delete
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <button
      class="btn btn-secondary"
      on:click|preventDefault|stopPropagation={$show.toggleSource}
    >source</button>
    {#if $show.source}
      <ShowSource value={post}/>
    {/if}
  </div>
</div>

<script>
import get from 'lodash/get';
import find from 'lodash/find';
import map from 'lodash/map';
import { blogs, tumblrSelectedBlog, tumblrDefaultTags, updateBlogPost, deletePost } from '~/store/tumblr';
import TimeAgo from '~/components/TimeAgo';
import DateTime from '~/components/DateTime';
import ShowSource from '~/components/ShowSource';
import getPostPhotos from '~/lib/tumblr/getPostPhotos';
import validatePropObject from '~/lib/validateProp/object';
import validatePropTumblrpost from '~/lib/validateProp/tumblrpost';
import { oneOpen } from '~/lib/open';
import { onMount } from 'svelte';
import fields from '~/lib/tumblr/fields';

// props
export let post;
let deleting = false;
let updating = false;
let dirtyState = '';
let dirtyCaption = '';
let dirtyTags = '';
const show = oneOpen()
const stateOptions = find(fields, entry => entry.name === 'state').options

$: validatePropTumblrpost(post);
onMount(() => {
  dirtyState = post.state || '';
  dirtyCaption = post.caption || '';
  dirtyTags = (post.tags || []).join(', ');
})
// $: validatePropObject(dirty);
$: photos = getPostPhotos(post)
$: noChanges = post.state === dirtyState && post.caption === dirtyCaption && post.tags.join(', ') === dirtyTags;

async function updatePost($event) {
  try {
    updating = true;
    updateBlogPost({
      blogName: post.blog_name,
      options: {
        id: post.id,
        tags: dirtyTags,
        caption: dirtyCaption,
        state: dirtyState,
      },
    });
    // post
  } finally {
    updating = false;
  }
}
async function deleteTumblrPost($event) {
  try {
    deleting = true;
    deletePost({
      blogName: post.blog_name,
      options: post.id,
    });
    post.deleted = true;
  } finally {
    deleting = false;
    post = post;
  }
}

function trim(t) {
  return t.trim();
}
</script>
