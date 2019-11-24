<div class="posts-image">
  {#if !imageSrc && post.thumbnail === 'image'}
    image
  {:else if !imageSrc && post.thumbnail === 'default'}
    <i class="fa fa-fw fa-btn fa-5x fa-question-circle-o" title="default"/>
  {:else if !imageSrc && post.thumbnail === 'self'}
    <i class="fa fa-fw fa-btn fa-5x fa-doc-text" title="self"/>
  {:else if !imageSrc && post.thumbnail === 'spoiler'}
    <i class="fa fa-fw fa-btn fa-5x fa-question-circle-o" title="spoiler"/>
  {:else if isImgurVideo}
    <video class="img-fluid" preload="auto" autoplay={false} loop="loop" controls>
      <source src={imgurMp4Src} type="video/mp4"/>
      <source src={imageSrc} type="video/gifv"/>
    </video>
  {:else if isPostHintVideo && post.secure_media_embed && post.secure_media_embed.content}
    {@html post.secure_media_embed.content}
  {:else if post.post_hint === 'link' && post.secure_media && post.secure_media.type === 'twitter.com' && post.secure_media.oembed && post.secure_media.oembed.html}
    {@html post.secure_media.oembed.html}
  {:else if imgurAlbumId && post.media_embed && post.media_embed.content}
    {@html post.media_embed.content}
  {:else if imageSrc}
    <img src={imageSrc} alt={post.title} class="img-fluid"/>
  {:else}
    NO_THUMB
  {/if}
</div>

<script>
import includes from 'lodash/includes';
import getPostImageSrc from '~/lib/getPostImageSrc';
import getImgurAlbumId from '~/lib/imgur/getImgurAlbumId';
import validatePropPost from '~/lib/validateProp/post';

// props
export let post;

// @todo the imgur album embed has a white background, would love to fix this in the future
// but we'd need a proxy to rewrite the emdebly script or use the imgur API and build the album by scratch

$: validatePropPost(post);
$: imgurAlbumId = getImgurAlbumId(post);
$: imageSrc = getPostImageSrc(post)
$: isImgurVideo = imageSrc.includes('//i.imgur.com/') && imageSrc.endsWith('.gifv')
$: imgurMp4Src = isImgurVideo ? imageSrc.replace('.gifv', '.mp4') : null
$: isPostHintVideo = includes(post.post_hint,  'video')
</script>
