{#await allPromises}
  <Loading />
{:then data}
  <PostWithDuplicates subreddit={$subreddit} {...data}/>
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import middlewareAuth from '~/lib/middleware/auth';
import Loading from '~/components/Loading';
import ErrorAlert from '~/components/ErrorAlert';
import PostWithDuplicates from '~/components/PostWithDuplicates';
import first from 'lodash/first';
import reddit from '~/lib/reddit';
import validatePropDuplicatePosts from '~/lib/validateProp/duplicatePosts';
import validatePropPost from '~/lib/validateProp/post';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import fetchPost from '~/lib/api/reddit/fetchPost';
import fetchPostDuplicates from '~/lib/api/reddit/fetchPostDuplicates';
import { subreddit } from '~/store/params';
import { stores } from '@sapper/app'
const { page } = stores();


// props
// export let subreddit;

let post;
let duplicates;

$: validatePropSubreddit($subreddit);
// $: validatePropPost(post);
// $: validatePropDuplicatePosts(duplicates);
$: postPromise = fetchPost($page.params.subreddit, $page.params.post_id);
$: duplicatesPromise = postPromise ? postPromise.then(fetchPostDuplicates) : null
$: allPromises = Promise.all([postPromise, duplicatesPromise]).then(([post, duplicates]) => {
  validatePropPost(post);
  validatePropDuplicatePosts(duplicates);
  return {
    post,
    duplicates,
  }
});

middlewareAuth()
</script>
