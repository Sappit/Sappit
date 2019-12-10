<div class="row">
  <div class="col">
    <input
      class="form-control"
      name="multipath"
      bind:value={multipath}
      placeholder="multipath"
    />
  </div>
  <div class="col">
    <button
      disabled={!multipath || saving}
      class:disabled={!multipath || saving}
      class="btn btn-primary"
      on:click|preventDefault|stopPropagation={save}
    >
      <i class="fa fa-save fa-fw" />
      Save
    </button>
  </div>
</div>
{#if error}
  <div class="row">
    <div class="col">
      <ErrorAlert value={error}/>
    </div>
  </div>
{/if}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import reddit from '~/lib/reddit';
import middlewareAuth from '~/lib/middleware/auth';
import { username } from '~/store/auth';

let saving = false
let multipath = ''
let error = null
let saved = null

async function save () {
  try {
    error = null
    saving = true

    const response = await reddit.put(`/api/multi/${multipath}`, {
      /*
      model: {
        "description_md": raw markdown text,
        "display_name": a string no longer than 50 characters,
        "icon_img": one of (`png`, `jpg`, `jpeg`),
        "key_color": a 6-digit rgb hex color, e.g. `#AABBCC`,
        "subreddits": [
          {
            "name": subreddit name,
          },
          ...
        ],
        "visibility": one of (`private`, `public`, `hidden`),
      },//*/
//      model: JSON.stringify({
        display_name: multipath,
        visibility: 'private',
        multipath,
//      }),
//      multipath,
        // what the website actually does
        // model:{"path":"/user/${username}/m/${multipath}","visibility":"private","subreddits":[]}
        model: JSON.stringify({
          path: `/user/${$username}/m/${multipath}`,
          visibility: 'private',
          subreddits: [],
        }),
    })
    
    multipath = ''
  } catch (err) {
    console.error(err)
    error = err
  } finally {
    saving = false
  }
}

middlewareAuth()
</script>
