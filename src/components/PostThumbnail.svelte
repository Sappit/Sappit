<div
  class="posts-thumbnail"
  on:click|preventDefault|stopPropagation={() => dispatch('expand')}
>
  {#if !imageSrc && post.thumbnail === 'image'}
    image
  {:else if !imageSrc && post.thumbnail === 'default'}
    <i class="fa fa-fw fa-btn fa-5x fa-question-circle-o" title="default"/>
  {:else if !imageSrc && post.thumbnail === 'self'}
    <i class="fa fa-fw fa-btn fa-5x fa-doc-text" title="self"/>
  {:else if !imageSrc && post.thumbnail === 'spoiler'}
    <i class="fa fa-fw fa-btn fa-5x fa-question-circle-o" title="spoiler"/>
  {:else if !imageSrc && post.thumbnail === 'nsfw'}
    <i class="cursor-pointer fa fa-fw fa-btn fa-5x fa-user-secret" title="nsfw"/>
  {:else if imageSrc}
    <img
      class="cursor-pointer"
      class:max-108-mh-144={imageSrc === post.url}
      src={imageSrc}
      alt={post.title}
    />
  {:else}
    NO_IMAGE
  {/if}
</div>

<script>
import { createEventDispatcher } from 'svelte';
import get from 'lodash/get';
import find from 'lodash/find';
import getPostThumbnailSrc from '~/lib/getPostThumbnailSrc';
import validatePropPost from '~/lib/validateProp/post';

const dispatch = createEventDispatcher();

// props
export let post;

$: validatePropPost(post);
$: imageSrc = getPostThumbnailSrc(post)
</script>
