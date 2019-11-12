<div class="mixed-list">
  {#if items && items.length > 0}
    {#each items as item (item.id)}
      {#if item.kind === Kind.PushshiftPost}
        PushshiftPostEntry
        <!-- <PushshiftPostEntry comment={item}/> -->
        <ShowSource value={item}/>
      {:else if item.kind === Kind.PushshiftComment}
        <PushshiftCommentEntry comment={item}/>
      {:else if item.kind === Kind.Comment}
        <CommentEntry comment={item}/>
      {:else if item.kind === Kind.Post}
        <PostEntry post={item}/>
      {:else if item.kind === Kind.Subreddit}
        <SubredditEntry subreddit={item}/>
      {:else}
        <div class="alert alert-danger">
          Error: unsupported "kind": { item.kind }
          <br />
          <ShowSource value={item}/>
        </div>
      {/if}
    {/each}
  {/if}
</div>

<script>
import CommentEntry from '~/components/CommentEntry';
import PostEntry from '~/components/PostEntry';
import PushshiftPostEntry from '~/components/PushshiftPostEntry';
import PushshiftCommentEntry from '~/components/PushshiftCommentEntry';
import SubredditEntry from '~/components/SubredditEntry';
import ShowSource from '~/components/ShowSource';
import { Kind } from '~/lib/enum';
import validatePropItems from '~/lib/validateProp/items';

// props
export let items;

$: validatePropItems(items);
</script>


