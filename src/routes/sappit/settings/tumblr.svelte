<div class="container">
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label>consumer_key</label>
        <input class="form-control" bind:value={$tumblrConsumerKey}/>
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <label>consumer_secret</label>
        <input class="form-control" bind:value={$tumblrConsumerSecret}/>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label>token</label>
        <input class="form-control" bind:value={$tumblrToken}/>
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <label>token_secret</label>
        <input class="form-control" bind:value={$tumblrTokenSecret}/>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-group tumblr-fetch-blogs">
        <button class="btn btn-primary" on:click|preventDefault|stopPropagation={fetchUserInfo}>Fetch User Info</button>
      </div>
      <div class="alert alert-warning">Your user info and blog list will only be updated when you click this
          button</div>
    </div>
    <!-- <ShowSource value={ ({ blogNames }) }/> -->
  </div>
  {#if $blogs.length > 0}
    <div class="row">
      <div class="col">
        <MyBlogList/>
      </div>
    </div>
  {/if}
</div>

<script>
import find from 'lodash/find';
import get from 'lodash/get';
import map from 'lodash/map';
import MyBlogList from '~/components/Tumblr/MyBlogList';
import ShowSource from '~/components/ShowSource';
import {
  tumblrConsumerKey,
  tumblrConsumerSecret,
  tumblrToken,
  tumblrTokenSecret,
  tumblrSelectedBlog,
} from '~/store/settings';
import {
  blogs,
  fetchUserInfo,
} from '~/store/tumblr';
import middlewareAuth from '~/lib/middleware/auth';

$: blogNames = map($blogs, blog => blog.name);

middlewareAuth()
</script>
