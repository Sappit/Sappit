<div class="container">
  <div class="row">
    <div class="col">{ blog.name }</div>
  </div>
  <div class="row">
    <div class="col">
      <ShowSource value={({ blog })}/>
    </div>
  </div>
</div>

<script>
import find from 'lodash/find';
import { blogs } from '~/store/tumblr';
import ShowSource from '~/components/ShowSource'
import validatePropTumblrblog from '~/lib/validateProp/tumblrblog';
import { stores } from '@sapper/app'
const { page } = stores();

// props
// export let blog;

$: blog = $page.params.blog ? find($blogs, blog => blog.name === $page.params.blog) : null
$: validatePropTumblrblog(blog);
</script>
