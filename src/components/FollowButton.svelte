<span
  class="btn-follow"
  {...disabled(busy)}
  class:text-info={item.subreddit.user_is_subscriber === true}
  class:text-success={item.subreddit.user_is_subscriber === false}
  on:click|preventDefault|stopPropagation={follow}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.subreddit.user_is_subscriber}
      unfollowing...
    {:else}
      following...
    {/if}
  {:else}
    <i class="fa fa-fw fa-btn fa-bookmark"/>
    {#if item.subreddit.user_is_subscriber}
      following
    {:else}
      follow
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

async function follow($event) {
  const { name } = item;
  const { user_is_subscriber } = item.subreddit;
  const minWait = startMinWait();
  try {
    busy = true;
    const response = await reddit.post('/api/subscribe', {
      action: user_is_subscriber ? 'unsub' : 'sub',
      sr_name: `u_${name}`, // `u_${username}`
      api_type: 'json',
    });
    item.subreddit.user_is_subscriber = !user_is_subscriber;
  } catch (err) {
    console.error(err);
    error = err;
  } finally {
    await minWait;
    busy = false;
  }
}
</script>
