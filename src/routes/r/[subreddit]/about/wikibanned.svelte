<h2>WikiBanned Users</h2>

<AddWikiBannedForm/>

{#await promise}
  <RedditPagination fetching={true}/>
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <WikiBannedUserList users={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <RedditPagination fetching={false}/>
  <ErrorAlert value={error} />
{/await}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import AddWikiBannedForm from '~/components/AddWikiBannedForm';
import WikiBannedUserList from '~/components/WikiBannedUserList';
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
  path: `/r/${$page.params.subreddit}/about/wikibanned`,
  query: $page.query,
});

middlewareAuth()
</script>
