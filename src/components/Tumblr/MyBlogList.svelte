<table class="table table-sm">
  <tbody>
    <tr>
      <th>
        <i class="fa fa-fw fa-link-ext"/>
      </th>
      <th>Blog</th>
      <th><small>messages</small></th>
      <!-- <th><small>submissions</small></th> -->
      <th><small>Followers</small></th>
      <th><small>Drafts</small></th>
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
          <br />
          <small class="text-muted">
            updated: <DateTime value={blog.updated}/>
          </small>
        </td>
        <td>{ blog.messages }</td>
        <!-- <td>{ blog.submissions }</td> -->
        <td>{ blog.followers }</td>
        <td>{ blog.drafts }</td>
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
import DateTime from '~/components/DateTime';

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
