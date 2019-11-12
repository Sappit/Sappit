<div class="posts-list">
  {#each posts as post (post.id)}
    <PostEntry {post}/>
  {/each}
</div>

<script>
import PostEntry from '~/components/PostEntry';
import validatePropPosts from '~/lib/validateProp/posts';

// props
export let posts;

$: validatePropPosts(posts);
</script>


