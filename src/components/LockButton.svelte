<span
  class="btn-lock"
  class:disabled={(busy)}
  disabled={(busy)}
  class:text-success={item.locked === true}
  on:click|preventDefault|stopPropagation={lock}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.locked}
      unlocking
    {:else}
      locking
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-lock"/>
    {#if item.locked}
      locked
    {:else}
      lock
    {/if}
  {/if}
</span>

<script>
import { startMinWait } from '~/lib/sleep';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import reddit from '~/lib/reddit';

// lock is the moderator action of locking an item from public visibility

// props
export let item;
let busy = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);

async function lock($event) {
  const { locked, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post(
      `/api/${locked ? 'unlock' : 'lock'}`,
      {
        // category: '???',
        id: name, // fullname
      },
    );
    item.locked = !locked;
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
