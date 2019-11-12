  <div class="btn btn-danger" on:click|preventDefault|stopPropagation={flush}>Flush History</div>
  <hr>
  {#each $list as item, index (item.timestamp)}
    <HistoryEntry {item}/>
  {/each}

<script>
import HistoryEntry from '~/components/HistoryEntry';
import { list, flush } from '~/store/history';
</script>
