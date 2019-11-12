<div class="wikicontributor-users-list">
  {#each users.data.children as user (user.name)}
    <WikiContributorUserEntry {user} />
  {/each}
</div>

<script>
import WikiContributorUserEntry from '~/components/WikiContributorUserEntry';
import validatePropUsers from '~/lib/validateProp/users';

// props
export let users;

$: validatePropUsers(users);
</script>


