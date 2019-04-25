const assert = require('assert');
const User = require('../src/user');

describe('Delete a user', () => {
  let mike;

  beforeEach(done => {
    mike = new User({ name: 'Mike' });
    mike.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.findOne({ name: 'Mike' }))
      .then(user => {
        assert(user === null);
        done();
      });
  }

  it('model instance remove', done => {
    assertName(mike.remove(), done);
  });
  it('class method remove', done => {
    // Remove multiple records with some given criteria
    assertName(User.deleteMany({ name: 'Mike' }), done);
  });
  it('class method findAndRemove', done => {
    assertName(User.findOneAndDelete({ name: 'Mike' }), done);
  });
  it('class method findByIdAndRemove', done => {
    assertName(User.findByIdAndDelete(mike._id), done);
  });
});
