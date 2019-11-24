<div class="imgur-album text-center">
  {#if album.title}
    <h4>{album.title}</h4>
  {/if}
  {#if album.description}
    <p>{album.description}</p>
  {/if}
  {#if image && image.animated}
    <video class="img-fluid" preload="auto" autoplay={false} loop="loop" controls>
      <source src={image.mp4} type="video/mp4"/>
      <source src={image.gifv} type="video/gifv"/>
      <source src={image.hls} type="application/x-mpegURL"/>
    </video>
  {:else if image}
    <img
      src={image.link}
      alt={image.title} class="img-fluid"
    />
  {/if}
  {#if image.title}
    <p>
      {image.title}
    </p>
  {/if}

  {#if length > 1}
    <div style="position: sticky; bottom: 10px;">
      <button
        disabled={index === 0}
        class:disabled={prevIndex === null}
        class="btn btn-secondary"
        on:click|preventDefault|stopPropagation={first}
      >
        <i class="fa fa-fw fa-btn fa-to-end fa-rotate-180"/>
        First
      </button>
      <button
        disabled={prevIndex === null}
        class:disabled={prevIndex === null}
        class="btn btn-secondary"
        on:click|preventDefault|stopPropagation={prev}
      >
        <i class="fa fa-fw fa-btn fa-left-open"/>
        Left
      </button>
      <button
        disabled={nextIndex === null}
        class:disabled={nextIndex === null}
        class="btn btn-secondary"
        on:click|preventDefault|stopPropagation={next}
      >
        Right
        <i class="fa fa-fw fa-btn fa-right-open"/>
      </button>
      <button
        disabled={lastIndex === null || index === lastIndex}
        class:disabled={lastIndex === null || index === lastIndex}
        class="btn btn-secondary"
        on:click|preventDefault|stopPropagation={last}
      >
        Last
        <i class="fa fa-fw fa-btn fa-to-end"/>
      </button>
    </div>
  {/if}
</div>

<script>
// props
export let album;

let index = 0;

$: prevIndex = index > 0 ? index - 1 : null
$: nextIndex = index < (length - 1) ? index + 1 : null
$: lastIndex = length > 0 ? (length - 1) : null
$: length = (album && album.images && album.images.length) || 0;
$: image = (album && album.images && album.images[index]) || null;

function first () {
  index = 0
}
function prev () {
  index--
}
function next () {
  index++
}
function last () {
  index = lastIndex
}
</script>
