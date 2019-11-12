{#await promise}
  <Loading/>
{:then data}
  <PostWithComments subreddit={$subreddit} {...data}/>
{:catch error}
  <ErrorAlert value={error} />
{/await}


<script>
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import PostWithComments from '~/components/PostWithComments';
import first from 'lodash/first';
import reddit from '~/lib/reddit';
import fetchPostWithComments from '~/lib/api/reddit/fetchPostWithComments';
import middlewareAuth from '~/lib/middleware/auth';
import validatePropComments from '~/lib/validateProp/comments';
import validatePropPost from '~/lib/validateProp/post';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { subreddit } from '~/store/params';
import { stores } from '@sapper/app'
const { page } = stores();

// props
// export let subreddit;

let promise;

$: validatePropSubreddit($subreddit);
$: if ($page.params.subreddit && $page.params.post_id && $page.params.comment_id) {
  promise = fetchPostWithComments(
    $page.params.subreddit,
    $page.params.post_id,
    $page.params.comment_id,
    $page.query);
}

middlewareAuth()
</script>
