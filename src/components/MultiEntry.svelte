<div class="multi-entry">
  <div class="multi-row-1">
    <MultiLink name={multi.name}/>
    {multi.display_name}
  </div>
  <div class="multi-row-2">
    <ItemHtml value={multi.public_description_html}/>
  </div>
  <div class="multi-row-3">
    {#each multi.subreddits as sr (sr.name)}
      <SubredditLink subreddit={sr.name}/>
    {/each}
  </div>
  <div class="multi-row-4 text-muted">
    created
    <TimeAgo value={multi.created_utc}/>
    <!-- <ReportButton item={multi}/> -->
    |
    <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
      <i class="fa fa-fw fa-btn fa-code"/>
      see source
    </span>
  </div>
  {#if $show.any}
    <div class="multi-row-source">
      {#if $show.source}
        <ShowSource value={multi}/>
      {/if}
    </div>
  {/if}
</div>

<script>
import ItemHtml from '~/components/ItemHtml';
// import ReportButton from '~/components/ReportButton';
import MultiLink from '~/components/MultiLink';
import SubredditLink from '~/components/SubredditLink';
import SubscribeButton from '~/components/SubscribeButton';
import TimeAgo from '~/components/TimeAgo';
import ShowSource from '~/components/ShowSource';
import validatePropMulti from '~/lib/validateProp/multi';
import { oneOpen } from '~/lib/open';

// props
export let multi;
let show = oneOpen();

$: validatePropMulti(multi);
</script>
