<div class="banned-user-entry">
  <div class="card">
    <div class="card-header text-muted">
      <UserLink username={user.name} />
      <UsertagBadge name={user.name}/>
      <TimeAgo value="user.date" />
      {user.note}
    </div>
    <div class="card-footer text-muted bg-light">
      <a rel="nofollow" target="_blank" href="https://www.reddit.com/user/{user.name}">
        <i class="fa fa-fw fa-btn fa-reddit"/>
        <span>see on reddit</span>
      </a>

      <a href="/user/{user.name}">
        <i class="fa fa-fw fa-btn fa-link-ext"/>
        <span>permalink</span>
      </a>

      <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
        <i class="fa fa-fw fa-btn fa-code"/>
        <span>see source</span>
      </span>
    </div>
    {#if $show.source}
      <ShowSource value={user} />
    {/if}
  </div>
</div>

<script>
import UsertagBadge from '~/components/UsertagBadge';
import TimeAgo from '~/components/TimeAgo';
import UserLink from '~/components/UserLink';
import ShowSource from '~/components/ShowSource';
import validatePropUser from '~/lib/validateProp/user';
import { oneOpen } from '~/lib/open';

// props
export let user;
let show = oneOpen();

$: validatePropUser(user);
</script>
