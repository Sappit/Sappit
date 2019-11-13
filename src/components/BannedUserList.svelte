{#each users as user (user.name)}
  <BannedUserEntry {user}/>
{/each}

<script>
import BannedUserEntry from '~/components/BannedUserEntry';
import validatePropArray from '~/lib/validateProp/array';

// props
export let users;

$: validatePropArray(users);

</script>


