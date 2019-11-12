export const Types = {
  Boolean: 1,
  BooleanNullable: 2,
  Integer: 3,
  Text: 4,
  MapString: 5,
};

/*eslint-disable*/
export const options = [
  { key: 'censorUsernames', type: Types.Boolean, defaultValue: false },
  { key: 'mtEnable', type: Types.Boolean, defaultValue: true },
  { key: 'mtTagMe', type: Types.Boolean, defaultValue: false },
  { key: 'mtMin', type: Types.Integer, defaultValue: 5 },
  { key: 'tumblrConsumerKey', type: Types.Text, defaultValue: '' },
  { key: 'tumblrConsumerSecret', type: Types.Text, defaultValue: '' },
  { key: 'tumblrToken', type: Types.Text, defaultValue: '' },
  { key: 'tumblrTokenSecret', type: Types.Text, defaultValue: '' },
  { key: 'tumblrSelectedBlog', type: Types.Text, defaultValue: '' },
  { key: 'tumblrDefaultTags', type: Types.MapString, defaultValue: Object.freeze({}) },
];
