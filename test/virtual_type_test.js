const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('postCount return number of posts', done => {
    const mike = new User({
      name: 'Mike',
      posts: [{ title: 'PostTitle' }],
    });
    mike
      .save()
      .then(() => User.findOne({ name: 'Mike' }))
      .then(user => {
        assert(mike.postCount === 1);
        done();
      });
  });
});
