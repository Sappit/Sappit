{#if isBot(username)}
  <BotBadge/>
{:else if !$mtEnable}
  <span class="mt-disabled"/>
{:else if masstaggerSubs === true}
  <span class="badge badge-secondary" hidden={true}>
    <small>
      <i class="fa fa-fw fa-spinner fa-spin"/>
      loading masstagger
    </small>
  </span>
{:else if masstaggerSubs}
  <a rel="nofollow" target="_blank" href="https://masstagger.com/user/{username.toUpperCase()}">
    <span class="badge badge-danger badge-mt">{masstaggerSubs}</span>
  </a>
{:else if showNone}
  <span class="badge badge-secondary no-flair">(no masstagger subs)</span>
{/if}

<script>
import BotBadge from '~/components/BotBadge';
import { isBot } from '~/lib/bots';
import { mtEnable, findByUsername } from '~/store/masstagger'
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropString from '~/lib/validateProp/string';

// props
export let item;
export let showNone = false;
export let name;

$: validatePropItem(item);
$: validatePropBoolean(showNone);
$: validatePropString(name);
$: username = name || item.author
$: masstaggerSubs = findByUsername(username)
</script>
