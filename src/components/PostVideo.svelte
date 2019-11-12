<div class="posts-video">
  <video
    playsinline="true"
    webkit-playsinline="true"
    preload="auto"
    src="https://v.redd.it/TODO"
  />
</div>

<script>
import getPostImageSrc from '~/lib/getPostImageSrc';
import validatePropPost from '~/lib/validateProp/post';

// props
export let post;

$: validatePropPost(post);
$: imageSrc = getPostImageSrc(post)
</script>
