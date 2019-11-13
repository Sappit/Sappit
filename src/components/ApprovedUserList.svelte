<div class="approved-users-list">
  {#each users as user (user.name)}
    <ApprovedUserEntry {user} />
  {/each}
</div>

<script>
import ApprovedUserEntry from '~/components/ApprovedUserEntry';
import validatePropArray from '~/lib/validateProp/array';

// props
export let users;

$: validatePropArray(users);
</script>


