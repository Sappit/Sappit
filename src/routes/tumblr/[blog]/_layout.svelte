<div class="container">
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a href="/tumblr" class="nav-link">
        all blogs
      </a>
    </li>
    {#if blog}
      <li class="nav-item">
        <a href="/tumblr/{blog.name}" class="nav-link" class:active={$page.path}>
          Dashboard ({ blog.name })
        </a>
      </li>
      <li class="nav-item">
        <a href="/tumblr/{blog.name}/posts" class="nav-link"
          class:active={$page.path.includes(`/tumblr/${blog.name}/posts`)}>
          Posts ({ blog.posts })
        </a>
      </li>
      <li class="nav-item">
        <a href="/tumblr/{blog.name}/queue" class="nav-link"
          class:active={$page.path.includes(`/tumblr/${blog.name}/queue`)}>
          Queue ({ blog.queue })
        </a>
      </li>
      <li class="nav-item">
        <a href="/tumblr/{blog.name}/drafts" class="nav-link"
          class:active={$page.path.includes(`/tumblr/${blog.name}/drafts`)}>
          Drafts ({ blog.drafts })
        </a>
      </li>
      <li class="nav-item">
        <a href="/tumblr/{blog.name}/submissions" class="nav-link"
          class:active={$page.path.includes(`/tumblr/${blog.name}/submissions`)}>
          Submissions ({ blog.drafts })
        </a>
      </li>
    {/if}
  </ul>
  {#if blog}
    <slot {blog}/>
  {/if}
</div>

<script>
import find from 'lodash/find';
import { blogs } from '~/store/tumblr';
import middlewareAuth from '~/lib/middleware/auth';
import { stores } from '@sapper/app'
const { page } = stores();

$: blog = $page.params.blog ? find($blogs, blog => blog.name === $page.params.blog) : null
middlewareAuth()
</script>
