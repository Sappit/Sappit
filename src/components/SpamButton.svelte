<span
  class="btn-remove"
  {...disabled(busy || item.spam)}
  class:text-danger={item.spam === true}
  on:click|preventDefault|stopPropagation={remove}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.spam}
      unmarking spam
    {:else}
      marking spam
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-cancel"/>
    {#if item.spam}
      marked spam
    {:else}
      spam
    {/if}
  {/if}
</span>

<script>
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import disabled from '~/lib/disabled';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';

// spam is the moderator action of marking an item as spam and removing from public visibility

// props
export let item;
let busy = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);

async function remove($event) {
  const { spam, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post(`/api/remove`, {
      spam: true,
      // category: '???',
      id: name, // fullname
    });
    item.spam = true;
    if (item.approved) {
      item.approved = false;
    }
    if (item.removed) {
      item.removed = false;
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
