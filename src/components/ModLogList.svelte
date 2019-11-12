<div class="banned-users-list">
  {#each items.data.children as log (log.id)}
    <ModLogEntry {log} />
  {/each}
</div>

<script>
import ModLogEntry from '~/components/ModLogEntry';
import validatePropModactions from '~/lib/validateProp/modactions';

// props
export let items;

$: validatePropModactions(items);
</script>


