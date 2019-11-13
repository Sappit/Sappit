<div class="wikibanned-users-list">
  {#each users as user (user.name)}
    <WikiBannedUserEntry {user} />
  {/each}
</div>

<script>
import WikiBannedUserEntry from '~/components/WikiBannedUserEntry';
import validatePropArray from '~/lib/validateProp/array';


// props
export let users;

$: validatePropArray(users);
</script>


