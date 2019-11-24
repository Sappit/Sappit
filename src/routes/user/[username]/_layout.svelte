{#await promise}
  <Loading/>
{:then user}
  <div class="container subreddit-banner" style={subredditBannerStyles}>
    <br>
    {#if user.icon_img}
      <img
        class="profile-icon-img img-thumbnail"
        src={user.icon_img}
        alt="user account profile image"
      />
    {/if}
    <br>
    <br>
    <br>
  </div>
  <h2>
    /u/<span on:click|preventDefault|capture={clipboard}>{user.name}</span>
    <div class="pull-right"></div>
  </h2>
  <p>
    <SubscribeButton item={user}/>
    <FriendButton item={user}/>
    {#if user.subreddit}
      <FollowButton item={user}/>
    {/if}
    <TimeAgo value={user.created_utc} />
    <a rel="nofollow" target="_blank" href="https://www.reddit.com{$page.path}">
      <i class="fa fa-fw fa-btn fa-reddit"/>
      see on reddit
    </a>

    <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
      <i class="fa fa-fw fa-btn fa-code"/>
      see source
    </span>
  </p>
  {#if $show.source}
    <ShowSource value={user}/>
  {/if}

  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a href="/user/{$page.params.username}/about" class="nav-link" class:active={segment==='about'}>
        <i class="fa fa-fw fa-btn fa-book"/>
        About
      </a>
    </li>
    <li class="nav-item">
      <a href="/user/{$page.params.username}/overview" class="nav-link" class:active={segment==='overview'}>
        <i class="fa fa-fw fa-btn fa-book"/>
        Overview
      </a>
    </li>
    <li class="nav-item">
      <a href="/user/{$page.params.username}/submitted" class="nav-link" class:active={segment==='submitted'}>
        <i class="fa fa-fw fa-btn fa-list"/>
        Submitted
      </a>
    </li>
    <li class="nav-item">
      <a href="/user/{$page.params.username}/comments" class="nav-link" class:active={segment==='about'}>
        <i class="fa fa-fw fa-btn fa-chat"/>
        Comments
      </a>
    </li>
    {#if showUpvotedTab}
      <li class="nav-item">
        <a href="/user/{$page.params.username}/upvoted" class="nav-link" class:active={segment==='upvoted'}>
          <i class="fa fa-fw fa-btn fa-up-big"/>
          Upvoted
        </a>
      </li>
    {/if}
    {#if showDownvotedTab}
      <li class="nav-item">
        <a href="/user/{$page.params.username}/downvoted" class="nav-link" class:active={segment==='downvoted'}>
          <i class="fa fa-fw fa-btn fa-down-big"/>
          Downvoted
        </a>
      </li>
    {/if}
    {#if showSavedTab}
      <li class="nav-item">
        <a href="/user/{$page.params.username}/saved" class="nav-link" class:active={segment==='saved'}>
          <i class="fa fa-fw fa-btn fa-floppy"/>
          Saved
        </a>
      </li>
    {/if}
    {#if showHiddenTab}
      <li class="nav-item">
        <a href="/user/{$page.params.username}/hidden" class="nav-link" class:active={segment==='hidden'}>
          <i class="fa fa-fw fa-btn fa-minus-circled"/>
          Hidden
        </a>
      </li>
    {/if}
    {#if showGildedTab}
      <li class="nav-item">
        <a href="/user/{$page.params.username}/gilded" class="nav-link" class:active={segment==='gilded'}>
          <i class="fa fa-fw fa-btn fa-money"/>
          Gilded
        </a>
      </li>
    {/if}
    <li class="nav-item">
      <a href="/pushshift/search/?kind=comment&author={$page.params.username}" class="nav-link" class:active={segment==='pushshift'}>
        <i class="fa fa-fw fa-btn fa-list"/>
        Pushshift
      </a>
    </li>
  </ul>

  <slot {user}></slot>
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import first from 'lodash/first';
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import FollowButton from '~/components/FollowButton';
import FriendButton from '~/components/FriendButton';
import redditItems from '~/lib/redditItems';
import SubscribeButton from '~/components/SubscribeButton';
import TimeAgo from '~/components/TimeAgo';
import ShowSource from '~/components/ShowSource';
import getSubredditBannerStyles from '~/lib/getSubredditBannerStyles';
import middlewareAuth from '~/lib/middleware/auth';
import { usernames } from '~/store/auth';
import { user } from '~/store/params';
import { stores } from '@sapper/app'
import fetchUser from '~/lib/api/reddit/fetchUser';
import { oneOpen } from '~/lib/open';

const { page } = stores();

export let segment = 'overview';

let show = oneOpen();
let promise = null;

$: isAuthor = $user && $user.name && $usernames.includes($user.name);
$: subredditBannerStyles = ($user && user.subreddit) ? getSubredditBannerStyles($user.subreddit) : null
$: showUpvotedTab = isAuthor;
$: showDownvotedTab = isAuthor;
$: showSavedTab = isAuthor;
$: showHiddenTab = isAuthor;
$: showGildedTab = isAuthor;
$: if ($page.params.username) {
    promise = fetchUser($page.params.username)
  }
$: promise && promise.then(newUserValue => {
    $user = newUserValue
  })

middlewareAuth()

function clipboard (event) {
  navigator.clipboard.writeText($user.name)
}
</script>
