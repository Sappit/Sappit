<div class="container">
  <div class="pull-right btn-group">
    <a
      href={getOAuthLoginHref()}
      class="btn btn-success"
      rel="nofollow"
      on:click|preventDefault|stopPropagation={addNewAccount}
    >
      <i class="fa fa-fw fa-plus"/>
      Add
    </a>
    <button
      class="btn btn-primary"
      rel="nofollow"
      on:click|preventDefault|stopPropagation={refetchAll}
    >
      <i class="fa fa-fw fa-arrows-cw"/>
      All
    </button>
  </div>
  <br>
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th>username</th>
        <th>inbox_count</th>
        <th>karma</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each accountsList as { MeData: md, username, isCurrent } (username)}
        <tr class:bg-danger={md.is_suspended}>
          <td>
            {#if isCurrent}
              <i class="fa fa-fw fa-star"/>
              <i
                class="fa fa-fw fa-logout"
                on:click|preventDefault|stopPropagation={() => current.set(null)}
              />
            {:else}
              <i
                class="fa fa-fw fa-login"
                on:click|preventDefault|stopPropagation={() => current.set(username)}
              />
              <i
                class="fa fa-fw fa-cancel"
                on:click|preventDefault|stopPropagation={() => logout(username)}
              />
            {/if}
          </td>
          <td>
            <img
              src={md.icon_img}
              class="img-fluid"
              alt="user account profile image"
            />
          </td>
          <td>
            <a href="/user/{username}">{username}</a>
            <br>
            <small>verified: { md.verified }</small>
          </td>
          <td class="text-right">
            { md.inbox_count }
            {#if md.has_mod_mail}
              <br>
              <small>has_mod_mail: { md.has_mod_mail }</small>
            {/if}
          </td>
          <td class="text-right">
            <small>
              Link: { md.link_karma }
              <br>
              Comment: { md.comment_karma }
            </small>
          </td>
          <td>
            <small>fetchedAt: </small>
            <TimeAgo value={md.fetchedAt} />
            <br>
            <small>createdAt: </small>
            <TimeAgo value={md.created_utc} />
          </td>
          <td>
            <button
              class="btn btn-primary btn-sm"
              class:disabled={(fetching[username])}
              disabled={(fetching[username])}
              on:click|preventDefault|stopPropagation={() => refetchMe(username)}
            >
              <i class="fa fa-fw fa-arrows-cw"/>
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<script>
import TimeAgo from '~/components/TimeAgo';
import { getOAuthLoginHref } from '~/lib/reddit';
import reddit from '~/lib/reddit';
import { accounts, username, fetchMe, current, logout } from '~/store/auth'
import middlewareAuth from '~/lib/middleware/auth';
import validatePropObject from '~/lib/validateProp/object';

let fetching = {};

$: validatePropObject(fetching);

middlewareAuth()

// $: console.log($accounts);
$: accountsList = $accounts
  ? Object.keys($accounts).map(username => ({
      isCurrent: $username === username,
      username,
      ...$accounts[username]
    }))
  : [];

async function refetchAll() {
  for (let username in $accounts) {
    await refetchMe(username);
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}

async function refetchMe(username) {
  try {
    fetching[username] = true;
    fetching = fetching;
    await fetchMe(username);
  } finally {
    fetching[username] = false;
    fetching = fetching;
  }
}
async function addNewAccount() {
  await current.set(null);
  window.location = getOAuthLoginHref();
}
</script>
