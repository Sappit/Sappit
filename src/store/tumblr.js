import get from 'lodash/get';
import { derived, get as store_get } from 'svelte/store'
import { lsWritable } from '~/lib/ls';
import {
  tumblrConsumerKey,
  tumblrConsumerSecret,
  tumblrToken,
  tumblrTokenSecret,
} from '~/store/settings';
import tumblr from '~/lib/tumblr';

export const tumblrUserInfo  = lsWritable('tumblrUserInfo', {});

export const blogs = derived(tumblrUserInfo, newUserInfoValue => {
  return get(newUserInfoValue, 'user.blogs', []);
});
export const noBlogs = derived(blogs, newUserInfoValue => {
  return !(get(newUserInfoValue, 'user.blogs.length', 0) > 0);
});

export function updateBlogPost ({ blogName, options }) {
  return tumblr.post('/editPost', {
    ...apikeys(),
    blogName,
    options,
  });
}

export function fetchBlogPosts ({ blogName, options }) {
  return tumblr.post('/blogPosts', {
    ...apikeys(),
    blogName,
    options,
  });
}

export function fetchBlogQueue ({ blogName, options }) {
  return tumblr.post('/blogQueue', {
    ...apikeys(),
    blogName,
    options,
  });
}


export function fetchUserDashboard ({ options }) {
  return tumblr.post('/userDashboard', {
    ...apikeys(),
    options,
  });
}

export async function fetchUserInfo () {
  const response = await tumblr.post('/userInfo', {
    ...apikeys(),
  });

  tumblrUserInfo.set(response.data);
}

export function deletePost ({ blogName, options }) {
  return tumblr.post('/deletePost', {
    ...apikeys(),
    blogName,
    options,
  });
}

export function createVideoPost ({ blogName, options }) {
  return tumblr.post('/createVideoPost', {
    ...apikeys(),
    blogName,
    options,
  });
}

export function createTextPost ({ blogName, options }) {
  return tumblr.post('/createTextPost', {
    ...apikeys(),
    blogName,
    options,
  });
}

export function createPhotoPost ({ blogName, options }) {
  return tumblr.post('/createPhotoPost', {
    ...apikeys(),
    blogName,
    options,
  });
}

export function createLinkPost ({ blogName, options }) {
  return tumblr.post('/createLinkPost', {
    ...apikeys(),
    blogName,
    options,
  });
}

function apikeys() {
  return {
    consumer_key: store_get(tumblrConsumerKey),
    consumer_secret: store_get(tumblrConsumerSecret),
    token: store_get(tumblrToken),
    token_secret: store_get(tumblrTokenSecret),
  };
}
