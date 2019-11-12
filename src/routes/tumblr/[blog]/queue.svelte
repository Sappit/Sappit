<TumblrPagination items={posts}/>
<div class="container">
  {#each posts as post (post.id)}
    {#if post.id === editingId}
      <TumblrShareForm {post}/>
    {:else}
      <TumblrPostRow {post}/>
    {/if}
  {/each}
</div>
{#if posts.length > 1}
  <TumblrPagination items={posts}/>
{/if}

<script>
import find from 'lodash/find';
import { blogs } from '~/store/tumblr';
import tumblr from '~/lib/tumblr';
import TumblrPostRow from '~/components/Tumblr/TumblrPostRow';
import TumblrPagination from '~/components/Tumblr/TumblrPagination';
import TumblrShareForm from '~/components/TumblrShareForm';
import middlewareAuth from '~/lib/middleware/auth';
// import { onMount } from 'svelte';
import { fetchBlogQueue } from '~/store/tumblr';
import validatePropArray from '~/lib/validateProp/array';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropString from '~/lib/validateProp/string';
import validatePropTumblrblog from '~/lib/validateProp/tumblrblog';
import { stores } from '@sapper/app'
const { page } = stores();

// props
export let blog;
let editingId = null;
let fetching = false;
let posts = [];

$: validatePropTumblrblog(blog);
$: editingId===null || validatePropString(editingId);
$: validatePropBoolean(fetching);
$: validatePropArray(posts);
$: blog = $page.params.blog ? find($blogs, blog => blog.name === $page.params.blog) : null
$: validatePropTumblrblog(blog);
$: fetchPosts(blog)

middlewareAuth()
// onMount(() => {
//   fetchPosts();
// })

async function fetchPosts(blog) {
  try {
    fetching = true;
    const response = await fetchBlogQueue({
      blogName: blog.name,
      options: {
        ...$page.query,
      },
    });
    posts = response.data.posts;
    // this.updateBlog(response.data.blog); // @todo
  } finally {
    fetching = false;
  }
}
</script>
