export default function isValidImageSrc (src) {
  if (!(src && src.startsWith('https://'))) {
    return false;
  }
  // this is actually the video itself
  // which should presented with PostVideo.svelte
  // we're only looking for images
  if (src.startsWith('https://v.redd.it/')) {
    return false;
  }
  // @todo more logic
  return true;
}
