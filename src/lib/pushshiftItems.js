import chunk from 'lodash/chunk';
import get from 'lodash/get';
import find from 'lodash/find';
import last from 'lodash/last';
import flatten from 'lodash/flatten';
import map from 'lodash/map';
import includes from 'lodash/includes';
import isFunction from 'lodash/isFunction';
import uniq from 'lodash/uniq';
import { Kind, parseKind } from '~/lib/enum';
import { startMinWait } from '~/lib/sleep';
import undata from '~/lib/undata';
import pushshift from '~/lib/pushshift';
import href from '~/lib/href';
import reddit from '~/lib/reddit';
import { goto } from '@sapper/app';

const defaultParams = Object.freeze({
  size: 25,
  // limit: 25,
  // pretty: false,
  sort: 'desc',
  // sort_type: 'new',
});

function emptyCollection() {
  return {
    data: {
      children: [],
    },
  };
}

function negateList(csv) {
  return csv
    .split(',')
    .map(name => `!${name}`)
    .join(',');
}

const kindToApiPathMap = {
  [Kind.Comment]: 'comment',
  [Kind.Post]: 'submission',
  [Kind.Subreddit]: 'subreddit',
};

function defaultPathFn (kind, query) {
  // console.log('path.kind', parseKind(route.query.kind));
  const resource = kindToApiPathMap[kind];
  return `/reddit/search/${resource}`;
}

export default async function fetchItems({ path, query }) {
  const kind = parseKind(query.kind);
  if (!isFunction(path)) {
    path = defaultPathFn;
  }

  query = { ...query };

  if (query.subreddit && query.subredditnegated) {
    query.subreddit = negateList(query.subreddit);
  }
  if (query.author && query.authornegated) {
    query.author = negateList(query.author);
  }
  if (query.domain && query.domainnegated) {
    query.domain = negateList(query.domain);
  }

  // if (!isFunction(query)) {
  //   query = ({ route }) => {
  //     // const sort_type = route.query.sort_type || 'new';

  //     const params = {
  //       q: route.query.q || void 0,
  //       size: route.query.size || void 0,
  //       before: route.query.before || void 0,
  //       after: route.query.after || void 0,
  //     };

  //     if (kind === Kind.Post) {
  //       params.title = route.query.title || void 0;
  //       // params.url = route.query.url || void 0;
  //       params.domain = route.query.domain || void 0;
  //     }
  //     if (kind === Kind.Comment) {
  //       params.link_id = route.query.link_id || void 0;
  //       params.parent_id = route.query.parent_id || void 0;
  //     }
  //     if (kind === Kind.Post || kind === Kind.Comment) {
  //       params.subreddit = route.query.subreddit || void 0;
  //       params.author = route.query.author || void 0;
  //     }
  //     if (params.subreddit && route.query.subredditnegated) {
  //       params.subreddit = negateList(params.subreddit);
  //     }
  //     if (params.author && route.query.authornegated) {
  //       params.author = negateList(params.author);
  //     }
  //     if (params.domain && route.query.domainnegated) {
  //       params.domain = negateList(params.domain);
  //     }
  //     return params;
  //   };
  // }
  path = path(kind, query);

  console.log('path', path);
  const response = await pushshift.get(path, {
    params: {
      ...defaultParams,
      ...query,
    },
  });
  const items = get(response, 'data.data', []);
  // setItemsFilteredProperty(items, filterOptions);

  const zeroResults = !(items.length > 0);
  const showBottomPagination = (items.length > 2);

  console.log('fetchItems.done');

  const lastCreatedAt = getLastCreatedAt(items);

  if (kind === Kind.Post) {
    // console.log('Kind.Post');
    for (let i = items.length - 1; i >= 0; i--) {
      items[i].kind = Kind.PushshiftPost;
    }
  } else {
    // console.log('Kind.Comment');
    for (let i = items.length - 1; i >= 0; i--) {
      items[i].kind = Kind.PushshiftComment;
    }
  }

  await pushshiftItemsToRedditItems(items, kind);

  return {
    items,
    showBottomPagination,
    path,
    query,
    zeroResults,
    lastCreatedAt,
  };
}

export async function nextPage(collection) {
  await goto(
    href({
      path: collection.path,
      query: {
        ...collection.query,
        before: (collection.lastCreatedAt || 0) + 1,
      }
    }),
  );
  await this.$nextTick();
  await this.$nextTick();
  await this.fetchItems();
  window.scrollTo(0, 400);
}

function getLastCreatedAt(items) {
  const lastCreatedAt = get(
    last(get(items, 'data.children')),
    'data.created_utc',
  );
  return lastCreatedAt || null;
}

async function pushshiftItemsToRedditItems(input, kind) {
  /* eslint-disable */

  // this api call only acepts 100;
  const chunks = chunk(uniq([
    // get fullnames whether these are posts or comments
    ...input.map(entry => `${kind}_${entry.id}`),
    // get links, if these are comments
    ...input.map(item => item.link_id).filter(Boolean),
  ]), 100);
  let responses = [];
  for (let i = 0; i < chunks.length; i++) {
    responses.push(await reddit.get('/api/info', {
      params: {
        id:  chunks[i].join(','),
        // url
      },
    }))
  }
  const redditChildren = flatten(
    responses.map(response => get(response, 'data.data.children')),
  ).map(undata);

  for (let i = input.length - 1; i >= 0; i--) {
    input[i] = useRedditItemWhenPossible(input[i])
  }

  // console.log({ redditChildren });
  function useRedditItemWhenPossible (pushshiftEntry) {
    const redditItem = find(redditChildren, redditItem => {
      return redditItem.id === pushshiftEntry.id;
    });
    const redditLink = pushshiftEntry.link_id ? find(redditChildren, redditItem => {
      return pushshiftEntry.link_id === Kind.Post+'_'+redditItem.id;
    }) : null;
    if (redditItem) {
      redditItem.postEntry = redditLink || void 0;
      redditItem.pushshiftEntry = pushshiftEntry;

      if (redditItem.body === '[removed]') {
        redditItem.removed = true;
        if (redditItem.author === '[deleted]') {
          redditItem.author = pushshiftEntry.author;
        }
      } else if (redditItem.author === '[deleted]') {
        redditItem.deleted = true;
        redditItem.author = pushshiftEntry.author;
      }

      return redditItem;
    }
    pushshiftEntry.pushshiftMissing = true;
    pushshiftEntry.postEntry = redditLink || void 0;
    return pushshiftEntry;
  }
}

function setItemsFilteredProperty(items, filterOptions) {
  const { text } = filterOptions;
  const lc_text = (text || '').toLowerCase();

  if (!get(items, 'data.children.length')) {
    return;
  }
  for (let i = items.length - 1, item; i >= 0; i--) {
    item = items[i];
    item.sappitHide = !isMatch(item);
  }
  function isMatch({ kind, data }) {
    if (lc_text) {
      const lc_body = (data.body || '').toLowerCase();
      if (includes(lc_body, lc_text)) {
        return true;
      }
      return false;
    }
    return true;
  }
}
