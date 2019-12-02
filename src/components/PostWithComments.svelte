<div class="post-comments-page">
  <PostEntry {post} on:created-comment={onCommentCreated}/>
  <div class="post-body container">
    <div class="card card-block bg-faded">
      <ItemHtml item={post}/>
    </div>
  </div>
  {#if subreddit.user_is_banned}
    <p class="alert alert-danger">You are banned from this subreddit.</p>
  {/if}
  {#if post.locked}
    <p class="alert alert-danger">Comments are locked.</p>
  {/if}
  <p>
    {#if hasComments}
      <div class="btn btn-secondary" on:click|preventDefault|stopPropagation={() => collapseAll(false)}>
        <i class="fa fa-fw fa-btn btn-collapse fa-plus"/>
        uncollapse all
      </div>
      <div class="btn btn-secondary" on:click|preventDefault|stopPropagation={() => collapseAll(true)}>
        <i class="fa fa-fw fa-btn btn-collapse fa-minus"/>
        collapse all
      </div>
    {/if}
    <a
      class="btn btn-primary pull-right"
      href="/r/{$page.params.subreddit}/duplicates/{$page.params.post_id}/{$page.params.post_title}"
    >
      duplicates
    </a>
  </p>
  <CommentTree {comments}/>
</div>

<script>
import get from 'lodash/get';
import CommentTree from '~/components/CommentTree';
import ItemHtml from '~/components/ItemHtml';
import PostEntry from '~/components/PostEntry';
import validatePropComments from '~/lib/validateProp/comments';
import validatePropPost from '~/lib/validateProp/post';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { stores } from '@sapper/app'
const { page } = stores();


// props
export let post;
export let subreddit;
export let comments;

$: validatePropPost(post);
$: validatePropSubreddit(subreddit);
$: validatePropComments(comments);

$: commentsCount = get(comments, 'length', 0);
$: zeroComments = !(commentsCount > 0);
$: hasComments = commentsCount > 0;

function collapseAll (newCollapsedValue) {
  // $refs.comments.collapseAll(newCollapsedValue)
}

function onCommentCreated (event) {
  // console.log('PostWithComments.onCommentCreated', { event, newComment: event.detail });
  comments.unshift(event.detail)
  comments = comments;
  // $refs.comments.collapseAll(newCollapsedValue)
}
</script>
