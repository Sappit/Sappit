{#if username==='[deleted]'}
  <tt>[deleted]</tt>
{:else}
  <a href="/user/{username}" {style}>/u/{username}</a>
{/if}

<script>
import { censorUsernames } from '~/store/settings';
import { intToRGB, hashCode } from '~/lib/colors';
import validatePropUsername from '~/lib/validateProp/username';

export let username;

let style = null

$: validatePropUsername(username);
$: style = $censorUsernames ? getCensoredStyles(username) : null

function getCensoredStyles(username) {
  const color = intToRGB(hashCode(username));
  return `color: #${color};background-color: #${color}`;
}
</script>
