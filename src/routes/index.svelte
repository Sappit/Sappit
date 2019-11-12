<section class="container index">
  <div>
    <h1 class="title">
      <img src="/android-chrome-192x192.png" alt="Sappit">
 Sappit
    </h1>
    <h2 class="subtitle">Sapper Reddit Client</h2>
    <p>This app is in EARLY ALPHA, expect bugs and missing features.</p>
    <p>You have to login to do anything</p>
    <div class="links">
      <a class="btn btn-outline-success" href="/login">Login</a>
      <a class="btn btn-outline-success" href="https://github.com/Sappit/Sappit">
        <i class="fa fa-fw fa-btn fa-github"/>
        Watch us on Github!
      </a>
    </div>
  </div>
</section>

<script>
import middlewareGuest from '~/lib/middleware/guest';

middlewareGuest();
</script>

<style>
.container.index {
  min-height: 100vh;
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
