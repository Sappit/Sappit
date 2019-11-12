<div class="muted-users-list">
  {#each users.data.children as user (user.name)}
    <muteduserentry {user}/>
  {/each}
</div>

<script>
import MutedUserEntry from '~/components/MutedUserEntry';
import validatePropUsers from '~/lib/validateProp/users';

// props
export let users;

$: validatePropUsers(users);
</script>


