<ClientsideFilter/>
{#await promise}
  <Loading/>
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <CommentList comments={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import Loading from '~/components/Loading';
import ErrorAlert from '~/components/ErrorAlert';
import ClientsideFilter from '~/components/ClientsideFilter';
import CommentList from '~/components/CommentList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app';
const { page } = stores();

let promise = null;

$: subname = $page.params.subreddit;
$: if (subname) {
  promise = redditItems({
    path: `/r/${subname}/comments`,
    query: $page.query,
  });
}
middlewareAuth()
</script>
