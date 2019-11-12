<div class="item-entry">
  <div class="row">{ item.id }</div>
  <div class="row">
    <div class="col-other">
      <div class="row">
        <div class="col small">
          <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
            <i class="fa fa-fw fa-btn fa-code"/>
            <span>see source</span>
          </span>
        </div>
      </div>
    </div>
  </div>
  {#if $show.any}
    <div class="row">
      <div class="col">
        {#if $show.source}
          <ShowSource value={item}/>
        {/if}
      </div>
    </div>
  {/if}
</div>

<script>
import AddToQueueButton from '~/components/AddToQueueButton';
import ApproveButton from '~/components/ApproveButton';
import CommentEntry from '~/components/CommentEntry';
import CommentForm from '~/components/CommentForm';
import CrossPostButton from '~/components/CrossPostButton';
import DeleteButton from '~/components/DeleteButton';
import DownVote from '~/components/DownVote';
import GildedBadge from '~/components/GildedBadge';
import HideButton from '~/components/HideButton';
import LockButton from '~/components/LockButton';
import NsfwButton from '~/components/NsfwButton';
import PostForm from '~/components/PostForm';
import PostImage from '~/components/PostImage';
import PostThumbnail from '~/components/PostThumbnail';
import RemoveButton from '~/components/RemoveButton';
import ReportButton from '~/components/ReportButton';
import SaveButton from '~/components/SaveButton';
import Score from '~/components/Score';
import SpamButton from '~/components/SpamButton';
import SpoilerButton from '~/components/SpoilerButton';
import SubredditLink from '~/components/SubredditLink';
import TimeAgo from '~/components/TimeAgo';
import UpVote from '~/components/UpVote';
import ShowSource from '~/components/ShowSource';
import validatePropItem from '~/lib/validateProp/item';
import { oneOpen } from '~/lib/open';
import { usernames } from '~/store/auth';

// props
export let item;
let show = oneOpen();

$: validatePropItem(item);
$: isAuthor = $usernames.includes(item.author);
</script>
