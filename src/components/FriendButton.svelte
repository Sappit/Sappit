<span
  class="btn-set-friend"
  class:disabled={(busy)}
  disabled={(busy)}
  class:text-danger={item.is_friend === true}
  class:text-success={item.is_friend === false}
  on:click|preventDefault|stopPropagation={setFriend}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.is_friend}
      unfriending
    {:else}
      friending
    {/if}
  {:else}
    {#if item.is_friend}
      <i class="fa fa-fw fa-btn fa-minus"/>
      unfriend
    {:else}
      <i class="fa fa-fw fa-btn fa-plus"/>
      friend
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

async function setFriend($event) {
  const { is_friend, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    if (is_friend) {
      const response = await reddit.delete(
        `/api/v1/me/friends/${name}`,
        {
          id: name, // fullname
        },
      );
    } else {
      const response = await reddit.put(
        `/api/v1/me/friends/${name}`,
        // this one is JSON api for some reason
        JSON.stringify({
          name, // fullname
        }),
      );
    }
    item.is_friend = !is_friend;
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
