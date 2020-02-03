<div class="container">
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label>Subreddit</label>
        <input class="form-control" name="add_subreddit" bind:value={add_subreddit}/>
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <label>Config</label>
        <input class="form-control" name="add_config" bind:value={add_config}/>
        {#if invalid_add_config_message}
          <ErrorAlert value={invalid_add_config_message} />
        {/if}
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <button class="btn btn-success" name="save_config" on:click|preventDefault|stopPropagation={save}>
          <i class="fa fa-fw fa-plus"/>
          Save Config
        </button>
      </div>
    </div>
  </div>
  {#if error}
    <ErrorAlert value={error} />
  {/if}
  <div class="row">
    <div class="col">
      <table class="table-sm">
        <thead>
          <tr>
            <th>Subreddit</th>
            <td>Config</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {#each items as {config, subreddit}}
            <tr>
              <td><SubredditLink {subreddit} /></td>
              <td><pre><tt>{ JSON.stringify(config, null, 2) }</tt></pre></td>
              <td>
                <button
                 class="btn btn-xs btn-danger"
                 on:click|preventDefault|stopPropagation={() => del(subreddit)}
                >
                  <i class="fa fa-fw fa-cancel"/>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<script>
import debounce from 'lodash/debounce';
import ErrorAlert from '~/components/ErrorAlert';
import SubredditLink from '~/components/SubredditLink';
import subsettings from '~/lib/subsettings';
import { onMount } from 'svelte';
import middlewareAuth from '~/lib/middleware/auth';
import validatePropArray from '~/lib/validateProp/array';
import validatePropString from '~/lib/validateProp/string';

let items = [];
let add_subreddit = '';
let add_config = '';
let error = null;
let invalid_add_config_message = null;

$: validatePropArray(items);
$: validatePropString(add_subreddit);
$: validatePropString(add_config);
$: invalid_add_config_message = validateAddConfig(add_config);

middlewareAuth()
onMount(() => {
  fetchItems();
})

async function save($event) {
  console.log('save', add_subreddit, add_config);
  error = null
  try {
    await subsettings.set(add_subreddit, add_config);
    add_subreddit = '';
    add_config = '';
    fetchItems()
  } catch (err) {
    error = err;
  }
}
async function del(key) {
  console.log('del.key', key);
  error = null
  try {
    const r = await subsettings.del(key);
    //delete items[key];
    items = items.filter(entry => entry.subreddit !== key);
  } catch (err) {
    error = err;
  }
}
async function fetchItems() {
  error = null
  try {
    const keys = await subsettings.keys();
    const data = [];
    for (let i = 0; i < keys.length; i++) {
      const item = await subsettings.get(keys[i]);
      if (item && item.length) {
        //data[keys[i]] = item;
        data.push({ subreddit: keys[i], config: item });
      }
    }
    items = data;
    console.log({ items });
  } catch (err) {
    error = err;
  }
}

const validateAddConfig = debounce((value) => {
  if (value === "" || value === "") {
    return null;
  }
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed !== 'object') {
      return "not object";
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    error = err;
    return "error";
  }
  return null;
}, 500);
</script>
