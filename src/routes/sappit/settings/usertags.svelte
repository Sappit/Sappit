<div class="container">
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label>Username</label>
        <input class="form-control" name="add_username" bind:value={add_username}/>
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <label>Tag</label>
        <input class="form-control" name="add_tag" bind:value={add_tag}/>
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <button class="btn btn-success" name="save_tag" on:click|preventDefault|stopPropagation={save}>
          <i class="fa fa-fw fa-plus"/>
          Save Tag
        </button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <table class="table-sm">
        <thead>
          <tr>
            <th>Username</th>
            <td>Tag</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {#each items as tag, username (username)}
            <tr>
              <td><UserLink {username} /></td>
              <td>{ tag }</td>
              <td>
                <button
                 class="btn btn-xs btn-danger"
                 on:click|preventDefault|stopPropagation={del(username)}
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
import UserLink from '~/components/UserLink';
import usertags from '~/lib/usertags';
import { onMount } from 'svelte';
import middlewareAuth from '~/lib/middleware/auth';
import validatePropObject from '~/lib/validateProp/object';
import validatePropString from '~/lib/validateProp/string';

let items = {};
let add_username = '';
let add_tag = '';

$: validatePropObject(items);
$: validatePropString(add_username);
$: validatePropString(add_tag);

middlewareAuth()
onMount(() => {
  fetchItems();
})

async function save($event) {
  await usertags.set(add_username, add_tag);
  items[add_username] = add_tag;
  add_username = '';
  add_tag = '';
  items = items;
}
async function del(key) {
  const r = await usertags.del(key);
  delete items[key];
  items = items;
}
async function fetchItems() {
  const keys = await usertags.keys();
  const data = {};
  for (let i = 0; i < keys.length; i++) {
    const item = await usertags.get(keys[i]);
    if (item && item.length) {
      data[keys[i]] = item;
    }
  }
  items = data;
}
</script>
