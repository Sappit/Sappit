<div class="muted-users-list">
  {#each users as user (user.name)}
    <MutedUserEntry {user}/>
  {/each}
</div>

<script>
import MutedUserEntry from '~/components/MutedUserEntry';
import validatePropArray from '~/lib/validateProp/array';

// props
export let users;

$: validatePropArray(users);
</script>


