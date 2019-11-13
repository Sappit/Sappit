<div class="post-entry">
  <div class="row">
    {#if showThumbnail}
      <div class="col-thumbnail">
        <PostThumbnail {post} on:expand={$show.toggleImage}/>
      </div>
    {/if}
    <div class="col-other">
      <div class="row">
        <div class="col">
          {#if post.is_self}
            <a href={post.permalink}>{post.title}</a>
          {/if}
          {#if !post.is_self}
            <a href={postUrl} ref="nofollow">post.title</a>
          {/if}
          <FlairBadge item={post} type="link"/>
          {#if post.is_video}
            <span class="badge badge-secondary">[video]</span>
          {/if}
          {#if post.stickied}
            <span class="badge badge-secondary">[stickied]</span>
          {/if}
          {#if post.pinned}
            <span class="badge badge-secondary">[pinned]</span>
          {/if}
          {#if post.over_18}
            <span class="badge badge-secondary">[nsfw]</span>
          {/if}
          {#if post.spoiler}
            <span class="badge badge-secondary">[spoiler]</span>
          {/if}
          {#if post.locked}
            <span class="badge badge-secondary">[locked]</span>
          {/if}
          {#if post.author_patreon_flair}
            <span class="badge badge-secondary">[patreon]</span>
          {/if}
          {#if post.author_cakeday}
            <span class="badge badge-secondary">[cakeday]</span>
          {/if}
          <ApprovedBadge item={post}/>
          <RemovedBadge item={post}/>
          {#if post.spam}
            <span class="badge badge-danger">[spam]</span>
          {/if}
          {#if post.num_crossposts}
            <span class="badge badge-secondary">[crossposts: { post.num_crossposts }]</span>
          {/if}
          {#if post.domain}
            <small>
              <tt>
                <a href={post.is_self ? `/r/${post.domain}` : `/domain/${post.domain}`}>
                  ({post.domain})
                </a>
              </tt>
            </small>
          {/if}
          <div class="score pull-right">
            <UpVote item={post}/>
            <Score item={post}/>
            <DownVote item={post}/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col small">
          submitted
          <TimeAgo value={post.created_utc} />
          {#if post.edited}*{/if}
          by <UserLink username={post.author} />
          <FlairBadge item={post} type="author"/>
          <UsertagBadge username={post.author}/>
          <GildedBadge item={post}/>
          to
          <SubredditLink subreddit={post.subreddit}/>
          {#if post.quarantine}
          <span class="badge badge-secondary">[quarantine]</span>
          {/if}
        </div>
      </div>
      <div class="row">
        <div class="col small">
          <AddToQueueButton item={post}/>
          <a href={post.permalink}>
            <i class="fa fa-fw fa-btn fa-chat"/>
            <span>comments ({ post.num_comments })</span>
          </a>

          <a rel="nofollow" target="_blank" href="https://www.reddit.com{post.permalink}">
            <i class="fa fa-fw fa-btn fa-reddit"/>
            <span>see on reddit</span>
          </a>
          <SaveButton item={post}/>
          <HideButton item={post}/>
          {#if post.can_mod_post}
            <SpamButton item={post}/>
            <RemoveButton item={post}/>
            <BanButton item={post}/>
            <ApproveButton item={post}/>
            <AddContributorButton item={post}/>
            <LockButton item={post}/>
          {/if}
          {#if isAuthor || post.can_mod_post}
            <NsfwButton item={post}/>
            <SpoilerButton item={post}/>
          {/if}
          {#if isAuthor}
            <DeleteButton item={post}/>
            <span class="btn-edit-toggle" on:click|preventDefault|stopPropagation={$show.toggleEdit}>
              <i class="fa fa-fw fa-btn fa-edit"/>
              <span>edit</span>
            </span>
          {/if}
          {#if !isAuthor}
            <ReportButton item={post}/>
          {/if}
          {#if post.send_replies}
            <span class="btn-reply-toggle" on:click|preventDefault|stopPropagation={$show.toggleReply}>
              <i class="fa fa-fw fa-btn fa-reply"/>
              reply
            </span>
          {/if}
          <CrossPostButton
            on:click={$show.toggleCrosspost}
          />
          <TumblrShareButton
            on:click={$show.toggleTumblrshare}
          />
          {#if post.user_reports && post.user_reports.length > 0}
            <span class="btn-see-reports" on:click|preventDefault|stopPropagation={$show.toggleReports}>
              <i class="fa fa-fw fa-btn fa-megaphone"/>
              reports ({ post.user_reports.length })
            </span>
          {/if}

          <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
            <i class="fa fa-fw fa-btn fa-code"/>
            see source
          </span>
        </div>
      </div>
    </div>
  </div>
  {#if $show.any}
    <div class="row">
      <div class="col">
        {#if $show.reply}
          <CommentForm parent={post} on:updated-comment={onCommentCreated} on:close={$show.toggleReply}/>
        {/if}
        {#if $show.edit}
          <PostForm {post} on:created-comment={onPostUpdated} on:close={$show.toggleEdit}/>
        {/if}
        {#if $show.crosspost}
          <PostForm parent={post} on:created-post={onCrossPostCreated} on:close={$show.toggleCrosspost}/>
        {/if}
        {#if $show.tumblrshare}
          <TumblrShareForm parent={post} on:created-post={onTumblrShareCreated} on:close={$show.toggleTumblrshare}/>
        {/if}
        {#if $show.image || $show.tumblrshare || $show.reply}
          <PostImage {post} on:close={() => $show = null}/>
        {/if}
        {#if $show.reports}
          {#if post.user_reports && post.user_reports.length > 0}
          <div class="alert alert-danger">
            <ShowSource value={post.user_reports} />
          </div>
          {/if}
          {#if post.user_reports_dismissed && post.user_reports_dismissed.length > 0}
            <div class="alert alert-info">
              <ShowSource value={post.user_reports_dismissed} />
            </div>
          {/if}
        {/if}
        {#if $show.source}
          <ShowSource value={post} />
        {/if}
      </div>
    </div>
  {/if}
</div>

<script>
import AddToQueueButton from '~/components/AddToQueueButton';
import ApproveButton from '~/components/ApproveButton';
import ApprovedBadge from '~/components/ApprovedBadge';
import AddContributorButton from '~/components/AddContributorButton';
import BanButton from '~/components/BanButton';
import CommentEntry from '~/components/CommentEntry';
import CommentForm from '~/components/CommentForm';
import CrossPostButton from '~/components/CrossPostButton';
import DeleteButton from '~/components/DeleteButton';
import DownVote from '~/components/DownVote';
import FlairBadge from '~/components/FlairBadge';
import GildedBadge from '~/components/GildedBadge';
import HideButton from '~/components/HideButton';
import LockButton from '~/components/LockButton';
import UsertagBadge from '~/components/UsertagBadge';
import NsfwButton from '~/components/NsfwButton';
import PostForm from '~/components/PostForm';
import PostImage from '~/components/PostImage';
import PostThumbnail from '~/components/PostThumbnail';
import RemoveButton from '~/components/RemoveButton';
import RemovedBadge from '~/components/RemovedBadge';
import ReportButton from '~/components/ReportButton';
import SaveButton from '~/components/SaveButton';
import Score from '~/components/Score';
import ShowSource from '~/components/ShowSource';
import SpamButton from '~/components/SpamButton';
import SpoilerButton from '~/components/SpoilerButton';
import SubredditLink from '~/components/SubredditLink';
import TimeAgo from '~/components/TimeAgo';
import TumblrShareButton from '~/components/TumblrShareButton';
import TumblrShareForm from '~/components/TumblrShareForm';
import UpVote from '~/components/UpVote';
import UserLink from '~/components/UserLink';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropPost from '~/lib/validateProp/post';
import { usernames } from '~/store/auth';
import { oneOpen } from '~/lib/open';

const linkRegEx = /https{0,1}:\/\/(i\.|www\.|np\.|old\.){0,1}reddit\.com\//gim;
const newLink = '/';

// props
export let post;
export let showThumbnail = true;
let show = oneOpen();

$: validatePropPost(post);
$: validatePropBoolean(showThumbnail);
$: isAuthor = $usernames.includes(post.author)
$: postUrl = (post.url || '').replace(linkRegEx, newLink)

function onPostUpdated(updatedPost) {
  // @todo
}
function onCommentCreated(newComment) {
  // this.comment.data.replies = this.comment.data.replies || {
  //   data: {
  //     children: [],
  //   },
  // };
  // this.comment.data.replies.data.children.push(newComment);
  post.num_comments++;
  post = post
}
function onCrossPostCreated(newCrossPost) {
  // @todo
}
function onTumblrShareCreated(newTumblrShare) {
  // @todo
}
</script>
