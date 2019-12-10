<div class="message-entry">
  <div class="card" class:border-info={message.new}>
    <div class="card-header">
      {#if message.new}
        <span class="badge badge-info">new</span>
      {/if}

      {#if message.subject} {message.subject} {/if}

      {#if message.context && message.link_title}
        <em>
          <a class="text-muted" href={message.context}>{message.link_title}</a>
        </em>
      {/if}
      <em class="small text-muted">from</em>
      {#if message.author}
        <UserLink username={message.author} />
        <UsertagBadge username={message.author}/>
      {:else}
        <span class="badge badge-secondary small">no username</span>
      {/if}
      via
      {#if message.subreddit}
        <SubredditLink subreddit={message.subreddit}/>
      {/if}
      sent
      <TimeAgo value={message.created_utc}/>
      {#if message.dest}
        to
        <UserLink username={message.dest} />
      {/if}
      <div class="score pull-right">
        <i
          class="fa fa-fw fa-btn btn-collapse"
          class:fa-plus={collapsed}
          class:fa-minus={!collapsed}
          on:click|preventDefault|stopPropagation={toggleCollapsed}
        />
        {#if showVoting}
          <UpVote item={message}/>
          <Score item={message}/>
          <DownVote item={message}/>
        {/if}
      </div>
    </div>
    {#if !collapsed}
      <div class="card-body">
        <ItemHtml item={message}/>
      </div>
      <div class="card-footer text-muted bg-light">
        {#if message.context}
          <AddToQueueButton item={message}/>
          <a rel="nofollow" target="_blank" href="https://www.reddit.com{message.context}">
            <i class="fa fa-fw fa-btn fa-reddit"/>
            see on reddit
          </a>
          <a href={message.context}>
            <i class="fa fa-fw fa-btn fa-link-ext"/>
            permalink
          </a>
        {/if}

        {#if parentTo}
          <a href={parentTo}>
            <i class="fa fa-fw fa-btn fa-level-up"/>
            parent
          </a>
        {/if}

        {#if linkTo}
          <a href={linkTo}>
            <i class="fa fa-fw fa-btn fa-level-up"/>
            full comments ({ message.num_comments })
          </a>
        {/if}

        <span class="btn-reply-toggle" on:click|preventDefault|stopPropagation={$show.toggleReply}>
          <i class="fa fa-fw fa-btn fa-reply"/>
          reply
        </span>
        {#if isAuthor}
          <DeleteButton item={message}/>
        {/if}
        {#if !isAuthor}
          <ReportButton item={message}/>
          <MarkUnreadButton bind:item={message}/>
          <BlockUserButton item={message}/>
        {/if}
        <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
          <i class="fa fa-fw fa-btn fa-code"/>
          <span>see source</span>
        </span>
      </div>
    {/if}
    {#if $show.reply && !collapsed}
      <CommentForm
        parent={message}
        on:append-replies={onAppendReplies}
        on:created-comment={onCommentCreated}
        on:close={$show.toggleReply}
      />
    {/if}
    {#if $show.edit && !collapsed}
      <CommentForm
        {message}
        on:updated-comment={onCommentUpdated}
        on:close={$show.toggleEdit}
      />
    {/if}
    {#if $show.source && !collapsed}
      <ShowSource value={message} />
    {/if}
  </div>
  {#if showReplies && !collapsed}
    <MessageTree messages={message.replies}/>
  {/if}
</div>

<script>
import get from 'lodash/get';
import AddToQueueButton from '~/components/AddToQueueButton';
import BlockUserButton from '~/components/BlockUserButton';
import CommentForm from '~/components/CommentForm';
import CrossPostButton from '~/components/CrossPostButton';
import DeleteButton from '~/components/DeleteButton';
import DownVote from '~/components/DownVote';
import HideButton from '~/components/HideButton';
import ItemHtml from '~/components/ItemHtml';
import MarkUnreadButton from '~/components/MarkUnreadButton';
import UsertagBadge from '~/components/UsertagBadge';
import MessageTree from '~/components/MessageTree';
import PostForm from '~/components/PostForm';
import RemoveButton from '~/components/RemoveButton';
import ReportButton from '~/components/ReportButton';
import SaveButton from '~/components/SaveButton';
import Score from '~/components/Score';
import SubredditLink from '~/components/SubredditLink';
import TimeAgo from '~/components/TimeAgo';
import UpVote from '~/components/UpVote';
import UserLink from '~/components/UserLink';
import ShowSource from '~/components/ShowSource';
import { MeData } from '~/store/auth';
import isVotableKind from '~/lib/isVotableKind';
import getMessageParentToUrl from '~/lib/getMessageParentToUrl';
import getMessageLinkToFullComments from '~/lib/getMessageLinkToFullComments';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropMessage from '~/lib/validateProp/message';
import { onMount } from 'svelte';
import { oneOpen } from '~/lib/open';
import { stores } from '@sapper/app'
const { page } = stores();

// props
export let message;
let collapsed = false;
let show = oneOpen();

// $: collapsed = !!message.collapsed;
$: validatePropMessage(message);
$: validatePropBoolean(collapsed);
$: showVoting = isVotableKind(message.kind)
$: showReplies = get(message, 'replies.data.children.length') > 0
$: parentTo = getMessageParentToUrl(message)
$: linkTo = getMessageLinkToFullComments(message, $page)
$: isAuthor = $MeData.name && message.author && ($MeData.name === message.author)

onMount(() => {
  collapsed = !!message.collapsed
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
  message.replies = message.replies || {
    data: {
      children: [],
    },
  };

  message.data.replies.data.children.push(newComment);
  message = message
}
function onAppendReplies(replies) {
  message.replies = message.replies || {
    data: {
      children: [],
    },
  };

  message.replies.data.children = [
    ...message.replies.data.children,
    ...replies,
  ];
  message = message
}
function onCrossPostCreated(newPost) {
  //
}
</script>
