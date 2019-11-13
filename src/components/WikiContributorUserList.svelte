<div class="wikicontributor-users-list">
  {#each users as user (user.name)}
    <WikiContributorUserEntry {user} />
  {/each}
</div>

<script>
import WikiContributorUserEntry from '~/components/WikiContributorUserEntry';
import validatePropArray from '~/lib/validateProp/array';

// props
export let users;

$: validatePropArray(users);
</script>


