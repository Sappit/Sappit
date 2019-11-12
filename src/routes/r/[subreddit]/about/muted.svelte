<h2>Muted Users</h2>

<MutedUserList/>

{#await promise}
  <RedditPagination fetching={true}/>
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <MutedUserList users={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <RedditPagination fetching={false}/>
  <ErrorAlert value={error} />
{/await}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import AddMutedForm from '~/components/AddMutedForm';
import MutedUserList from '~/components/MutedUserList';
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

$: subname = $page.params.subreddit;
$: if (subname) promise = redditItems({
  path: `/r/${$page.params.subreddit}/about/muted`,
  query: $page.query,
});

middlewareAuth()
</script>
