{#if isRemoved}
<span class="badge badge-danger">
  removed
  {#if item.removal_reason}
    {item.removal_reason}
  {/if}
  {#if item.banned_by}
    [by <UserLink class="text-white" username={item.banned_by} />]
  {/if}
  {#if item.mod_reason_by}
    [by <UserLink class="text-white" username={item.mod_reason_by} />]
  {/if}
  {#if item.ban_note}
    [{item.ban_note}]
  {/if}
  {#if item.banned_at_utc}
    <TimeAgo class="small" value={item.banned_at_utc}/>
  {/if}
</span>
{/if}

<script>
import RemoveButton from '~/components/RemoveButton';
import TimeAgo from '~/components/TimeAgo';
import UserLink from '~/components/UserLink';
import isItemRemoved from '~/lib/isItemRemoved';
import validatePropItem from '~/lib/validateProp/item';

// props
export let item;

$: validatePropItem(item);
$: isRemoved = isItemRemoved(item);
</script>
