{#await promise}
  <Loading/>
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <MessageList messages={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import MessageList from '~/components/MessageList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app'
const { page } = stores();

$: promise = redditItems({
  path: `/message/messages`,
  query: $page.query,
});

middlewareAuth()
</script>
