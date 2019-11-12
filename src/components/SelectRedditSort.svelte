<select
  {disabled}
  class:disabled={disabled}
  class="form-control r-select select-sort"
  name="sort"
  {value}
  on:change={(event) => $sort = event.target.value}
>
  {#each selectOptions as {value, text} (value)}
    <option {value}>{text}</option>
  {/each}
</select>

<script>
import queryStore from '~/store/query';
const { sort } = queryStore

export let disabled = false;

const selectOptions = Object.freeze([
  { value: 'hot', text: 'Hot' },
  { value: 'new', text: 'New' },
  { value: 'rising', text: 'Rising' },
  { value: 'controversial', text: 'Controversial' },
  { value: 'top', text: 'Top' },
  { value: 'best', text: 'Best' },
  // { value: 'gilded', text: 'Gilded' },
]);

let defaultValue = 'hot';

$: value = $sort ? $sort : defaultValue;
</script>
