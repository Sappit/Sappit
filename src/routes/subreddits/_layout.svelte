<h3>Subreddits</h3>
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a href="/subreddits" class="nav-link" class:active={!segment}>
      all
    </a>
  </li>
  <li class="nav-item">
    <a href="/subreddits/search" class="nav-link" class:active={segment==='search'}>
      search
    </a>
  </li>
  <li class="nav-item">
    <a href="/subreddits/mine" class="nav-link" class:active={segment==='mine'}>
      mine
    </a>
  </li>
  <li class="nav-item">
    <a href="/subreddits/new" class="nav-link" class:active={segment==='new'}>
      new
    </a>
  </li>
</ul>
<hr>
<slot />

<script>
import middlewareAuth from '~/lib/middleware/auth';

export let segment;

middlewareAuth()
</script>
