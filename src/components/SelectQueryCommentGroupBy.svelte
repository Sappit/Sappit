<select
  class="form-control r-select"
  name="comment_group_by"
  {value}
  on:change={(event) => $comment_group_by = event.target.value}
>
  {#each selectOptions as {value, text} (value)}
    <option {value}>{text}</option>
  {/each}
</select>

<script>
import queryStore from '~/store/query';
const { comment_group_by } = queryStore

const selectOptions = Object.freeze([
  { value: null, text: 'None' },
  { value: 'link_id', text: 'Link ID' },
])

let defaultValue = selectOptions[0].value;

$: value = $comment_group_by ? parseInt($comment_group_by) : defaultValue;
</script>
