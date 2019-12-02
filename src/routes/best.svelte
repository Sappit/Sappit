{#await promise}
  <Loading/>
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
import redditItems from '~/lib/redditItems';
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import RedditPagination from '~/components/RedditPagination';
import PostList from '~/components/PostList';
import middlewareAuth from '~/lib/middleware/auth';
const { page } = stores();

middlewareAuth()
$: promise = redditItems({
  path: '/best',
  query: $page.query,
});
</script>
