<span
  class="btn-nsfw"
  class:disabled={(busy)}
  disabled={(busy)}
  class:text-success={item.nsfw === true}
  on:click|preventDefault|stopPropagation={nsfw}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.over_18}
      unmarking nsfw
    {:else}
      marking nsfw
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-attention"/>
    {#if item.over_18}
      unmark nsfw
    {:else}
      mark nsfw
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

async function nsfw($event) {
  const { over_18, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post(
      `/api/${over_18 ? 'unmarknsfw' : 'marknsfw'}`,
      {
        // category: '???',
        id: name, // fullname
      },
    );
    item.over_18 = !over_18;
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
