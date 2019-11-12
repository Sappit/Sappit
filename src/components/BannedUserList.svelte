{#each users.data.children as user (user.name)}
  <BannedUserEntry {user}/>
{/each}

<script>
import BannedUserEntry from '~/components/BannedUserEntry';
import validatePropUsers from '~/lib/validateProp/users';

// props
export let users;

$: validatePropUsers(users);

</script>


