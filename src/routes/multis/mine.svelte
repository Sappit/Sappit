<ClientsideFilter/>
{#await promise}
  <Loading/>
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <MultiList multis={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import redditItems from '~/lib/redditItems';
import ClientsideFilter from '~/components/ClientsideFilter';
import Loading from '~/components/Loading';
import ErrorAlert from '~/components/ErrorAlert';
import RedditPagination from '~/components/RedditPagination';
import MultiList from '~/components/MultiList';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app'
const { page } = stores();

$: promise = redditItems({
  path: `/api/multi/mine`,
  query: {
    ...$page.query,
    expand_srs: false,
  },
});

middlewareAuth()
</script>
