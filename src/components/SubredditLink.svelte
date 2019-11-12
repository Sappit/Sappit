<a
  class="srl-{subreddit}"
  href="/r/{subreddit}"
>r/{subreddit}</a>

<script>
import validatePropSubredditName from '~/lib/validateProp/subredditName';

// props
export let subreddit;

$: validatePropSubredditName(subreddit);
</script>
