<span
  class="btn-hide"
  class:disabled={(busy)}
  disabled={(busy)}
  class:text-muted={item.hidden === true}
  on:click|preventDefault|stopPropagation={hide}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.hidden}
      unhiding
    {:else}
      hiding
    {/if}
  {:else}
    {#if item.hidden}
      <i class="fa fa-fw fa-btn fa-plus-circled"/>
      hidden
    {:else}
      <i class="fa fa-fw fa-btn fa-minus-circled"/>
      hide
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

async function hide($event) {
  const { hidden, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post(
      `/api/${hidden ? 'unhide' : 'hide'}`,
      {
        // category: '???',
        id: name, // fullname
      },
    );
    item.hidden = !hidden;
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
