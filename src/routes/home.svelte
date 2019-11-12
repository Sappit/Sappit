<section class="container home">
  <div>
    <h1 class="title">Sappit</h1>
    <h2 class="subtitle">Sapper Svelte Reddit Client</h2>
    <p>This app is in ALPHA, expect bugs and missing features.</p>
    <div class="links">
      {#if !$username}
        <a class="btn btn-outline-success" href="/login">Login</a>
      {/if}
      <a class="btn btn-outline-secondary" href="/best">/best</a>
      <a class="btn btn-outline-secondary" href="/hot">/hot</a>
      <a class="btn btn-outline-secondary" href="/new">/new</a>
      <a class="btn btn-outline-secondary" href="/rising">/rising</a>
      <a class="btn btn-outline-secondary" href="/controversial">/controversial</a>
      <a class="btn btn-outline-secondary" href="/top">/top</a>
    </div>
    <div class="links">
      <a class="btn btn-outline-secondary" href="/r/popular">/r/popular</a>
      <a class="btn btn-outline-secondary" href="/r/all">/r/all</a>
      <a class="btn btn-outline-secondary" href="/r/friends">/r/friends</a>
      <a class="btn btn-outline-secondary" href="/r/mod/?sort=new">/r/mod</a>
      <a class="btn btn-outline-secondary" href="/random">/random</a>
      <a class="btn btn-outline-secondary" href="/subreddits">/subreddits</a>
      {#if $username}
        <a class="btn btn-outline-success" href="/user/{$username}">/u/{ $username }</a>
        <a class="btn btn-outline-success" href="/user/{$username}/saved">Saved</a>
      {/if}
    </div>
    <div class="links">
      <a class="btn btn-outline-success" rel="nofollow" target="_blank" href="https://github.com/Sappit/Sappit">
        <i class="fa fa-fw fa-btn fa-github"/>
        Watch us on Github!
      </a>
      <a class="btn btn-outline-success" href="/r/Sappit">
        <i class="fa fa-fw fa-btn fa-reddit"/>
        Visit Our Subreddit
      </a>
    </div>
  </div>
</section>

<script>
import { username } from '~/store/auth';
import middlewareAuth from '~/lib/middleware/auth';
middlewareAuth()
</script>

<style>
.container.home {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
