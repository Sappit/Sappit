<ClientsideFilter/>
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
import ClientsideFilter from '~/components/ClientsideFilter';
import Loading from '~/components/Loading';
import ErrorAlert from '~/components/ErrorAlert';
import PostList from '~/components/PostList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app';
const { page } = stores();

let promise = null;

$: multiname = $page.params.multi;
$: if (multiname) promise = redditItems({
  path: `/me/m/${$page.params.multi}/${$page.query.sort || 'hot'}`,
  query: $page.query,
});

middlewareAuth()

</script>
