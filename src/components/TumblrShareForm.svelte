<div class="post-form container">
  <div class="form-group row">
    <label class="col-6">Blog</label>
    <select
      class="form-control col-6 r-select"
      name="selected_blog"
      bind:value={selected_blog}
    >
      {#each blogNames as value (value)}
        <option {value}>{value}</option>
      {/each}
    </select>
  </div>
  {#if selected_blog && selectedBlog}
    {#each fields as field, key (key)}
      <div class="form-group row">
        {#if !field.kinds || field.kinds.includes(dirty.kind)}
          <label class="col-6">{key}</label>
          {#if field.type === 'select'}
            <select
              class="form-control col-6 r-select"
              name={key}
              bind:value={dirty[key]}
            >
              {#each field.options as {value, text} (value)}
                <option {value}>{text}</option>
              {/each}
            </select>
          {:else if field.type === 'textarea'}
            <textarea
              class="form-control col-6"
              value={dirty[key]}
              on:input={(event) => dirty[key] = event.target.value}
              name={key}
              rows="3"
            ></textarea>
          {:else}
            <input
              class="form-control col-6"
              value={dirty[key]}
              on:input={(event) => dirty[key] = event.target.value}
              name={key}
            />
          {/if}
          {#if field.description && dirty.kind && typeof field.description[dirty.kind] === 'string'}
            <div class="form-text text-muted">{field.description[dirty.kind]}</div>
          {:else if field.description && typeof field.description === 'string'}
            <div class="form-text text-muted">{field.description}</div>
          {/if}
        {/if}
      </div>
    {/each}
    {#if error}
      <ErrorAlert value={error}/>
    {/if}
    <button
      class="btn btn-secondary"
      class:disabled={(isSaveDisabled)}
      disabled={(isSaveDisabled)}
      on:click|preventDefault|stopPropagation={saveTumblrPost}
    >
      {#if saving}
        <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
        Saving
      {:else}
        <i class="fa fa-fw fa-btn fa-floppy"/>
        Save
      {/if}
    </button>
    <button class="btn btn-info btn-cancel" on:click|preventDefault|stopPropagation={() => dispatch('close')}>
      <i class="fa fa-fw fa-btn fa-cancel"/>
      Cancel
    </button>
    {#if tumblrPosts.length}
      <div class="crossposts">
        Cross Posts:
        <table>
          <tbody>
            {#each tumblrPosts as entry}
              <tr>
                <td>
                  <a href="/tumblr/{entry.data.blogName}">{entry.data.blogName}</a>
                </td>
                <td><AddToQueueButton item={entry}/></td>
                <td>
                  <a rel="nofollow" target="_blank" href={entry.data.route}>
                    {entry.data.id}
                  </a>
                </td>
                <td>
                  <a href={entry.data.permalink}>
                    <i class="fa fa-fw fa-btn fa-tumblr"/>
                  </a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/if}
</div>

<script>
import get from 'lodash/get';
import find from 'lodash/find';
import map from 'lodash/map';
import ErrorAlert from '~/components/ErrorAlert';
import AddToQueueButton from '~/components/AddToQueueButton';
import UserLink from '~/components/UserLink';
import { startMinWait } from '~/lib/sleep';
import {
  blogs,
  createLinkPost,
  createPhotoPost,
  createVideoPost,
  createTextPost,
} from '~/store/tumblr';
import { tumblrDefaultTags } from '~/store/settings';
import fields from '~/lib/tumblr/fields';
import { createEventDispatcher, onMount } from 'svelte';
import validatePropArray from '~/lib/validateProp/array';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropObject from '~/lib/validateProp/object';
import validatePropPost from '~/lib/validateProp/post';
import validatePropString from '~/lib/validateProp/string';

const dispatch = createEventDispatcher();

// props
export let parent = null;
let dirty = {};
let saving = false;
let error = null;
let tumblrPosts = [];
let selected_blog = null;

$: parent===null || validatePropPost(parent);
$: validatePropObject(dirty);
$: validatePropBoolean(saving);
$: validatePropArray(tumblrPosts);
$: selected_blog===null || validatePropString(selected_blog);
$: isSaveDisabled = saving;
$: blogNames = map(blogs, blog => blog.name)
$: selectedBlog = find(blogs, blog => blog.name === selected_blog)
$: createBlogPost = getCreateBlogPostFn(dirty);

// function set_selected_blog(value) {
//   selected_blog = get(value, 'name', null);
// }

function getCreateBlogPostFn(dirty) {
  const { kind } = dirty
  if (kind === 'text') {
    return createTextPost;
  } else if (kind === 'photo') {
    return createPhotoPost;
  } else if (kind === 'video') {
    return createVideoPost;
  } else if (kind === 'link') {
    return createLinkPost;
  }
  return null;
}

// 'dirty.kind'() {
//   dirty = freshDirty();
// },
// selected_blog() {
//   dirty = freshDirty();
// },

onMount(() => {
  // this.selected_blog = this.defaultBlog();
  dirty = freshDirty();
})

function freshDirty() {
  const kind = get(dirty, 'kind') || fields.kind.default(getDefaultBag());
  const data = Object.keys(fields).reduce(
    (carry, key) => {
      const field = fields[key];
      if (
        !carry.hasOwnProperty(key) &&
        (!field.kinds || field.kinds.includes(kind))
      ) {
        carry[key] = field.default(getDefaultBag());
      }
      return carry;
    },
    { kind },
  );
  return data;
}

function getDefaultBag() {
  return {
    parent,
    dirty,
    tumblrDefaultTags: $tumblrDefaultTags,
    selected_blog,
  };
}

function defaultBlog() {
  let blog;
  const subreddit = get(parent, 'subreddit');
  blog = subreddit
    ? find(
        $blogs,
        blog => blog.name.toLowerCase() === subreddit.toLowerCase(),
      )
    : null;
  if (blog) {
    return blog.name;
  }
  return get(blogs[0], 'name');
}

async function saveTumblrPost() {
  const blogName = selected_blog;
  try {
    error = null;
    saving = true;
    const fn = getCreateBlogPostFn(dirty);
    const response = await fn({
      blogName,
      options: dirty,
    });
    tumblrPosts.push({
      kind: 'TumblrPost',
      data: {
        ...response.data,
        blogName,
        permalink: `https://${blogName}.tumblr.com/post/${response.data.id}`,
        route: `/tumblr/${blogName}/post/${response.data.id}`,
      },
    });
  } catch (err) {
    console.error(err);
    error = err;
  } finally {
    saving = false;
    tumblrPosts = tumblrPosts;
  }
}
</script>
