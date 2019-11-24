<div class="navbar navbar-dark navbar-expand-md">
  <button
    type="button"
    aria-label="Toggle navigation"
    aria-controls="nav-collapse"
    aria-expanded={expandHamburger ? 'true' : 'false'}
    class="navbar-toggler"
    on:click|preventDefault|stopPropagation={() => expandHamburger^=true}
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <a class="navbar-brand" href="/">
    <img src="/favicon-32x32.png" alt="Sappit">
    Sappit
  </a>
  <div id="nav_collapse" class="navbar-collapse collapse" class:show={expandHamburger}>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="/home">
          Home
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/subreddits">
          Subreddits
        </a>
      </li>
      {#if $MeData.name}
      <li class="nav-item">
        <a class="nav-link" href="/multis/mine">
          MultiSubs
        </a>
      </li>
      {/if}
    </ul>

    <!-- Right aligned nav items-->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
          <a class="nav-link" href="/search">
            <i class="fa fa-search fa-btn"/>
            Search
          </a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="/pushshift/search">
            Pushshift
          </a>
      </li>
      {#if $MeData.name}
      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"
            aria-haspopup="true"
            aria-expanded={expandNavbarProfileDropdown ? 'true' : 'false'}
            href="/user/{$MeData.name}"
            id="navbar_profile_dropdown"
            on:click|preventDefault|stopPropagation={() => expandNavbarProfileDropdown^=true}
          >
            <em>{ $MeData.name }</em>
          </a>
          <ul tabindex="-1"
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbar_profile_dropdown"
            class:show={expandNavbarProfileDropdown}
           >
            <li>
              <a href="/user/{$MeData.name}" class="dropdown-item" role="menuitem">Profile</a>
            </li>
            <li><hr role="separator" aria-orientation="horizontal" class="dropdown-divider"></li>
            <li>
              <a href="/sappit/settings" class="dropdown-item" role="menuitem">Settings</a>
            </li>
            <li on:click|preventDefault|stopPropagation={() => $censorUsernames^=true}>
              <a href="/sappit/settings" class="dropdown-item" role="menuitem">
                <i
                  class="fa fa-btn"
                  class:fa-check={$censorUsernames}
                  class:fa-check-empty={!$censorUsernames}
                />
                Censor Usernames
              </a>
            </li>
            <li><hr role="separator" aria-orientation="horizontal" class="dropdown-divider"></li>
            <li>
              <a href="/sappit/history" class="dropdown-item" role="menuitem">
                History
                {#if $historyCount}
                  <span class="badge badge-secondary">{$historyCount}</span>
                {/if}
              </a>
            </li>
            <li>
              <a href="/sappit/apilog" class="dropdown-item" role="menuitem">
                API Log
                {#if $apilogErrorCount}
                  <span class="badge badge-danger">{$apilogErrorCount}</span>
                {/if}
              </a>
            </li>
            <li><hr role="separator" aria-orientation="horizontal" class="dropdown-divider"></li>
            <li>
              <a href="/logout" class="dropdown-item" role="menuitem">
                Signout
              </a>
            </li>
          </ul>
        </li>
      {:else}
        <li class="nav-item">
          <a class="nav-link" href="/login">
            Signin
          </a>
        </li>
      {/if}
    </ul>
  </div>

  <ul class="navbar-nav">
    <li class="nav-item">
      {#if $MeData.name}
        <a class="nav-link" href="/message/inbox" title="Mail">
          {#if $MeData.has_mail}
            <span class="badge badge-danger text-secondary">
              <i class="fa fa-btn fa-mail"/>
              { $MeData.inbox_count }
            </span>
          {:else}
            <i class="fa fa-btn fa-mail"/>
          {/if}
        </a>
        {#if $MeData.has_mod_mail}
          <a class="nav-link" rel="nofollow" target="_blank" href="https://mod.reddit.com/" title="Mail">
            <span class="badge badge-success text-secondary">
              <i class="fa fa-btn fa-shield"/>
            </span>
          </a>
        {/if}
      {/if}
    </li>
  </ul>
</div>

<script>
import get from 'lodash/get';
import { MeData } from '~/store/auth';
import { censorUsernames } from '~/store/settings';
import { historyCount } from '~/store/history';
import { apilogErrorCount } from '~/store/apilog';
import { stores } from '@sapper/app'
const { page } = stores();

let expandNavbarProfileDropdown = false
let expandHamburger = false
$: isSearchPage = searchRegEx.test($page.name);

// $: console.log('expandNavbarProfileDropdown', expandNavbarProfileDropdown);
// $: console.log('expandHamburger', expandHamburger);

const searchRegEx = /\bsearch\b/;
</script>
