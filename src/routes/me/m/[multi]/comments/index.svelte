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
import includes from 'lodash/includes';
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import CommentList from '~/components/CommentList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app';
const { page } = stores();

let promise = null;

$: multiname = $page.params.multi;
$: if (multiname) promise = redditItems({
  path: `/me/m/${multiname}/comments`,
  query: $page.query,
});

middlewareAuth()

</script>
