{#if zeroComments}
  <div class="comment-tree zero-comments">No comments.</div>
{:else}
  <div class="comment-tree has-comments">
    {#each comments as comment, index (comment.id)}
      {#if comment.kind === 't1'}
        <CommentEntry {comment}/>
        {#if shouldShowReplies(comment)}
          <svelte:self comments={comment.replies} />
        {/if}
      {:else if comment.kind === 'more'}
        <LoadMoreCommentsEntry
          item={comment}
          on:append-children={appendChildren}
          on:remove-more={removeMore}
        />
      {:else}
        <div class="text-danger">unknown entry type</div>
      {/if}
    {/each}
  </div>
{/if}

<script>
import get from 'lodash/get';
import CommentEntry from '~/components/CommentEntry';
import LoadMoreCommentsEntry from '~/components/LoadMoreCommentsEntry';
import validatePropComments from '~/lib/validateProp/comments';

// props
export let comments;

$: validatePropComments(comments);

// $: console.log(comments);
$: commentsCount = get(comments, 'length', 0);
$: zeroComments = !hasComments;
$: hasComments = commentsCount > 0;
// $: showReplies = comment.replies && comment.replies.data.children && comment.replies.data.children.length

function shouldShowReplies (comment) {
  if (comment.collapsed) {
    return false;
  }
  return comment.replies && comment.replies.length > 0;
}

async function collapseAll(value = true) {
  // const { $children } = this;
  // for (let i = 0, len = $children.length; i < len; i++) {
  //   if ($children[i] && $children[i].setCollapsed) {
  //     $children[i].setCollapsed(value);
  //   }
  //   if (i % 5 === 100) {
  //     await null;
  //   }
  // }
}
function appendChildren(children) {
  // this.comments.data.children = this.comments.data.children.concat(
  //   children,
  // );
}
function removeMore(moreItem) {
  // this.comments.data.children = this.comments.data.children.filter(c => {
  //   if (c && c.data) {
  //     if (c.kind !== 'more') return true;
  //     if (c.data.name !== moreItem.data.name) return true;
  //     if (c.data.count !== moreItem.data.count) return true;
  //   }
  //   return false;
  // });
}
</script>
