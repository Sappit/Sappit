<span
  class="btn-save"
  class:disabled={(busy)}
  disabled={(busy)}
  class:text-success={item.saved === true}
  on:click|preventDefault|stopPropagation={save}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.saved}
      unsaving
    {:else}
      saving
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-bookmark"/>
    {#if item.saved}
      saved
    {:else}
      save
    {/if}
  {/if}
</span>

<script>
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';

// props
export let item;
let busy = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);

async function save($event) {
  const { saved, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post(
      `/api/${saved ? 'unsave' : 'save'}`,
      {
        // category: '???',
        id: name, // fullname
      },
    );
    item.saved = !saved;
  } catch (err) {
    console.error(err);
    error = err;
  } finally {
    await minWait;
    busy = false;
    item = item
  }
}
</script>
