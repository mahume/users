const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', done => {
    const mike = new User({ name: 'Mike' });
    mike.save().then(() => {
      // Has Mike been saved successfully?
      assert(!mike.isNew);
      done();
    });
  });
});
