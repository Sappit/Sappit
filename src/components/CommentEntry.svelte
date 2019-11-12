<div class="comment-entry">
  <div class="card">
    <div class="card-header text-muted">
      {#if comment.stickied}
        <span class="badge badge-secondary">[stickied]</span>
      {/if}
      {#if comment.send_replies === false}
        <span class="badge badge-warning">[send replies: false]</span>
      {/if}
      <UserLink username={comment.author} />
      {#if comment.is_submitter}
        <span class="badge badge-secondary">[OP]</span>
      {/if}

      {#if comment.locked}
        <span class="badge badge-secondary">[locked]</span>
      {/if}
      <FlairBadge item={comment} type="author"/>
      <UsertagBadge item={comment} type="author"/>
      <GildedBadge item={comment}/>
      {#if comment.author_patreon_flair}
        <span class="badge badge-secondary">[patreon]</span>
      {/if}

      {#if comment.author_cakeday}
        <span class="badge badge-secondary">[cakeday]</span>
      {/if}
      <TimeAgo value={comment.created_utc} />
      {#if comment.edited}*{/if}
      <ApprovedBadge item={comment}/>
      <RemovedBadge item={comment}/>
      {#if comment.deleted}
        <span class="badge badge-danger">[deleted]</span>
      {/if}
      {#if comment.spam}
      <span class="badge badge-danger">[spam]</span>
      {/if}
      {#if showSubreddit}
        <SubredditLink subreddit={comment.subreddit}/>
      {/if}
      {#if !$page.params.post_id && comment.link_title}
      <a href={comment.permalink}>
        <small>on { comment.link_title }</small>
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
          {#if !comment.locked}
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
          <UpVote item={comment}/>
          <Score item={comment}/>
          <DownVote item={comment}/>
        </div>
      </div>
    {/if}
    {#if !collapsed && ($show.options || $show.source)}
      <div class="card-footer text-muted bg-light">
        <AddToQueueButton item={comment}/>
        <a rel="nofollow" target="_blank" href="https://www.reddit.com{comment.permalink}">
          <i class="fa fa-fw fa-btn fa-reddit"/>
          <span>see on reddit</span>
        </a>

        <a href={comment.permalink}>
          <i class="fa fa-fw fa-btn fa-link-ext"/>
          <span>permalink</span>
        </a>
        <SaveButton item={comment}/>
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

        {#if isAuthor}
          <span class="btn-edit-toggle" on:click|preventDefault|stopPropagation={$show.toggleEdit}>
            <i class="fa fa-fw fa-btn fa-edit"/>
            edit
          </span>
        {/if}

        {#if comment.can_mod_post}
          <SpamButton item={comment}/>
          <RemoveButton item={comment}/>
          <BanButton item={comment}/>
          <ApproveButton item={comment}/>
          <AddContributorButton item={comment}/>
          <LockButton item={comment}/>
        {/if}
        {#if isAuthor}
          <DeleteButton item={comment}/>
        {/if}
        {#if !isAuthor}
          <ReportButton item={comment}/>
        {/if}
        <CrossPostButton on:click={$show.toggleCrosspost} />
        {#if comment.user_reports && comment.user_reports.length > 0}
          <span class="btn-see-reports"
              on:click|preventDefault|stopPropagation={$show.toggleReports}>
            <i class="fa fa-fw fa-btn fa-code"/>
            <span>reports ({ comment.user_reports.length })</span>
          </span>
        {/if}
        {#if comment.user_reports_dismissed && comment.user_reports_dismissed.length > 0}
          <span class="btn-see-reports" on:click|preventDefault|stopPropagation={$show.toggleReports}>
            <i class="fa fa-fw fa-btn fa-code"/>
            <span>reports (dismissed) ({ comment.user_reports_dismissed.length })</span>
          </span>
        {/if}
        <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
          <i class="fa fa-fw fa-btn fa-code"/>
          <span>see source</span>
        </span>
      </div>
    {/if}
    {#if $show.reply && !collapsed}
      <CommentForm
       parent={comment}
       on:created-comment={onCommentCreated}
       on:close={$show.toggleReply}
      />
    {/if}
    {#if $show.edit && !collapsed}
      <CommentForm
        comment={comment}
        on:updated-comment={onCommentUpdated}
        on:close={$show.toggleEdit}
      />
    {/if}
    {#if $show.crosspost && !collapsed}
      <PostForm
        parent={comment}
        on:created-post={onCrossPostCreated}
        on:close={$show.toggleCrosspost}
      />
    {/if}
    {#if $show.reports && !collapsed}
      {#if comment.user_reports && comment.user_reports.length > 0}
      <div class="alert alert-danger">
        <ShowSource value={comment.user_reports} />
      </div>
      {/if}
      {#if comment.user_reports_dismissed && comment.user_reports_dismissed.length > 0}
        <div class="alert alert-info">
          <ShowSource value={comment.user_reports_dismissed} />
        </div>
      {/if}
    {/if}
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
import ReportButton from '~/components/ReportButton';
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
import validatePropComment from '~/lib/validateProp/comment';
import { oneOpen } from '~/lib/open';
import { stores } from '@sapper/app'
const { page } = stores();

// props
export let comment;
let collapsed;
let show = oneOpen();

$: validatePropComment(comment);

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
  if (get(comment, 'user_reports.length') > 0) {
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
  comment.replies = comment.replies || [];

  comment.replies.push(newComment);
}
function onCrossPostCreated(newPost) {
  //
}
</script>
