<table class="table table-sm">
  <tbody>
    <tr>
      <th>
        <i class="fa fa-fw fa-link-ext"/>
      </th>
      <th>Blog</th>
      <th><small>Followers</small></th>
      <th><small>Queue</small></th>
      <th><small>Posts</small></th>
      <th><small>default tags</small></th>
    </tr>
  </tbody>
  <tbody>
    {#each $blogs as blog (blog.uuid)}
      <tr>
        <td>
          <a href={blog.url}>
            <i class="fa fa-fw fa-link-ext"/>
          </a>
        </td>
        <td>
          <a href="/tumblr/{blog.name}">{ blog.name }</a>
        </td>
        <td>{ blog.followers }</td>
        <td>{ blog.queue }</td>
        <td>{ blog.posts }</td>
        <td>
          <input
            class="form-control"
            value={getDefaultTag(blog.name)}
            on:change={(event) => setDefaultTag(blog.name, event.target.value)}
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<script>
import get from 'lodash/get';
import { blogs, tumblrSelectedBlog } from '~/store/tumblr';
import { tumblrDefaultTags } from '~/store/settings';

$: blogList = $blogs;

function getDefaultTag(blogname) {
  return get($tumblrDefaultTags, blogname) || '';
}
function setDefaultTag(blogname, value) {
  $tumblrDefaultTags = {
    ...$tumblrDefaultTags,
    [blogname]: value ? value : void 0,
  };
}
</script>
