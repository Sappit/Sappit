<div class="apilog-entry">
  <div class="card">
    <div class="card-header">
      <a href={item.route || '/sappit/queue?error=1'}>{item.text}</a>
      <div class="pull-right">
        <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
          <i class="fa fa-fw fa-btn fa-code"/>
          see source
        </span>
      </div>
    </div>
    {#if $show.source}
      <ShowSource value={item} />
    {/if}
  </div>
</div>

<script>
import TimeAgo from '~/components/TimeAgo';
import ShowSource from '~/components/ShowSource';
import validatePropQueueEntry from '~/lib/validateProp/queueEntry';
import { oneOpen } from '~/lib/open';

// props
export let item;
let show = oneOpen();

$: validatePropQueueEntry(item);

</script>
