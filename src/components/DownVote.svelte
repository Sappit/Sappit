<i
  class="btn-UpVote fa fa-fw fa-btn"
  class:disabled={voting}
  class:text-danger={item.likes === false}
  class:fa-down-big={!voting}
  class:fa-spinner={voting}
  class:fa-spin={voting}
  on:click|preventDefault|stopPropagation={vote}
/>

<script>
import { startMinWait } from '~/lib/sleep';
import reddit from '~/lib/reddit';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';

// props
export let item;
let voting = false;
let error = null;

$: validatePropItem(item);
$: validatePropBoolean(voting);

async function vote($event) {
  const { likes, name } = item;
  const minWait = startMinWait();
  try {
    voting = true;
    const response = await reddit.post('/api/vote', {
      dir: likes === false ? 0 : -1,
      id: name, // fullname
      rank: 2,
      // uh / X-Modhash header // not required with OAuth
    });
    item.likes = likes === false ? null : false;
    if (likes === false) {
      item.score++;
    } else if (likes === true) {
      item.score -= 2;
    } else {
      item.score--;
    }
  } catch (err) {
    console.error(err);
    error = err;
  } finally {
    await minWait;
    voting = false;
    item = item;
  }
}
</script>
