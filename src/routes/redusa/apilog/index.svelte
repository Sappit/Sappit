<div class="btn btn-danger" on:click|preventDefault|stopPropagation={flush}>Flush API Log</div>
<hr>
{#each  $list as item (item.timestamp)}
  <ApilogEntry {item}/>
{/each}

<script>
import ApilogEntry from '~/components/ApilogEntry';
import { list, flush } from '~/store/apilog';
</script>
