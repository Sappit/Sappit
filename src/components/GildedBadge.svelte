{#if text}
  <span class="badge badge-secondary">{text}</span>
{/if}

<script>
import get from 'lodash/get';
import validatePropItem from '~/lib/validateProp/item';

// examples of gilded comments/posts
// @link https://www.reddit.com/user/PoglaTheGrate/gilded/


// props
export let item;

$: validatePropItem(item);
$: text = getText(item);

function getText(item) {
  const { gildings } = item;
  if (gildings) {
    let text = '';
    if (gildings.gid_1 > 0) {
      if (text) text += ', ';
      text += `silver: ${gildings.gid_1}`;
    }
    if (gildings.gid_2 > 0) {
      if (text) text += ', ';
      text += `gold: ${gildings.gid_2}`;
    }
    if (gildings.gid_3 > 0) {
      if (text) text += ', ';
      text += `platinum: ${gildings.gid_3}`;
    }
    return text;
  }
  return null;
}
</script>


