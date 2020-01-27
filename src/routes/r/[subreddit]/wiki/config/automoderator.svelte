<h2>Wiki Config Automoderator</h2>

{#await promise}
  <Loading/>
{:then collection}
  <ShowSource :value="collection" />
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import ShowSource from '~/components/ShowSource';
import Loading from '~/components/Loading';
import AddContributorForm from '~/components/AddContributorForm';
import ApprovedUserList from '~/components/ApprovedUserList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import middlewareAuth from '~/lib/middleware/auth';
// import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { stores } from '@sapper/app'
const { page } = stores();

// props
// export let subreddit;

let promise = null;

// $: validatePropSubreddit(subreddit);

middlewareAuth()
$: subname = $page.params.subreddit;
$: if (subname) promise = redditItems({
  path: `/r/${subname}/wiki/edit`,
  query: $page.query,
});

</script>
