export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'tweet',
      title: 'Tweet',
      description: 'The tweet that this comment is for',
      type: 'reference',
      to: [{ type: 'tweet' }],
    },
  ],
}
