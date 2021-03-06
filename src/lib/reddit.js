import sleep from '~/lib/sleep';
import axios from 'axios';
import get from 'lodash/get';
import isString from 'lodash/isString';
import qs from 'qs';
import axiosRetry from 'axios-retry';
import * as authStore from '~/store/auth';
import * as apilogStore from '~/store/apilog';
import * as masstaggerStore from '~/store/masstagger';
import { mtEnable } from '~/store/settings';
import { get as store_get } from 'svelte/store';
import now from '~/lib/now';

const redditClientId = process.env.redditClientId;
const redirect_uri = process.env.redditRedirectUri;

// @link https://www.reddit.com/dev/api/
const OAUTH_BASE = 'https://oauth.reddit.com/';
const API_BASE = 'https://api.reddit.com/';
const X_RATELIMIT_REMAINING = 'x-ratelimit-remaining';
const CONTENT_TYPE = 'Content-Type';

let lastResponseHeaders;

export const client = axios.create({
  baseURL: OAUTH_BASE,
  headers: {
    // 'User-Agent': 'axios-reddit-client/v0.0.0',
    [CONTENT_TYPE]: 'application/x-www-form-urlencoded',
  },
  responseType: 'json',
  maxRedirects: 0,
  transformRequest(data, headers) {
    if (isString(data) && data[0] === '{') {
      headers[CONTENT_TYPE] = 'application/json';
      return data;
    }
    return qs.stringify(data, { arrayFormat: 'brackets' });
  },
});

export default client;

axiosRetry(client, {
  retries: 9,
  retryDelay: axiosRetry.exponentialDelay,
});

client.interceptors.request.use(async config => {
  // axios 0.19 breaks this line:
  const username = config.username || store_get(authStore.username);

  // console.log('username', username, config.username, store_get(authStore.username), config);

  const accessToken = await getAccessToken({
    username,
  });
  if (!accessToken) {
    console.error('!accessToken', { accessToken, config });
    throw new AccessTokenRequiredError();
  }
  if (!config.params) {
    config.params = {};
  }
  config.params.raw_json = 1;
  config.headers.Authorization = `bearer ${accessToken}`;
  if (lastResponseHeaders) {
    if (!(lastResponseHeaders[X_RATELIMIT_REMAINING] > 10)) {
      console.warn(
        'Sleeping for 5 seconds to avoid ratelimit',
        lastResponseHeaders[X_RATELIMIT_REMAINING],
      );
      await sleep(5000);
    }
  }

  config.apiLog = {
    start: now(),
    username,
  };
  return config;
});

client.interceptors.response.use(
  async response => {
    apilogStore.add(response);

    if (store_get(mtEnable)) {
      /* no await */ masstaggerStore.fetchTags(response && response.data);
    }

    lastResponseHeaders = response.headers;
    return response;
  },
  async err => {
    apilogStore.add(err.response || err);
    console.error('intercepter.err', err);
    throw err;
  },
);

export function AccessTokenRequiredError() {
  this.message = 'Access Token Required';
}
AccessTokenRequiredError.prototype = new Error();

const scopes = [
  'identity',
  'edit',
  'flair',
  'history',
  'modcontributors',
  'modconfig',
  'modflair',
  'modlog',
  'modposts',
  'modwiki',
  'mysubreddits',
  'privatemessages',
  'read',
  'report',
  'save',
  'submit',
  'subscribe',
  'vote',
  'wikiedit',
  'wikiread',
];

export async function fetchAccessToken({ state, code, error }) {
  return axios.post(
    `${API_BASE}api/v1/access_token`,
    [
      'grant_type=authorization_code',
      `code=${code}`,
      `redirect_uri=${redirect_uri}`,
    ].join('&'),
    {
      auth: {
        username: process.env.redditClientId,
        password: process.env.redditClientSecret,
      },
    },
  );
}

export async function fetchRefreshedAccessToken(params) {
  // console.log('fetchRefreshedAccessToken', params);
  if (params && params.error) {
    console.error('fetchRefreshedAccessToken', params)
    throw new Error(params.error);
  }
  if (!(params && params.refresh_token)) {
    console.error('fetchRefreshedAccessToken', params)
    throw new Error('missing refresh_token');
  }
  return axios.post(
    `${API_BASE}api/v1/access_token`,
    ['grant_type=refresh_token', `refresh_token=${params.refresh_token}`].join('&'),
    {
      auth: {
        username: process.env.redditClientId,
        password: process.env.redditClientSecret,
      },
    },
  );
}

function randomState() {
  // eslint-disable-next-line
  return Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2);
}

export function getOAuthLoginHref() {
  if (!process.env.redditClientId) {
    throw new Error('redditClientId required');
  }
  const state = randomState();
  return (
    'https://www.reddit.com/api/v1/authorize?' +
    'client_id=' +
    process.env.redditClientId +
    '&response_type=code' +
    '&state=' +
    state +
    '&redirect_uri=' +
    redirect_uri +
    '&duration=permanent' +
    '&scope=' +
    scopes.join('+')
  );
}

async function isAccessTokenExpired({ username }) {
  // console.assert(username);
  const expiresAt = username
    ? get(store_get(authStore.accounts),`${username}.OAuthData.expires_at`, 0)
    : get(store_get(authStore.tmpOAuthData),'OAuthData.expires_at', 0);
  const isExpired = expiresAt >= Date.now() + 500;
  // console.log('isAccessTokenExpired', { isExpired, expiresAt });
  return expiresAt >= Date.now() + 500;
}

async function getAccessToken({ username }) {
  // console.assert(username);
  // console.log('getAccessToken');
  if (isAccessTokenExpired({ username })) {
    await authStore.fetchRefreshedAccessToken({ username });
  }
  if (!username && store_get(authStore.tmpOAuthData)) {
    await authStore.fetchRefreshedAccessToken({ username });
    return store_get(authStore.tmpOAuthData).access_token;
  }
  return get(
    store_get(authStore.accounts),
    `${username}.OAuthData.access_token`,
  );
}
