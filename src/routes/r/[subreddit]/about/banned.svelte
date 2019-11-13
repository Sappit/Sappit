<h2>Banned Users</h2>

{#await promise}
  <Loading/>
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <BannedUserList users={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import BannedUserList from '~/components/BannedUserList';
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

$: subname = $page.params.subreddit;
$: if (subname) promise = redditItems({
  path: `/r/${subname}/about/banned`,
  query: $page.query,
});

middlewareAuth()
</script>
