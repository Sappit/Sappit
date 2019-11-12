<span
  class="btn-mark-unread"
  class:disabled={(busy)}
  disabled={(busy)}
  class:text-muted={item.new === false}
  class:text-info={item.new === true}
  on:click|preventDefault|stopPropagation={hide}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.new}
      unmarking read
    {:else}
      marking unread
    {/if}
  {:else}
    {#if item.new}
      <i class="fa fa-fw fa-btn fa-plus-circled"/>
      mark read
    {:else}
      <i class="fa fa-fw fa-btn fa-minus-circled"/>
      mark unread
    {/if}
  {/if}
</span>

<script>
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import { fetchMe } from '~/store/auth';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';

// props
export let item;
let busy = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);

async function hide($event) {
  const { name } = item;
  const isUnread = item.new;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post(
      `/api/${isUnread ? 'read_message' : 'unread_message'}`,
      {
        // category: '???',
        id: name, // fullname
      },
    );
    item.new = !isUnread;

    // update the red icon + mail count
    /* no await */ fetchMe();
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
