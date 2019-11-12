<span
  class="btn-subscribe"
  disabled={(busy)}
  class:disabled={(busy)}
  class:text-success={item.user_is_subscriber === true}
  on:click|preventDefault|stopPropagation={subscribe}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.user_is_subscriber}
      unsubscribing
    {:else}
      subscribing
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-bookmark"/>
    {#if item.user_is_subscriber}
      subscribed
    {:else}
      subscribe
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

async function subscribe($event) {
  const { user_is_subscriber, name } = item;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post('/api/subscribe', {
      action: user_is_subscriber ? 'unsub' : 'sub',
      sr: name, // fullname
    });
    item.user_is_subscriber = !user_is_subscriber;
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
