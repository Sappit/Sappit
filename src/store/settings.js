// import get from 'lodash/get';
import { lsWritable } from '~/lib/ls';
// import { options, Types } from '~/lib/settings';

export const censorUsernames = lsWritable('censorUsernames', false)
export const mtEnable = lsWritable('mtEnable', true)
export const mtTagMe = lsWritable('mtTagMe', false)
export const mtMin = lsWritable('mtMin', 5)
export const tumblrConsumerKey = lsWritable('tumblrConsumerKey', '')
export const tumblrConsumerSecret = lsWritable('tumblrConsumerSecret', '')
export const tumblrToken = lsWritable('tumblrToken', '')
export const tumblrTokenSecret = lsWritable('tumblrTokenSecret', '')
export const tumblrSelectedBlog = lsWritable('tumblrSelectedBlog', '')
export const tumblrDefaultTags = lsWritable('tumblrDefaultTags', Object.freeze({}))

// export const state = () => {
//   return {
//     Settings: {
//       ...options.reduce((carry, { key, defaultValue }) => {
//         carry[key] = defaultValue;
//         return carry;
//       }, {}),
//       ...ls.get('Settings', {}),
//     },
//   };
// };

// export const mutations = {
//   ...ls.syncVuexMutators(['Settings']),
// };

// export const actions = {
//   ...options.reduce((carry, { key, action, type }) => {
//     if (action) {
//       carry[key] = action;
//     } else if (type === Types.Boolean) {
//       carry[key] = ({ commit, state }, value) => {
//         value = !!value;
//         if (state[key] !== value) {
//           commit('Settings', {
//             ...state.Settings,
//             [key]: value,
//           });
//         }
//       };
//     } else if (type === Types.BooleanNullable) {
//       carry[key] = ({ commit, state }, value) => {
//         value = value === null ? null : !!value;
//         if (state[key] !== value) {
//           commit('Settings', {
//             ...state.Settings,
//             [key]: value,
//           });
//         }
//       };
//     } else if (type === Types.Integer) {
//       carry[key] = ({ commit, state }, value) => {
//         value = parseInt(value);
//         if (isNaN(value)) {
//           value = isNaN(defaultValue) ? 0 : defaultValue;
//         }
//         if (state[key] !== value) {
//           commit('Settings', {
//             ...state.Settings,
//             [key]: value,
//           });
//         }
//       };
//     } else if (type === Types.Text) {
//       carry[key] = ({ commit, state }, value) => {
//         value = `${value}`;
//         if (state[key] !== value) {
//           commit('Settings', {
//             ...state.Settings,
//             [key]: value,
//           });
//         }
//       };
//     } else if (type === Types.MapString) {
//       carry[key] = ({ commit, state }, value) => {
//         // value = `${value}`;
//         if (state[key] !== value) {
//           commit('Settings', {
//             ...state.Settings,
//             [key]: value,
//           });
//         }
//       };
//     } else {
//       throw new Error('undefined action');
//     }
//     return carry;
//   }, {}),
// };

// export const getters = {
//   ...options.reduce((carry, { key, getter }) => {
//     carry[key] = getter || (state => state.Settings[key]);
//     return carry;
//   }, {}),
// };
