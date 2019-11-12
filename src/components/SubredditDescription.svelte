<div class="community-details">
  <h5 class="text-center">Community Details</h5>
  <hr>
  <h4>/r/{subreddit.display_name}</h4>
  <ItemHtml value={subreddit.description_html}/>
</div>

<script>
import ItemHtml from '~/components/ItemHtml';
import validatePropSubreddit from '~/lib/validateProp/subreddit';

// props
export let subreddit;

$: validatePropSubreddit(subreddit);

// the description_html string contains the sidebar,
// and rules, but is not the same as "Community Details"
</script>
