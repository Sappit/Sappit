<div class="wikicontributor-user-entry">
  <div class="card">
    <div class="card-header text-muted">
      <UserLink username={user.name} />
      <UsertagBadge name={user.name}/>
      <TimeAgo value={user.date} />
      {user.note}
    </div>
    <div class="card-footer text-muted bg-light">
      <a rel="nofollow" target="_blank" href="https://www.reddit.com/user/{user.name}">
        <i class="fa fa-fw fa-btn fa-reddit"/>
        see on reddit
      </a>

      <a rel="nofollow" target="_blank" href="/user/{user.name}">
        <i class="fa fa-fw fa-btn fa-link-ext"/>
        permalink
      </a>

      <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
        <i class="fa fa-fw fa-btn fa-code"/>
        see source
      </span>
    </div>
    {#if $show.source}
      <ShowSource value={user}/>
    {/if}
  </div>
</div>

<script>
import get from 'lodash/get';
import UsertagBadge from '~/components/UsertagBadge';
import TimeAgo from '~/components/TimeAgo';
import UserLink from '~/components/UserLink';
import ShowSource from '~/components/ShowSource';
import validatePropWikicontributor from '~/lib/validateProp/wikicontributor';
import { oneOpen } from '~/lib/open';

// props
export let user;
let show = oneOpen();

$: validatePropWikicontributor(user);

    // date: 1550940279
    // id: "t2_ABCDE"
    // name: "le_username"
    // note: "other: mooooooooood note"

</script>
