{#await promise}
  <Loading/>
{:then multi}
  <h3>/m/{multi.display_name}</h3>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a href="/me/m/{$page.params.multi}" class="nav-link" class:active={!segment}>
        <i class="fa fa-fw fa-btn fa-list"/>
        Posts
      </a>
    </li>
    <li class="nav-item">
      <a href="/me/m/{$page.params.multi}/comments" class="nav-link" class:active={segment==='comments'}>
        <i class="fa fa-fw fa-btn fa-list"/>
        Comments
      </a>
    </li>
    <li class="nav-item">
      <a href="/pushshift/search/?kind=comment&subreddit={multi.subreddits.map(s=>s.name).join(',')}" class="nav-link" class:active={segment==='pushshift'}>
        <i class="fa fa-fw fa-btn fa-list"/>
        Pushshift
      </a>
    </li>
  </ul>
  <slot {multi}/>
{:catch error}
  <ErrorAlert value={error} />
{/await}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import Loading from '~/components/Loading';
import find from 'lodash/find';
import fetchMulti from '~/lib/api/reddit/fetchMulti';
import RedditPagination from '~/components/RedditPagination';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app'
import { multi } from '~/store/params';
const { page } = stores();

export let segment

middlewareAuth()

let promise

$: multiname = $page.params.multi;
$: if (multiname) promise = fetchMulti(multiname);
$: promise && promise.then(newMultiValue => {
    $multi = newMultiValue
  })


</script>
