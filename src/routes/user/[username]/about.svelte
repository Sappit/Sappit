{#if $user}
<div class="about-user">
  <p>link_karma: { $user.link_karma }</p>
  <p>comment_karma: { $user.comment_karma }</p>
  <p>has_verified_email: { $user.has_verified_email }</p>
  <p>is_employee: { $user.is_employee }</p>
  <p>is_friend: { $user.is_friend }</p>
  <p>is_gold: { $user.is_gold }</p>
  <p>verified: { $user.verified }</p>
  {#if $user.subreddit}
  <div class="user-subreddit">
    <p>subreddit.over_18: { $user.subreddit.over_18 }</p>
    <p>subreddit.subreddit_type: { $user.subreddit.subreddit_type }</p>
    <p>subreddit.public_description: { $user.subreddit.public_description }</p>
    <p>subreddit.subscribers: { $user.subreddit.subscribers }</p>
    <p>subreddit.title: { $user.subreddit.title }</p>
    <p>subreddit.url: { $user.subreddit.url }</p>
    <p>subreddit.show_media: { $user.subreddit.show_media }</p>
    <p>subreddit.user_is_banned: { $user.subreddit.user_is_banned }</p>
    <p>subreddit.user_is_contributor: { $user.subreddit.user_is_contributor }</p>
    <p>subreddit.user_is_moderator: { $user.subreddit.user_is_moderator }</p>
    <p>subreddit.user_is_muted: { $user.subreddit.user_is_muted }</p>
    <p>subreddit.user_is_subscriber: { $user.subreddit.user_is_subscriber }</p>
  </div>
  {/if}
  <TimeAgo value={$user.created_utc} />
</div>
{/if}

<script>
import middlewareAuth from '~/lib/middleware/auth';
import TimeAgo from '~/components/TimeAgo';
import validatePropUser from '~/lib/validateProp/user';
import { user } from '~/store/params';

// props
// export let segment;
// export let user = null;

$: !$user || validatePropUser($user);
// $: console.log('about:$user', $user)

middlewareAuth()
</script>
