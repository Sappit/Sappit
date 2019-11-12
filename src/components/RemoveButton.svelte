<span
  class="btn-remove"
  class:disabled={(busy || isRemoved)}
  disabled={(busy || isRemoved)}
  class:text-success={isRemoved}
  on:click|preventDefault|stopPropagation={remove}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if isRemoved}
      unremoving
    {:else}
      removing
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-cancel"/>
    {#if isRemoved}
      removed
    {:else}
      remove
    {/if}
  {/if}
</span>

<script>
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import isItemRemoved from '~/lib/isItemRemoved';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';

// remove is the moderator action of removing an item from public visibility

// props
export let item;
let busy = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);
$: isRemoved = isItemRemoved(item);

async function remove($event) {
  const { removed, name, subreddit } = item.data;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post(`/api/remove`, {
      // api_type: 'json',
      // spam: false,
      // r: subreddit,
      // executed: 'removed',
      id: name, // fullname

      executed: 'removed',
      spam: 'False',
      r: subreddit,
      // uh: eahqitwrtvc64410d588440459119b1292e96a061d7aed78d5
      // renderstyle: 'html',
      renderstyle: 'json',
    });
    item.removed = true;
    if (item.approved) {
      item.approved = false;
    }
    if (item.spam) {
      item.spam = false;
    }
    if (item.approved_by) {
      item.approved_by = null;
    }
    if (item.approved_at_utc) {
      item.approved_at_utc = null;
    }
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
