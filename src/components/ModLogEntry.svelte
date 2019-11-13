<div class="log-entry">
  <div class="card">
    <div class="card-header text-muted">
      <UserLink username={log.mod}/>
      <TimeAgo value={log.created_utc}/>
      <span>{log.note}</span>
    </div>
    <div class="card-body">
      <div>
        { log.action }
        {#if log.target_author}
          <UserLink username={log.target_author}/>
        {/if}
        {#if log.target_permalink}
          <a href={log.target_permalink}>
            {log.target_title || log.target_permalink}
          </a>
        {:else}
          {log.target_title}
        {/if}
        {#if log.details}
          <span class="badge badge-secondary">details: { log.details }</span>
        {/if}
      </div>
    </div>
    {#if log.description}
      <div class="card-body">
        <span class="badge badge-secondary">description:</span>
        <div>{log.description}</div>
      </div>
    {/if}
    {#if log.target_body}
      <div class="card-body">
        <span class="badge badge-secondary">description:</span>
        <div>{log.target_body}</div>
      </div>
    {/if}
    <div class="card-footer text-muted bg-light">
      <a rel="nofollow" target="_blank" href="https://www.reddit.com/user/{log.target_permalink}">
        <i class="fa fa-fw fa-btn fa-reddit"/>
        see on reddit
      </a>

      <a href="/user/{log.target_permalink}">
        <i class="fa fa-fw fa-btn fa-link-ext"/>
        permalink
      </a>

      <span class="btn-see-source" on:click|preventDefault|stopPropagation={$show.toggleSource}>
        <i class="fa fa-fw fa-btn fa-code"/>
        see source
      </span>
    </div>
    {#if $show.source}
      <ShowSource value={log}/>
    {/if}
  </div>
</div>

<script>
import get from 'lodash/get';
import TimeAgo from '~/components/TimeAgo';
import UserLink from '~/components/UserLink';
import ShowSource from '~/components/ShowSource';
import validatePropModaction from '~/lib/validateProp/modaction';
import { oneOpen } from '~/lib/open';

// props
export let log;
let show = oneOpen();

$: validatePropModaction(log);

// kind: 'modaction'
// data: {
//   action: "banuser"
//   created_utc: 1550940279
//   description: "other: mooooooooood note"
//   details: "9 days"
//   id: "ModAction_4fa6943c-378a-11e9-b100-0e78bd91ac66"
//   mod: "le_mod_user"
//   mod_id36: "wjh1g"
//   sr_id36: "ro83j"
//   subreddit: "Sappit"
//   subreddit_name_prefixed: "r/Sappit"
//   target_author: "le_banned_user"
//   target_body: null
//   target_fullname: "t2_mu233"
//   target_permalink: null
//   target_title: null
</script>
