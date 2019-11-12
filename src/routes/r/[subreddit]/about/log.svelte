<h2>Mod Log</h2>

{#await promise}
  <RedditPagination fetching={true}/>
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <ModLogList items={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <RedditPagination fetching={false}/>
  <ErrorAlert value={error} />
{/await}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import ModLogList from '~/components/ModLogList';
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
  path: `/r/${$page.params.subreddit}/about/log`,
  query: $page.query,
});

middlewareAuth()
</script>
