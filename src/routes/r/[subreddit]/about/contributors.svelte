<h2>Approved Users</h2>

<AddContributorForm/>

{#await promise}
  <RedditPagination fetching={true}/>
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <ApprovedUserList users={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <RedditPagination fetching={false}/>
  <ErrorAlert value={error} />
{/await}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import AddContributorForm from '~/components/AddContributorForm';
import ApprovedUserList from '~/components/ApprovedUserList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import middlewareAuth from '~/lib/middleware/auth';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { stores } from '@sapper/app'
const { page } = stores();

// props
export let subreddit;

let promise = null;

$: validatePropSubreddit(subreddit);

middlewareAuth()
$: subname = $page.params.subreddit;
$: if (subname) promise = redditItems({
  path: `/r/${$page.params.subreddit}/about/contributors`,
  query: $page.query,
});

</script>
