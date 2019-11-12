<span
  class="btn-delete"
  class:disabled={(busy)}
  disabled={(busy)}
  class:text-danger={item.deleted}
  on:click|preventDefault|stopPropagation={trash}
>
  {#if busy}
    <i class="fa fa-fw fa-btn fa-spinner fa-spin"/>
    {#if item.deleted}
      undeleting
    {:else}
      deleting
    {/if}
  {:else if prompted}
    <i class="fa fa-fw fa-btn fa-trash"/>
    Are you sure? (delete)
  {:else}
    <i class="fa fa-fw fa-btn fa-trash"/>
    {#if item.deleted}
      deleted
    {:else}
      delete
    {/if}
  {/if}
</span>

<script>
import get from 'lodash/get';
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';

// delete is the user action of permanently trashing their own item

// props
export let item;
let prompted = false;
let busy = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(busy);
$: validatePropBoolean(prompted);

async function trash($event) {
  if (prompted) {
    const { deleted, name } = item;
    const minWait = startMinWait();
    try {
      busy = true;
      const response = await reddit.post(
        '/api/del',
        {
          // category: '???',
          id: name, // fullname
        },
        {
          username: item.author,
        },
      );
      item.deleted = !deleted;
    } catch (err) {
      console.error(err);
      error = err;
    } finally {
      await minWait;
      busy = false;
      prompted = false;
      item = item;
    }
  } else {
    prompted = true;
  }
}
</script>
