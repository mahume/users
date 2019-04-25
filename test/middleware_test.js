const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let mike;
  let blogPost;
  beforeEach(done => {
    mike = new User({ name: 'Mike' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yes it is' });

    mike.blogPosts.push(blogPost);

    Promise.all([mike.save(), blogPost.save()]).then(() => done());
  });
  it('users clean up dangling blogposts on remove', done => {
    mike
      .remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
