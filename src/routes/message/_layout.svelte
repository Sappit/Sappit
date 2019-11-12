<div>
  <h3>Messages</h3>

  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a href="/message/inbox" class="nav-link" class:active={segment==='inbox'}>
        all
      </a>
    </li>
    <li class="nav-item">
      <a href="/message/unread" class="nav-link" class:active={segment==='unread'}>
        unread
      </a>
    </li>
    <li class="nav-item">
      <a href="/message/sent" class="nav-link" class:active={segment==='sent'}>
        sent
      </a>
    </li>
  </ul>
  <hr>
  <slot/>
</div>

<script>
import middlewareAuth from '~/lib/middleware/auth';

export let segment;

middlewareAuth()
</script>


