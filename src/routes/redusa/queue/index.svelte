<div class="queue-list">
  <div class="btn-group">
    <div
      class="btn btn-danger"
      on:click|preventDefault|stopPropagation={flush}
    >Flush Queue</div>
    {#if moreThanOne}
      <div class="btn btn-primary" on:click|preventDefault|stopPropagation={reverse}>
        Reverse Entries
      </div>
      <div class="btn btn-secondary" on:click|preventDefault|stopPropagation={shuffle}>
        <i class="fa fa-fw fa-shuffle"/>
        Shuffle
      </div>
    {/if}
  </div>
  <hr>
  <h6>queue</h6>
  {#each $list as item, index (item.name+item.createdAt)}
    <QueueEntry {item}/>
  {/each}
  <hr>
  <h6>done</h6>
  {#each $doneList as item, index (item.name+item.createdAt)}
    <QueueEntry {item}/>
  {/each}
</div>

<script>
import QueueEntry from '~/components/QueueEntry';
import { list, flush, reverse, shuffle, doneList } from '~/store/queue';

$: moreThanOne = $list.length > 1
</script>
