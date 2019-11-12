<div>
  <select
    class="form-control r-select"
    name="kind"
    {value}
    on:change={(event) => $kind = event.target.value}
  >
    {#each kindOptions as {value, text} (value)}
      <option {value}>{text}</option>
    {/each}
  </select>
</div>

<script>
import { Kind } from '~/lib/enum';
import queryStore from '~/store/query';

const { kind } = queryStore;

const kindOptions = Object.freeze([
  { value: Kind.Comment, text: 'Comment' },
  { value: Kind.Post, text: 'Submission' },
  // { value: Kind.Subreddit, text: 'Subreddit' },
])

let defaultValue = Kind.Comment;

$: value = $kind ? $kind : defaultValue;
</script>
