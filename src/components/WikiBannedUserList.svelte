<div class="wikibanned-users-list">
  {#each users.data.children as user (user.name)}
    <WikiBannedUserEntry {user} />
  {/each}
</div>

<script>
import WikiBannedUserEntry from '~/components/WikiBannedUserEntry';
import validatePropUsers from '~/lib/validateProp/users';


// props
export let users;

$: validatePropUsers(users);
</script>


