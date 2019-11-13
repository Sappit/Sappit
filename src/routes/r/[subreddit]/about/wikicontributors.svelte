<h2>WikiContributor Users</h2>

<AddWikiContributorForm/>

{#await promise}
  <Loading/>
{:then collection}
  <RedditPagination {collection} fetching={false}/>
  <WikiContributorUserList users={collection.items}/>
  {#if collection.showBottomPagination}
    <RedditPagination {collection} fetching={false}/>
  {/if}
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import AddWikiContributorForm from '~/components/AddWikiContributorForm';
import WikiContributorUserList from '~/components/WikiContributorUserList';
import RedditPagination from '~/components/RedditPagination';
import redditItems from '~/lib/redditItems';
import middlewareAuth from '~/lib/middleware/auth';
// import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { stores } from '@sapper/app'
const { page } = stores();

// props
// export let subreddit;

let promise = null;

// $: validatePropSubreddit(subreddit);

middlewareAuth()
$: subname = $page.params.subreddit;
$: if (subname) promise = redditItems({
  path: `/r/${subname}/about/wikicontributors`,
  query: $page.query,
});
</script>
