<div class="approved-users-list">
  {#each users.data.children as user (user.name)}
    <ApprovedUserEntry {user} />
  {/each}
</div>

<script>
import ApprovedUserEntry from '~/components/ApprovedUserEntry';
import validatePropUsers from '~/lib/validateProp/users';

// props
export let users;

$: validatePropUsers(users);
</script>


