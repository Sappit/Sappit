<select
  class="form-control r-select"
  name="post_group_by"
  {value}
  on:change={(event) => $post_group_by = event.target.value}
>
  {#each selectOptions as {value, text} (value)}
    <option {value}>{text}</option>
  {/each}
</select>

<script>
import queryStore from '~/store/query';

const { post_group_by } = queryStore;

const selectOptions = Object.freeze([
  { value: null, text: 'None' },
  { value: 'link_url', text: 'Link URL' },
]);

let defaultValue = selectOptions[0].value;

$: value = $post_group_by ? parseInt($post_group_by) : defaultValue;
</script>
