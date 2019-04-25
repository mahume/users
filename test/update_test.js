const assert = require('assert');
const User = require('../src/user');

describe('Update records', () => {
  let mike;

  beforeEach(done => {
    mike = new User({ name: 'Mike', likes: 0 });
    mike.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Michael');
        done();
      });
  }

  // Model Instance
  it('updates one', done => {
    assertName(mike.updateOne({ name: 'Michael' }), done);
  });
  it('sets and saves', done => {
    mike.set('name', 'Michael');
    assertName(mike.save(), done);
  });
  // Model Class
  it('updates many', done => {
    assertName(User.updateMany({ name: 'Mike' }, { name: 'Michael' }), done);
  });
  it('updates one record', done => {
    assertName(
      User.findOneAndUpdate({ name: 'Mike' }, { name: 'Michael' }),
      done
    );
  });
  it('finds record with ID and update', done => {
    assertName(User.findByIdAndUpdate(mike._id, { name: 'Michael' }), done);
  });

  it('lets user increment their post count by 1', done => {
    User.update({ name: 'Mike' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Mike' }))
      .then(user => {
        assert(user.likes === 1);
        done();
      });
  });
});
