<select
  class="form-control r-select select-limit"
  class:disabled={disabled}
  {disabled}
  name="limit"
  value={limitVaue}
  on:change={(event) => $limit = event.target.value}
>
  {#each limitOptions as value (value)}
    <option {value}>{value}</option>
  {/each}
</select>

<script>
import queryStore from '~/store/query';
import validatePropNumber from '~/lib/validateProp/number';
import getLimitOptions from '~/lib/getLimitOptions';

const { limit } = queryStore;

export let disabled = false;
export let max = 100;
let defaultValue = 25;

$: validatePropNumber(max);
$: limitOptions = getLimitOptions(max);
$: limitVaue = $limit ? parseInt($limit) : defaultValue;
</script>
