<select
  class="form-control r-select"
  name="is_self"
  {value}
  on:change={(event) => $is_self = event.target.value}
>
  {#each selectOptions as {value, text} (value)}
    <option {value}>{text}</option>
  {/each}
</select>

<script>
import queryStore from '~/store/query';

const { is_self } = queryStore;

const selectOptions = Object.freeze([
  { value: null, text: 'Link+Self Posts' },
  { value: '1', text: 'Self Posts Only' },
  { value: '0', text: 'Link Posts Only' },
]);

let defaultValue = selectOptions[0].value;

$: value = $is_self ? parseInt($is_self) : defaultValue;
</script>
