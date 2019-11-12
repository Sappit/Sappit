<div>
  <h3>Settings</h3>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a href="/sappit/settings" class="nav-link" class:active={!segment}>
        general
      </a>
    </li>
    <li class="nav-item">
      <a href="/sappit/settings/accounts" class="nav-link" class:active={segment==='accounts'}>
        accounts
      </a>
    </li>
    <li class="nav-item">
      <a href="/sappit/settings/masstagger" class="nav-link" class:active={segment==='masstagger'}>
        masstagger
      </a>
    </li>
    <li class="nav-item">
      <a href="/sappit/settings/usertags" class="nav-link" class:active={segment==='usertags'}>
        tags
      </a>
    </li>
    <li class="nav-item">
      <a href="/sappit/settings/tumblr" class="nav-link" class:active={segment==='tumblr'}>
        tumblr
      </a>
    </li>
  </ul>
  <hr>
  <slot/>
</div>

<script>
import middlewareAuth from '~/lib/middleware/auth';

export let segment

middlewareAuth()
</script>
