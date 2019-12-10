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
{#if createdMulti}
  <ShowSource value={createdMulti} />
{/if}

<script>
import ErrorAlert from '~/components/ErrorAlert';
import ShowSource from '~/components/ShowSource';
import reddit from '~/lib/reddit';
import undata from '~/lib/undata';
import middlewareAuth from '~/lib/middleware/auth';
import { username } from '~/store/auth';

let saving = false
let multipath = ''
let error = null
let createdMulti = null
/*

kind	LabeledMulti
can_edit	true
display_name	fgdgdfgdf
name	fgdgdfgdf
description_html	
num_subscribers	0
copied_from	null
icon_url	https://www.redditstatic.com/custom_feeds/custom_feed_default_1.png
subreddits	[]
created_utc	1576012141
visibility	private
created	1576040941
over_18	false
path	/user/${username_lc}/m/${multipath}/
owner	Username
key_color	null
is_subscriber	false
owner_id	t2_00000000
description_md	
is_favorited	false
 */

// docs are VERY ???? on this one
async function save () {
  try {
    error = null
    saving = true

    const path = `/user/${$username}/m/${multipath}`;

    const response = await reddit.post(`/api/multi/${path}`, {
        model: JSON.stringify({
          path,
          display_name: multipath,
          visibility: 'private',
          subreddits: [],
        }),
    })

    createdMulti = undata(response.data);    

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
