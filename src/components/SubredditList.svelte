<div class="subreddits-list">
  {#each subreddits as subreddit (subreddit.id)}
    <SubredditEntry {subreddit}/>
  {/each}
</div>

<script>
import SubredditEntry from '~/components/SubredditEntry';
import validatePropSubreddits from '~/lib/validateProp/subreddits';

// props
export let subreddits;

$: validatePropSubreddits(subreddits);
</script>


