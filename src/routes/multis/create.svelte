<div class="row">
  <div class="col">
    <input
      class="form-control"
      name="name"
      bind:value={name}
      placeholder="name"
    />
  </div>
  <div class="col">
    <button
      disabled={!name || saving}
      class:disabled={!name || saving}
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

let saving = false
let name = ''
let error = null
let saved = null

async function save () {
  try {
    error = null
    saving = true

    const response = await reddit.put(`/api/multi/${name}`, {
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
      mode: JSON.stringify({
        display_name: name,
        visibility: 'private',
      }),
      multipath: name
    })
    
    name = ''
  } catch (err) {
    console.error(err)
    error = err
  } finally {
    saving = false
  }
}

middlewareAuth()
</script>
