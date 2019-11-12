<span on:click|preventDefault|stopPropagation={prompt}>
  {#if userIsBot}
    <BotBadge />
  {:else if tag === true}
    <span class="badge badge-secondary">
      <small>
        <i class="fa fa-fw fa-spinner fa-spin"/>
        loading tags
      </small>
    </span>
  {:else if tag}
    <span class="badge badge-danger">
      <small>
        <i class="fa fa-fw fa-tag"/>
        { tag }
      </small>
    </span>
  {:else if masstaggerSubs}
    <a href="https://masstagger.com/user/{username_uc}">
      <span class="badge badge-danger badge-mt">{masstaggerSubs}</span>
    </a>
  {:else if showNone}
    <span class="badge badge-secondary no-flair">(no tags)</span>
  {/if}

  {#if false}
  <b-modal
    v-model="showingUsertagModal"
    title="Usertag User"
    size="md"
    no-close-on-backdrop
    scrollable
    lazy
    on:click|preventDefault|stopPropagation
  >
    <a href="/sappit/settings/usertags">
      Usertags Page
    </a>
    <div class="form-group">
      <label>who to Usertag:</label>
      <input
        class="form-control"
        bind:value={add_username}
        {...disabled(true)}
      />
    </div>
    <div class="form-group">
      <label>Tag:</label>
      <input
        class="form-control"
        bind:value={add_tag}
      />
    </div>
    <a rel="nofollow" target="_blank" href="https://masstagger.com/user/{username_uc}">
      See <tt>{username}</tt> on masstagger
    </a>
    {#if masstaggerSubs}
      <br />
      <div class="alert alert-danger">{masstaggerSubs}</div>
    {/if}
    <div class="w-100" v-slot="modal-footer">
      <div class="btn-group float-right">
        <button
          class="btn btn-sm btn-primary"
          on:click|preventDefault|stopPropagation={() => showingUsertagModal=false}
        >
          DONE
        </button>
      </div>
    </div>
  </b-modal>
  {/if}
</span>

<script>
import BotBadge from '~/components/BotBadge';
import TimeAgo from '~/components/TimeAgo';
import usertags from '~/lib/usertags';
import { isBot } from '~/lib/bots';
import disabled from '~/lib/disabled';
import validatePropItem from '~/lib/validateProp/item';
import validatePropBoolean from '~/lib/validateProp/boolean';
import validatePropString from '~/lib/validateProp/string';
import validatePropStringIn from '~/lib/validateProp/stringIn';
// import { mtFind } from '~/store/masstagger'

// props
export let item;
export let type;
export let name = null;
export let showNone = false;
let mtLoading = true;
let showingUsertagModal = true;
let tag = '';
let add_username = '';
let add_tag = '';

$: validatePropItem(item);
$: name===null || validatePropString(name);
$: validatePropBoolean(showNone);
$: validatePropBoolean(mtLoading);
$: validatePropBoolean(showingUsertagModal);
$: validatePropString(tag);
$: validatePropString(add_username);
$: validatePropString(add_tag);
$: validatePropStringIn(type, ['link', 'user', 'author']);
$: username = name || item.author || ''
$: username_uc = username.toUpperCase()
$: userIsBot = isBot(username)
$: masstaggerSubs = ''
// $: masstaggerSubs = mtFind ? mtFind(username) : ''
    // function masstaggerSubs() {
    //   const value = this.$store.getters['masstagger/find'](this.username);
    //   if (value !== true) return value;
    //   return '';
    // }

$: onUpdateUsername(username)

async function onUpdateUsername(newValue) {
    tag = true;
    tag = (await usertags.get(newValue).catch(get_blank_str)) || '';
}

async function prompt($event) {
  if (showingUsertagModal) return;
  showingUsertagModal = true;
  add_username = username;
  add_tag = '';
}

function get_blank_str() {
  return '';
}
</script>
