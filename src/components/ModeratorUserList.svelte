<div class="moderator-users-list">
  {#each users.data.children as user (user.name)}
    <ModeratorUserEntry {user}/>
  {/each}
</div>

<script>
import ModeratorUserEntry from '~/components/ModeratorUserEntry';
import validatePropUsers from '~/lib/validateProp/users';

// props
export let users;

$: validatePropUsers(users);
</script>


