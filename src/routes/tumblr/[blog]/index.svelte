{#if blog}
<div class="container">
  <div class="row">
    <div class="col">{ blog.name }</div>
  </div>
  <div class="row">
    <div class="col">
      <ShowSource value={data}/>
    </div>
  </div>
</div>
{/if}

<script>
import { onMount } from 'svelte';
import find from 'lodash/find';
import { blogs } from '~/store/tumblr';
import ShowSource from '~/components/ShowSource'
import validatePropTumblrblog from '~/lib/validateProp/tumblrblog';
import { fetchUserDashboard } from '~/store/tumblr';
import { stores } from '@sapper/app'
const { page } = stores();

// props
// export let blog;

let data = null;

$: blog = $page.params.blog ? find($blogs, blog => blog.name === $page.params.blog) : null
$: blog===null || validatePropTumblrblog(blog);

onMount(() => {
  fetchUserDashboard({
    options: {},
  }).then(response => data = response.data);
})
</script>
