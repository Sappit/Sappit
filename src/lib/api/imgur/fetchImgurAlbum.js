import imgur from '~/lib/imgur';

export default async function fetchImgurAlbum (imgurAlbumId) {
  if (!imgurAlbumId) return null;
  const response = await imgur.get(`/3/album/${imgurAlbumId}`);
  return response.data;
}
