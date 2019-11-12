<div class="btn-group">
  <a class="btn btn-primary"
    disabled={!(offset > 0)}
    class:disabled={!(offset > 0)}
    href={href($page, { query: { offset: Math.max(0, (offset) - perPage) } })}
  >Prev Page</a>
  <a class="btn btn-primary"
    disabled={items.length !== perPage}
    class:disabled={items.length !== perPage}
    href={href($page, { query: { offset: offset + perPage } })}
  >Next Page</a>
</div>

<script>
import href from '~/lib/href';
import queryStore from '~/store/query';
import { stores } from '@sapper/app';

const { page } = stores();
const { offset: storedOffset } = queryStore;

export let items

$: offset = parseInt($storedOffset) || 0;
/* must be int 1 through 20 inclusion */
$: perPage = Math.max(1, Math.min(20, parseInt($page.query.limit) || 20));

// $: console.log(items)
</script>
