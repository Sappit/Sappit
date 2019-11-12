<CommunityDetails subreddit={$subreddit}/>

<script>
import middlewareAuth from '~/lib/middleware/auth';
import CommunityDetails from '~/components/CommunityDetails';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { subreddit } from '~/store/params';

// props
// export let subreddit;

$: validatePropSubreddit($subreddit);

middlewareAuth()
</script>
