<div class="row">
  <div class="col">
    <div class="form-group tumblr-fetch-blogs">
      <button class="btn btn-primary" on:click|preventDefault|stopPropagation={fetchUserInfo}>Fetch User Info</button>
    </div>
    <div class="alert alert-warning">Your user info and blog list will only be updated when you click this
        button</div>
  </div>
</div>
<div class="row">
  <div class="col"><MyBlogList/></div>
</div>

<script>
import find from 'lodash/find';
import get from 'lodash/get';
import map from 'lodash/map';
import MyBlogList from '~/components/Tumblr/MyBlogList';
import { fetchUserInfo } from '~/store/tumblr';
import middlewareAuth from '~/lib/middleware/auth';

middlewareAuth()
</script>
