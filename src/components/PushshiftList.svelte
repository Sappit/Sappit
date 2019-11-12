<div class="posts-list">
  {#each items.data.children as item (item.id)}
    <PushshiftEntry {item} />
  {/each}
</div>

<script>
import PushshiftEntry from '~/components/PushshiftEntry';
import validatePropItems from '~/lib/validateProp/items';

// props
export let items;

$: validatePropItems(items);
</script>


