<select
  class="form-control r-select"
  name="is_video"
  {value}
  on:change={(event) => $is_video = event.target.value}
>
  {#each selectOptions as {value, text} (value)}
    <option {value}>{text}</option>
  {/each}
</select>

<script>
import queryStore from '~/store/query';
const { is_video } = queryStore;
const selectOptions = Object.freeze([
  { value: null, text: 'Video+Non-Video Posts' },
  { value: '1', text: 'Video Posts Only' },
  { value: '0', text: 'Non-Video Posts Only' },
]);
let defaultValue = selectOptions[0].value;
$: value = $is_video ? parseInt($is_video) : defaultValue;
</script>
