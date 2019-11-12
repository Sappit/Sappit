<div class="subreddit-entry">
  {#if subreddit.icon_img}
    <img
      class="img-fluid pull-left subreddit-icon"
      src={subreddit.icon_img}
      alt="subreddit icon"
    />
  {/if}
  <div class="subreddit-row-1">
    <SubredditLink subreddit={subreddit.display_name}/>
    <span>{subreddit.title}</span>
    {#if subreddit.quarantine}
      <span class="badge badge-warning">[quarantine]</span>
    {/if}
    {#if subreddit.over18}
      <span class="badge badge-secondary">[nsfw]</span>
    {/if}
  </div>
  <div class="subreddit-row-2">
    <ItemHtml value={subreddit.public_description_html}/>
  </div>
  <div class="subreddit-row-3 text-muted">
    <SubscribeButton item={subreddit}/>
    | { subreddit.subscribers } subscribers
    | created <TimeAgo value={subreddit.created_utc}/>
    |
    <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
      <i class="fa fa-fw fa-btn fa-code"/>
      see source
    </span>
  </div>
  {#if $show.any}
    <div class="subreddit-row-source">
      {#if $show.source}
        <ShowSource value={subreddit}/>
      {/if}
    </div>
  {/if}
</div>

<script>
import CrossPostButton from '~/components/CrossPostButton';
import ItemHtml from '~/components/ItemHtml';
import SubredditLink from '~/components/SubredditLink';
import SubscribeButton from '~/components/SubscribeButton';
import TimeAgo from '~/components/TimeAgo';
import ShowSource from '~/components/ShowSource';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { oneOpen } from '~/lib/open';

// props
export let subreddit;
let show = oneOpen();

$: validatePropSubreddit(subreddit);

</script>
