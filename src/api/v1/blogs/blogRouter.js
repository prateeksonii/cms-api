const blogRouter = require('express').Router();
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require('../auth/authMiddlewares');
const {
  createBlog,
  publishBlogForReview,
  publishBlog,
} = require('./blogController');

blogRouter.post('/', isAuthenticated, isAdmin, createBlog);
blogRouter.post(
  '/publish-for-review',
  isAuthenticated,
  isAdmin,
  publishBlogForReview,
);
blogRouter.post('/publish', isAuthenticated, isSuperAdmin, publishBlog);

module.exports = blogRouter;
