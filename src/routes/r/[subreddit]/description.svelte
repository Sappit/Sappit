<SubredditDescription subreddit={$subreddit}/>

<script>
import middlewareAuth from '~/lib/middleware/auth';
import SubredditDescription from '~/components/SubredditDescription';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { subreddit } from '~/store/params';

// props
// export let subreddit;

$: validatePropSubreddit($subreddit);

middlewareAuth()
</script>
