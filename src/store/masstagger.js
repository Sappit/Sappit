import { get as store_get, derived, writable } from 'svelte/store'
import axios from 'axios';
import * as settingsStore from '~/store/settings'
import * as authStore from '~/store/auth'
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import { isBot } from '~/lib/bots';
import { Kind } from '~/lib/enum';
import qs from 'qs';

const masstagger = axios.create({
  baseURL: '/masstagger',
  headers: {
    'App-Name': 'Sappit-Svelte-Reddit-Client',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  responseType: 'json',
  maxRedirects: 0,
  transformRequest(data, headers) {
    return qs.stringify(data, {
      // arrayFormat: 'brackets',
    });
  },
});

export const cache = writable({});

export const cachedCount = derived(cache, newCacheValue => {
  let count = 0;
  for (const key in newCacheValue) {
    if (newCacheValue.hasOwnProperty(key)) {
      count++;
    }
  }
  return count;
})

export function findByUsername () {
  // @todo
}

export function flush () {
  // @todo
}

export async function fetchTags (mixedTree) {
  // console.log('fetchTags', {mixedTree})
  const mtMin = store_get(settingsStore.mtMin);
  const mtTagMe = store_get(settingsStore.mtTagMe);
  const myUsernames = store_get(authStore.usernames);
  const cacheValue = store_get(cache);

  const usernames = {};

  crawlTree(mixedTree, u => {
    if (isString(u)) {
      usernames[u.toUpperCase()] = true;
    }
  });

  delete usernames['[DELETED]'];
  delete usernames['[REMOVED]'];

  if (!mtTagMe && myUsernames && myUsernames.length) {
    for (let i = myUsernames.length - 1; i >= 0; i--) {
      delete usernames[myUsernames[i].toUpperCase()];
    }
  }

  for (let key in usernames) {
    if (cacheValue[key] || isBot(key)) {
      // already pending
      delete usernames[key];
    }
  }

  // console.log({ usernames })

  const userNamesList = Object.keys(usernames);
  if (userNamesList.length === 0) {
    // console.log('userNamesList.length === 0', userNamesList.length, userNamesList);
    return;
  }

  const response = await masstagger.post(
    '/users/subs',
    {
      users: JSON.stringify(userNamesList),
    },
    {
      params: {
        min: mtMin,
      },
    },
  );

  const data = {};

  const responseUsers = get(response, 'data.users') || [];
  if (responseUsers) {
    for (let i = responseUsers.length - 1, user; i >= 0; i--) {
      user = responseUsers[i];
      // console.log({user});
      if (get(user.subreddits, 'length') > 0) {
        data[user.username] = mtToString(sortBy(user.subreddits.map(subreddit => {
          user[subreddit].subreddit = subreddit;
          return user[subreddit]
         }), byPosts).reverse().slice(0, 3));
      }
    }
  }

  cache.update(cacheValue => {
    Object.assign(cacheValue, data);
    return cacheValue;
  })
  // console.log({ data });

  // @todo
}

function mtToString (entries) {
  return `posts in ${entries.map(entry => '/r/'+entry.subreddit+':'+entry.posts).join(', ')}`
}

function byPosts (entry) {
  return entry.posts;
}

function crawlTree(mt, addUser) {
  if (!mt) return;
  if (isArray(mt)) {
    for (let i = mt.length - 1; i >= 0; i--) {
      crawlTree(mt[i], addUser);
    }
  }
  if (mt.kind === Kind.User && mt.name) {
    addUser(mt.name);
  }
  addUser(mt.author);
  addUser(mt.approved_by);
  addUser(mt.mod_reason_by);
  addUser(mt.banned_by);
  crawlTree(mt.data, addUser);
  crawlTree(mt.children, addUser);
  crawlTree(mt.things, addUser);
}
