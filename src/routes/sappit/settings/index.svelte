<div class="container">
  <div class="form-group censor-usernames">
    <label>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input" type="checkbox" id="inlineCheckbox1"
          bind:checked={$censorUsernames}
        />
        <label class="form-check-label" for="inlineCheckbox1">Censor Usernames</label>
      </div>
    </label>
  </div>
</div>

<script>
import { censorUsernames } from '~/store/settings';
import middlewareAuth from '~/lib/middleware/auth';

middlewareAuth()
</script>
