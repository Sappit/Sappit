<ClientsideFilter/>
{#await promise}
  <Loading />
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <PostList posts={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import ClientsideFilter from '~/components/ClientsideFilter';
import Loading from '~/components/ClientsideFilter';
import ErrorAlert from '~/components/ErrorAlert';
import PostList from '~/components/PostList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app'
const { page } = stores();

let promise

middlewareAuth()
$: subname = $page.params.subreddit;
$: if (subname) promise = redditItems({
  path: `/r/${$page.params.subreddit}/${$page.query.sort || 'hot'}`,
  query: $page.query,
});

</script>
