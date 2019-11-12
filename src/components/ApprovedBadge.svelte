{#if item.approved}
  <span class="badge badge-success">
    approved
    {#if item.removal_reason}
      {item.removal_reason}
    {/if}
    {#if item.approved_by}
        [by <UserLink class="text-white" username={item.approved_by} />]
    {/if}
    {#if item.mod_reason_by}
        [by <UserLink class="text-white" username={item.mod_reason_by} />]
    {/if}
    {#if item.ban_note}
      [{item.ban_note}]
    {/if}
    {#if item.approved_at_utc}
      <TimeAgo value={item.approved_at_utc} />
    {/if}
  </span>
{/if}

<script>
import ApproveButton from '~/components/ApproveButton';
import TimeAgo from '~/components/TimeAgo';
import UserLink from '~/components/UserLink';
import validatePropItem from '~/lib/validateProp/item';

// props
export let item;

$: validatePropItem(item);
</script>


