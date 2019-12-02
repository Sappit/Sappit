{#await promise}
  <Loading/>
{:then subreddit}
  <div class="container subreddit-banner" style={subredditBannerStyles}>
    <br>
    <br>
    <br>
    <br>
  </div>
  <h3>/r/{subreddit.display_name}</h3>
  <h4>{subreddit.title}</h4>
  <p>{subreddit.subscribers} subscribers</p>
  <p>
    {#if subreddit.name}
      <SubscribeButton item={subreddit}/>
    {/if}
    <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
      <i class="fa fa-fw fa-btn fa-code"/>
      see source
    </span>
  </p>
  <p>Your flair on this sub looks like:
    <UserLink username={$username} />
    <FlairBadge item={subreddit} type="user" showNone/>
  </p>
  {#if $show.source}
    <ShowSource value={subreddit}/>
  {/if}
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a href="/r/{$page.params.subreddit}" class="nav-link" class:active={!segment}>
        <i class="fa fa-fw fa-btn fa-list"/>
        Posts
      </a>
    </li>
    <li class="nav-item">
      <a href="/r/{$page.params.subreddit}/comments" class="nav-link" class:active={segment==='comments'}>
        <i class="fa fa-fw fa-btn fa-list"/>
        Comments
      </a>
    </li>
    <li class="nav-item">
      <a href="/r/{$page.params.subreddit}/description" class="nav-link" class:active={segment==='description'}>
        <i class="fa fa-fw fa-btn fa-book"/>
        Description
      </a>
    </li>
    <li class="nav-item">
      <a href="/r/{$page.params.subreddit}/community-details"
        class="nav-link" class:active={segment==='community-details'}
      >
        <i class="fa fa-fw fa-btn fa-book"/>
        Community Details
      </a>
    </li>
    <li class="nav-item">
      <a href="/r/{$page.params.subreddit}/submit"
        class="nav-link"
        class:active={segment==='submit' && $page.query.selftext!=='true'}
      >
        <i class="fa fa-fw fa-btn fa-edit"/>
        { subreddit.submit_text_label || "Submit a new link" }
      </a>
    </li>
    <li class="nav-item">
      <a href="/r/{$page.params.subreddit}/submit?selftext=true"
        class="nav-link"
        class:active={segment==='submit' && $page.query.selftext==='true'}
      >
        <i class="fa fa-fw fa-btn fa-edit"/>
        { subreddit.submit_link_label || "Submit a new text post" }
      </a>
    </li>
    <li class="nav-item">
      <a
        href="/pushshift/search/?kind=comment&subreddit={$page.params.subreddit}"
        class="nav-link" class:active={segment==='pushshift'}
      >
        <i class="fa fa-fw fa-btn fa-list"/>
        Pushshift
      </a>
    </li>
    {#if subreddit.user_is_moderator}
      <li class="nav-item">
        <a href="/r/{$page.params.subreddit}/about/moderators"
          class="nav-link" class:active={$page.path.includes('/about/moderators')}
        >
          <i class="fa fa-fw fa-btn fa-shield"/>
          Moderators
        </a>
      </li>
      <li class="nav-item">
        <a href="/r/{$page.params.subreddit}/about/contributors"
          class="nav-link" class:active={$page.path.includes('/about/contributors')}
        >
          <i class="fa fa-fw fa-btn fa-check"/>
          Approved Users
        </a>
      </li>
      <li class="nav-item">
        <a href="/r/{$page.params.subreddit}/about/wikicontributors"
          class="nav-link" class:active={$page.path.includes('/about/wikicontributors')}
        >
          <i class="fa fa-fw fa-btn fa-book"/>
          WikiContributors Users
        </a>
      </li>
      <li class="nav-item">
        <a href="/r/{$page.params.subreddit}/about/banned"
          class="nav-link" class:active={$page.path.includes('/about/banned')}
        >
          <i class="fa fa-fw fa-btn fa-block"/>
          Banned Users
        </a>
      </li>
      <li class="nav-item">
        <a href="/r/{$page.params.subreddit}/about/muted"
          class="nav-link" class:active={$page.path.includes('/about/muted')}
        >
          <i class="fa fa-fw fa-btn fa-block"/>
          Muted Users
        </a>
      </li>
      <li class="nav-item">
        <a href="/r/{$page.params.subreddit}/about/wikibanned"
          class="nav-link" class:active={$page.path.includes('/about/wikibanned')}
        >
          <i class="fa fa-fw fa-btn fa-block"/>
          WikiBanned Users
        </a>
      </li>
      <li class="nav-item">
        <a href="/r/{$page.params.subreddit}/about/log"
          class="nav-link" class:active={$page.path.includes('/about/log')}
        >
          <i class="fa fa-fw fa-btn fa-th-list"/>
          Mod Log
        </a>
      </li>
      <li class="nav-item">
        <a rel="nofollow" target="_blank"
          href="https://old.reddit.com/r/{$page.params.subreddit}/wiki/config/automoderator"
          class="nav-link" class:active={$page.path.includes('/about/log')}
        >
          <i class="fa fa-fw fa-btn fa-external-link"/>
          Automod Config
        </a>
      </li>
    {/if}
  </ul>
  <div class="row clearfix">
    <div class="col order-md-1">
      {#if subreddit.networkError}
        <p class="alert alert-danger">
          <strong>Network Error, subreddit might not exist</strong>
          <br>
          Reddit apps are required to use OAuth and CORS. When a subreddit does not exist, the reddit website redirects
              the user to a subreddit search page. Reddit did not configure their CORS setup to allow the redirect. As a
              result, Sappit (this webapp) only recieves an undetailed "Network Error". Reddit needs to update their OAuth
              endpoints to return a JSON 404 or update their CORS.
          <br>
          <br>
          <a class="btn btn-primary" href="/subreddits/search?q={$page.params.subreddit}">
            <i class="fa fa-search fa-fw"/>
            Search for subreddits matching "{ $page.params.subreddit }"
          </a>
        </p>
      {:else}
        <slot {subreddit}/>
      {/if}
    </div>
    {#if showSideBar}
      <div class="col col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 order-md-12">
        <CommunityDetails {subreddit}/>
      </div>
    {/if}
  </div>
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import first from 'lodash/first';
import CommunityDetails from '~/components/CommunityDetails';
import FlairBadge from '~/components/FlairBadge';
import SubscribeButton from '~/components/SubscribeButton';
import UserLink from '~/components/UserLink';
import Loading from '~/components/Loading';
import ErrorAlert from '~/components/ErrorAlert';
import ShowSource from '~/components/ShowSource';
import redditItems from '~/lib/redditItems';
import { username } from '~/store/auth';
import reddit from '~/lib/reddit';
import getShowSubredditSidebar from '~/lib/getShowSubredditSidebar';
import getSubredditBannerStyles from '~/lib/getSubredditBannerStyles';
import middlewareAuth from '~/lib/middleware/auth';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { oneOpen } from '~/lib/open';
import { subreddit } from '~/store/params';
import fetchSubreddit from '~/lib/api/reddit/fetchSubreddit';
import { stores } from '@sapper/app'
const { page } = stores();

export let segment;

let show = oneOpen();
let promise

$: $subreddit===null || validatePropSubreddit($subreddit);
$: showSideBar = getShowSubredditSidebar(subreddit, $page)
$: subredditBannerStyles = getSubredditBannerStyles(subreddit)

$: if ($page.params.subreddit) {
    promise = fetchSubreddit($page.params.subreddit)
  }
$: promise && promise.then(newSubredditValue => {
    $subreddit = newSubredditValue
  })

middlewareAuth()
</script>
