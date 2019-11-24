import get from 'lodash/get';

const fields = Object.freeze([
  {
    name: 'kind',
    type: 'select',
    options: Object.freeze([
      { value: 'text', text: 'text' },
      { value: 'link', text: 'link' },
      { value: 'video', text: 'video' },
      { value: 'photo', text: 'photo' },
    ]),
    default({ parent, dirty }) {
      if (get(dirty, 'kind')) {
        return get(dirty, 'kind');
      }
      const post_hint = get(parent, 'post_hint');
      if (post_hint === 'image') {
        return 'photo';
      }
      if (post_hint === 'video') {
        return 'link';
      }
      if (get(parent, 'permalink')) {
        return 'link';
      }
      return 'text';
    },
  },
  {
    name: 'state',
    type: 'select',
    options: Object.freeze([
      { value: 'queue', text: 'queue' },
      { value: 'published', text: 'published' },
      { value: 'draft', text: 'draft' },
      { value: 'private', text: 'private' },
    ]),
    default({ dirty }) {
      if (get(dirty, 'state')) {
        return get(dirty, 'state');
      }
      return 'queue';
    },
  },
  {
    name: 'tags',
    type: 'textarea',
    default({ tumblrDefaultTags, selected_blog }) {
      if (selected_blog) {
        return get(tumblrDefaultTags, selected_blog) || '';
      }
      return '';
    },
    clearButton: {
      newValue: '',
    },
  },
  // publish_on: { // ISO 8601 format
  //   type: 'text',
  //   default({ parent, tumblrDefaultTags }) { return tumblrDefaultTags || ''; },
  // },
  {
    name: 'caption',
    kinds: ['photo', 'video'],
    type: 'textarea',
    default({ parent }) {
      // maybe I want to caption from a comment
      if (get(parent, 'body_html')) {
        return get(parent, 'body_html') || '';
      }
      return get(parent, 'title') || get(parent, 'link_title') || '';
    },
    description: 'The user-supplied caption',
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'link',
    kinds: ['photo'],
    type: 'text',
    default({ parent }) {
      return '';
      // return get(parent, 'url')
      //   || get(parent, 'link_url');
    },
    description: 'The "click-through URL" for the photo',
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'source',
    kinds: ['photo', 'source'],
    type: 'text',
    default({ parent }) {
      return (
        get(parent, 'url') ||
        get(parent, 'link_url') ||
        get(parent, 'permalink') ||
        null
      );
    },
    description: {
      photo: 'The photo source URL',
      quote: 'Quote: Cited source, HTML allowed',
    },
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'quote',
    kinds: ['quote'],
    type: 'text',
    default({ parent }) {
      return '';
    },
    description: 'The full text of the quote, HTML entities must be escaped',
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'title',
    kinds: ['link', 'text'],
    type: 'text',
    default({ parent }) {
      return get(parent, 'title') || get(parent, 'link_title') || '';
    },
    description: {
      link:
        'The title of the page the link points to, HTML entities should be escaped',
    },
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'body',
    kinds: ['text'],
    type: 'textarea',
    default({ parent }) {
      if (get(parent, 'body_html')) {
        return get(parent, 'body_html') || '';
      }
      if (get(parent, 'selftext_html')) {
        return get(parent, 'selftext_html') || '';
      }
      return get(parent, 'title') || get(parent, 'link_title') || '';
    },
    description:
      'The title of the page the link points to, HTML entities should be escaped',
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'url',
    kinds: ['link'],
    type: 'text',
    default({ parent }) {
      return (
        get(parent, 'url') ||
        get(parent, 'permalink') ||
        get(parent, 'link_url') || ''
      );
    },
    description: 'The link',
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'thumbnail',
    kinds: ['link'],
    type: 'text',
    default({ parent }) {
      return '';
    },
    description: 'The url of an image to use as a thumbnail for the post',
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'description',
    kinds: ['link'],
    type: 'text',
    default({ parent }) {
      return '';
    },
    description: 'A user-supplied description, HTML allowed',
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'excerpt',
    kinds: ['link'],
    type: 'text',
    default({ parent }) {
      return '';
    },
    description:
      'An excerpt from the page the link points to, HTML entities should be escaped',
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'author',
    kinds: ['link'],
    type: 'text',
    default({ parent }) {
      return '';
    },
    description:
      'The name of the author from the page the link points to, HTML entities should be escaped',
    clearButton: {
      newValue: '',
    },
  },
  {
    name: 'embed',
    kinds: ['video'],
    type: 'text',
    default({ parent }) {
      return (
        get(parent, 'url') ||
        // get(parent, 'permalink') ||
        get(parent, 'link_url') || ''
      );
    },
    description:
      "HTML embed code for the video or a URI to the video. If you provide an unsupported service's URI you may receive a 400 response.",
    clearButton: {
      newValue: '',
    },
  },
  // data: {
  //   kinds: ['video'],
  //   type: 'file',
  //   default({ parent }) { return null; },
  //   description: 'A video file, limit 100MB',
  // },
]);

export default fields
