<div class="comment-entry">
  <div class="card">
    <div class="card-header text-muted">
      <span class="badge badge-danger">[pushshift-only]</span>
      {#if comment.stickied}
        <span class="badge badge-secondary">[stickied]</span>
      {/if}
      <UserLink username={comment.author} />
      {#if comment.is_submitter}
        <span class="badge badge-secondary">[OP]</span>
      {/if}

<!--       {#if comment.locked}
        <span class="badge badge-secondary">[locked]</span>
      {/if} -->
      <FlairBadge item={comment} type="author"/>
      <UsertagBadge username={comment.author}/>
      <GildedBadge item={comment}/>
      {#if comment.author_patreon_flair}
        <span class="badge badge-secondary">[patreon]</span>
      {/if}

<!--       {#if comment.author_cakeday}
        <span class="badge badge-secondary">[cakeday]</span>
      {/if} -->
      <TimeAgo value={comment.created_utc} />
      <!-- {#if comment.edited}*{/if} -->
      <!-- <ApprovedBadge item={comment}/> -->
      <!-- <RemovedBadge item={comment}/> -->
<!--       {#if comment.spam}
      <span class="badge badge-danger">[spam]</span>
      {/if} -->
      {#if showSubreddit}
        <SubredditLink subreddit={comment.subreddit}/>
      {/if}
      {#if !$page.params.post_id}
      <a href={comment.permalink}>
        <small>
          on
          {#if comment.link_title}
            { comment.link_title }
          {:else if comment.postEntry && comment.postEntry.title}
            { comment.postEntry.title }
          {/if}
        </small>
      </a>
      {/if}
      <div class="pull-right">
        <i
          class="fa fa-fw fa-btn btn-collapse"
          class:fa-plus={collapsed}
          class:fa-minus={!collapsed}
          on:click|preventDefault|stopPropagation={toggleCollapsed}
        />
      </div>
    </div>
    {#if !collapsed}
      <div class="card-body">
        <ItemHtml item={comment}/>
        <div class="options-icons pull-right">
          {#if comment.send_replies}
            <span
              class="btn-reply-toggle"
              class:text-info={$show.reply}
              on:click|preventDefault|stopPropagation={$show.toggleReply}
            >
              <i class="fa fa-fw fa-btn fa-reply"/>
            </span>
          {/if}

          <i
            class="fa fa-cog fa-fw fa-btn btn-options"
            class:text-info={$show.options}
            on:click|preventDefault|stopPropagation={$show.toggleOptions}
          />
          <!-- <UpVote item={comment}/> -->
          <Score item={comment}/>
          <!-- <DownVote item={comment}/> -->
        </div>
      </div>
    {/if}
    {#if !collapsed && ($show.options || $show.source)}
      <div class="card-footer text-muted bg-light">
        <!-- <AddToQueueButton item={comment}/> -->
        <a rel="nofollow" target="_blank" href="https://www.reddit.com{comment.permalink}">
          <i class="fa fa-fw fa-btn fa-reddit"/>
          <span>see on reddit</span>
        </a>

        <a href={comment.permalink}>
          <i class="fa fa-fw fa-btn fa-link-ext"/>
          <span>permalink</span>
        </a>
        <!-- <SaveButton item={comment}/> -->
        {#if parentTo}
          <a href={parentTo}>
            <i class="fa fa-fw fa-btn fa-level-up"/>
            <span>parent</span>
          </a>
        {/if}

        {#if linkToFullComments}
          <a href={linkToFullComments}>
            <i class="fa fa-fw fa-btn fa-level-up"/>
            <span>full comments</span>
          </a>
        {/if}

        <!-- <CrossPostButton on:click={$show.toggleCrosspost} /> -->
        <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
          <i class="fa fa-fw fa-btn fa-code"/>
          <span>see source</span>
        </span>
      </div>
    {/if}
<!--     {#if $show.crosspost && !collapsed}
      <PostForm
        parent={comment}
        on:created-post={onCrossPostCreated}
        on:close={$show.toggleCrosspost}
      />
    {/if} -->
    {#if $show.source && !collapsed}
      <ShowSource value={comment} />
    {/if}
  </div>
</div>

<script>
import get from 'lodash/get';
import ApproveButton from '~/components/ApproveButton';
import ApprovedBadge from '~/components/ApprovedBadge';
import AddToQueueButton from '~/components/AddToQueueButton';
import AddContributorButton from '~/components/AddContributorButton';
import BanButton from '~/components/BanButton';
import CommentForm from '~/components/CommentForm';
import CrossPostButton from '~/components/CrossPostButton';
import DeleteButton from '~/components/DeleteButton';
import DownVote from '~/components/DownVote';
import FlairBadge from '~/components/FlairBadge';
import GildedBadge from '~/components/GildedBadge';
import HideButton from '~/components/HideButton';
import ItemHtml from '~/components/ItemHtml';
import LockButton from '~/components/LockButton';
import UsertagBadge from '~/components/UsertagBadge';
import PostForm from '~/components/PostForm';
import RemovedBadge from '~/components/RemovedBadge';
import RemoveButton from '~/components/RemoveButton';
import SaveButton from '~/components/SaveButton';
import Score from '~/components/Score';
import ShowSource from '~/components/ShowSource';
import SpamButton from '~/components/SpamButton';
import SubredditLink from '~/components/SubredditLink';
import TimeAgo from '~/components/TimeAgo';
import UpVote from '~/components/UpVote';
import UserLink from '~/components/UserLink';
import isItemRemoved from '~/lib/isItemRemoved';
import getCommentLinkToFullComments from '~/lib/getCommentLinkToFullComments';
import getCommentParentToUrl from '~/lib/getCommentParentToUrl';
import { isVirtualSubreddit } from '~/lib/subreddit';
import { onMount } from 'svelte'
import { usernames } from '~/store/auth'
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropPushshiftComment from '~/lib/validateProp/pushshiftComment';
import { oneOpen } from '~/lib/open';
import { stores } from '@sapper/app'
const { page } = stores();

// props
export let comment;
let collapsed;
let show = oneOpen();

$: validatePropPushshiftComment(comment);

$: collapsed = !!comment.collapsed;
$: validatePropBoolean(collapsed);
$: isRemoved = isItemRemoved(comment)
$: parentTo = getCommentParentToUrl(comment)
$: linkToFullComments = getCommentLinkToFullComments(comment, $page)
$: isAuthor = $usernames.includes(comment.author)
$: showSubreddit = checkIfShouldShowSubreddit(comment, $page);

function checkIfShouldShowSubreddit(comment, $page) {
  if (!comment.subreddit) return false;
  if (!$page.params.subreddit) return true;
  return isVirtualSubreddit($page.params.subreddit);
}

onMount(() => {
  if (get(comment, 'mod_reports.length') > 0) {
    $show = 'options';
  } else if (get(comment, 'user_reports.length') > 0) {
    $show = 'options';
  }
})

function toggleCollapsed($event) {
  collapsed = !collapsed;
}
function setCollapsed(value) {
  collapsed = !!value;
}
function onCommentUpdated(updatedComment) {
  // @todo
}
function onCommentCreated(newComment) {
  comment.replies = comment.replies || {
    data: {
      children: [],
    },
  };

  comment.replies.data.children.push(newComment);
}
function onCrossPostCreated(newPost) {
  //
}
</script>
