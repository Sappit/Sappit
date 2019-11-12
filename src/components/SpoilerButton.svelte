<span
  class="btn-spoiler"
  class:disabled={(busy)}
  disabled={(busy)}
  on:click|preventDefault|stopPropagation={spoiler}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.spoiler}
      unmarking spoiler
    {:else}
      marking spoiler
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-user-secret"/>
    {#if item.spoiler}
      unspoiler
    {:else}
      spoiler
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

async function spoiler($event) {
  const { spoiler, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post(
      `/api/${spoiler ? 'unspoiler' : 'spoiler'}`,
      {
        // category: '???',
        id: name, // fullname
      },
    );
    item.spoiler = !spoiler;
  } catch (err) {
    console.error(err);
    error = err;
  } finally {
    await minWait;
    busy = false;
    item = item;
  }
}
</script>
