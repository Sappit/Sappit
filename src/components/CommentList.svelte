<div class="comments-list">
  {#each comments as comment (comment.id)}
    {#if !comment.sappitHide}
      <CommentEntry
        {comment}
      />
    {/if}
  {/each}
</div>

<script>
import CommentEntry from '~/components/CommentEntry';
import validatePropComments from '~/lib/validateProp/comments';

// props
export let comments;

$: validatePropComments(comments);
</script>


