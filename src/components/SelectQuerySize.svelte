<select
  class="form-control r-select"
  name="size"
  {value}
  on:change={(event) => $size = event.target.value}
>
  {#each sizeOptions as value (value)}
    <option {value}>{value}</option>
  {/each}
</select>

<script>
import queryStore from '~/store/query';
import validatePropNumber from '~/lib/validateProp/number';
import getLimitOptions from '~/lib/getLimitOptions';

const { size } = queryStore;

export let max = 100;
let defaultValue = 25;

$: validatePropNumber(max);
$: sizeOptions = getLimitOptions(max);
$: value = $size ? parseInt($size) : defaultValue;

</script>
