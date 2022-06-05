const db = require('../../../db');

module.exports = {
  createBlog: (userId, slug, title, content) =>
    db.blog.create({
      data: {
        slug,
        title,
        content,
        userId,
      },
    }),
  findBlogById: (id) =>
    db.blog.findFirst({
      where: { id },
    }),
  findBlogBySlug: (slug) =>
    db.blog.findFirst({
      where: {
        slug,
      },
    }),
  updateBlogStatus: (id, status) =>
    db.blog.update({
      where: {
        id,
      },
      data: {
        status,
      },
    }),
};
