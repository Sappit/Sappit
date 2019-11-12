<div class="container">
  <div class="alert alert-info">
    Note that we are currently unable to distinguish between regular users of a subreddit
    and outsiders that choose to argue against regular users of subreddit.
  </div>
  <div class="row">
    <div class="col">
      <div class="form-group mt-enable">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input" type="checkbox" id="inlineCheckbox1"
            bind:checked={$mtEnable}
          />
          <label class="form-check-label" for="inlineCheckbox1">Enable</label>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="form-group mt-min">
        <label>Minimum Threshold</label>
        <input class="form-control" bind:value={$mtMin} type="number"/>
      </div>
      <div class="form-group mt-tag-me">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input" type="checkbox" id="inlineCheckbox1"
            bind:checked={$mtTagMe}
          />
          <label class="form-check-label" for="inlineCheckbox1">Tag Myself</label>
        </div>
      </div>
      <hr>
      <div class="form-group mt-flush-cache">
        <button
          class="btn btn-danger"
          on:click|preventDefault|stopPropagation={flush}
        >
          Flush  Masstagger Cache
          <small>({ $cachedCount } users cached)</small>
        </button>
      </div>
    </div>
  </div>
</div>

<script>
import {
  mtEnable,
  mtMin,
  mtTagMe,
} from '~/store/settings';
import {
  cachedCount,
  flush,
} from '~/store/masstagger';
import middlewareAuth from '~/lib/middleware/auth';

middlewareAuth()
</script>
