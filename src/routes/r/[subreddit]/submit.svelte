<br>
<div class="container">
  <div class="alert alert-primary">
    <ItemHtml value={$subreddit.submit_text_html}/>
  </div>
</div>
<br>
<div class="container">
  <PostForm subreddit={$subreddit}/>
</div>

<script>
import ItemHtml from '~/components/ItemHtml';
import PostForm from '~/components/PostForm';
import middlewareAuth from '~/lib/middleware/auth';
import validatePropSubreddit from '~/lib/validateProp/subreddit';
import { subreddit } from '~/store/params';

// props
// export let subreddit;

$: validatePropSubreddit($subreddit);

middlewareAuth()
</script>
