const assert = require('assert');
const User = require('../src/user');

describe('Sub-documents', () => {
  it('can create a sub-document', done => {
    const mike = new User({
      name: 'Mike',
      posts: [{ title: 'PostTitle' }],
    });
    mike
      .save()
      .then(() => User.findOne({ name: 'Mike' }))
      .then(user => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });
  it('can add sub-documents to an existing record', done => {
    const mike = new User({
      name: 'Mike',
      posts: [],
    });
    mike
      .save()
      .then(() => User.findOne({ name: 'Mike' }))
      .then(user => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Mike' }))
      .then(user => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });
  it('can remove an exisiting sub-document', done => {
    const mike = new User({
      name: 'Mike',
      posts: [{ title: 'New Title' }],
    });
    mike
      .save()
      .then(() => User.findOne({ name: 'Mike' }))
      .then(user => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Mike' }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
