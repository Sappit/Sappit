<span
  class="btn-block-user"
  {...disabled(busy)}
  class:text-muted={item.is_user_blocked}
  on:click|preventDefault|stopPropagation={hide}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.is_user_blocked}
      unblocking
    {:else}
      blocking
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-minus-circled"/>
    {#if item.is_user_blocked}
      blocked
    {:else}
      block
    {/if}
  {/if}
</span>

<script>
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import disabled from '~/lib/disabled';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';

// props
export let item;
let busy = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);

async function hide($event) {
  const { is_user_blocked, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    // @todo test unblock button
    const response = await reddit.post(
      `/api/${is_user_blocked ? 'unblock_user' : 'block_user'}`,
      {
        api_type: 'json',
        // account_id: // fullname of user
        name: item.author, // fullname
      },
    );
    item.is_user_blocked = !is_user_blocked;
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
