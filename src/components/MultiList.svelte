<div class="multis-list">
  {#each multis as multi (multi.name)}
    <MultiEntry {multi}/>
  {/each}
</div>

<script>
import MultiEntry from '~/components/MultiEntry';
import validatePropMultis from '~/lib/validateProp/multis';


// props
export let multis;

$: validatePropMultis(multis);
</script>


