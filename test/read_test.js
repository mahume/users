const assert = require('assert');
const User = require('../src/user');

describe('Reading users from DB', () => {
  let mike;
  let sam;
  let trey;

  beforeEach(done => {
    mike = new User({ name: 'Mike' });
    sam = new User({ name: 'Sam' });
    trey = new User({ name: 'Trey' });

    Promise.all([mike.save(), sam.save(), trey.save()]).then(() => done());
  });

  it('finds all users with a name of Mike', done => {
    User.find({ name: 'Mike' }).then(users => {
      assert(users[0]._id.toString() === mike._id.toString());
      done();
    });
  });
  it('finds a user with a particular id', done => {
    User.findOne({ _id: mike._id }).then(user => {
      assert(user.name === 'Mike');
      done();
    });
  });
  it('can skip and limit the result set', done => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === 'Sam');
        assert(users[1].name === 'Trey');
        done();
      });
  });
});
