{#if text}
  <span class="badge badge-secondary {cssclass}" {style}>{text}</span>
{:else if showNone}
  <span class="badge badge-secondary no-flair">(no flair)</span>
{/if}

<script>
import get from 'lodash/get';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropStringIn from '~/lib/validateProp/stringIn';

// props
export let type;
export let item;
export let showNone = false;
export let promptingFlair = false;

$: validatePropStringIn(type, ['link', 'user', 'author']);
$: validatePropItem(item);
$: validatePropBoolean(showNone);
$: validatePropBoolean(promptingFlair);
$: canEditFlair = getCanEditFlair(item, type);
$: text = item[`${type}_flair_text`]
$: cssclass = getCssclass(item, type, canEditFlair)
$: style = getStyle(item, type, canEditFlair)

function getCanEditFlair(item, type) {
  if (item) {
    if (item.user_can_flair_in_sr) {
      return true;
    }
    if (type === 'user' && item.can_assign_user_flair) {
      return true;
    }
    if (type === 'link' && item.can_assign_link_flair) {
      return true;
    }
  }
  return false;
}
function getCssclass(item, type, canEditFlair) {
  const arr = [];
  arr.push(item[`${type}_flair_css_class`]);
  if (canEditFlair) {
    arr.push('cursor-pointer');
  }
  return arr.filter(Boolean).join(' ');
}

function getStyle(item) {
  const styles = {};
  const textcolor = item[`${type}_flair_text_color`];
  const bgcolor = item[`${type}_flair_background_color`]
  if (textcolor) {
    styles.color = textcolor;
  }
  if (bgcolor) {
    styles.backgroundColor = bgcolor;
  }
  return styles;
}

function promptFlair($event) {
  promptingFlair = true;
}
</script>
