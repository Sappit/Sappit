<span
  class="btn-approve"
  class:disabled={(busy || item.approved)}
  disabled={(busy || item.approved)}
  class:text-success={item.approved}
  on:click|preventDefault|stopPropagation={approve}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.approved}
      unapproving
    {:else}
      approving
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-floppy"/>
    {#if item.approved}
      approved
    {:else}
      approve
    {/if}
  {/if}
</span>

<script>
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';

// approve is the moderator action of approving an item from public visibility

// props
export let item;
let busy = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);

async function approve($event) {
  const { approved, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post(`/api/approve`, {
      // category: '???',
      id: name, // fullname
    });
    item.approved = true;
    if (item.removed) {
      item.removed = false;
    }
    if (item.spam) {
      item.spam = false;
    }
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
