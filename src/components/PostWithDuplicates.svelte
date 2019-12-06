<div class="post-duplicates-page">
  <PostEntry {post}/>
  <p>
    <a
      class="btn btn-primary pull-right"
      href="/r/{$page.params.subreddit}/comments/{$page.params.post_id}/{$page.params.post_title}">comments</a>

    {#if youtubeId}
      <a class="btn btn-primary" href="/pushshift?kind=t3&url={youtubeId}">
        <i class="fa fa-search fa-fw"/>
        Pushshift: threads by youtubeId
      </a>
    {/if}
  </p>
  <div class="post-duplicates">
    <h2>Duplicate Links:</h2>
    {#each duplicates as d (d.id)}
      <PostEntry post={d}/>
    {/each}
  </div>
</div>

<script>
import getYoutubeId from 'get-youtube-id';
import get from 'lodash/get';
import ItemHtml from '~/components/ItemHtml';
import PostEntry from '~/components/PostEntry';
import validatePropPost from '~/lib/validateProp/post';
import validatePropPosts from '~/lib/validateProp/posts';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { stores } from '@sapper/app'
const { page } = stores();


// props
export let subreddit;
export let post;
export let duplicates;

$: validatePropSubreddit(subreddit);
$: validatePropPost(post);
$: validatePropPosts(duplicates);
$: youtubeId = (post && post.url && getYoutubeId(post.url)) || null;
</script>
