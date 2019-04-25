const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let mike;
  let blogPost;
  let comment;

  beforeEach(done => {
    mike = new User({ name: 'Mike' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yes it is' });
    comment = new Comment({ content: 'Congrats on great post' });

    mike.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = mike;

    Promise.all([mike.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Mike' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });
  it('saves a full relation graph', done => {
    User.findOne({ name: 'Mike' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user',
          },
        },
      })
      .then(user => {
        assert(user.name === 'Mike');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(
          user.blogPosts[0].comments[0].content === 'Congrats on great post'
        );
        assert(user.blogPosts[0].comments[0].user.name === 'Mike');
        done();
      });
  });
});
