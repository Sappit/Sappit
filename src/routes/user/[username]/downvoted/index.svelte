<ClientsideFilter/>
{#await promise}
  <Loading />
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <MixedList items={collection.items}/>
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
import MixedList from '~/components/MixedList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app'
const { page } = stores();

let promise

middlewareAuth()
$: if ($page.params.username) promise = redditItems({
  path: `/user/${$page.params.username}/downvoted`,
  query: {
    sort: 'new',
    ...$page.query,
  },
});

</script>
