<div class="moderator-users-list">
  {#each users as user (user.name)}
    <ModeratorUserEntry {user}/>
  {/each}
</div>

<script>
import ModeratorUserEntry from '~/components/ModeratorUserEntry';
import validatePropArray from '~/lib/validateProp/array';

// props
export let users;

$: validatePropArray(users);
</script>


