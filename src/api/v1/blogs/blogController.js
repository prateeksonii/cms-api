const httpStatus = require('http-status');
const urlSlug = require('url-slug');
const blogService = require('./blogService');

exports.createBlog = async (req, res, next) => {
  try {
    const { user } = req;
    const { title, content } = req.body;

    const slug = urlSlug(title);

    const existingBlog = await blogService.findBlogBySlug(slug);

    if (existingBlog) {
      res.status(httpStatus.CONFLICT);
      throw new Error('Blog with same slug already exists');
    }

    const blog = await blogService.createBlog(user.id, slug, title, content);

    return res.status(httpStatus.CREATED).json({
      ok: true,
      result: {
        blog,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.publishBlogForReview = async (req, res, next) => {
  try {
    const { id } = req.body;

    const blog = await blogService.findBlogById(id);

    if (!blog) {
      res.status(httpStatus.NOT_FOUND);
      throw new Error('Blog not found');
    }

    const updatedBlog = await blogService.updateBlogStatus(id, 'UNDER_REVIEW');

    return res.json({
      ok: true,
      result: {
        blog: updatedBlog,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.publishBlog = async (req, res, next) => {
  try {
    const { id } = req.body;

    const blog = await blogService.findBlogById(id);

    if (!blog) {
      res.status(httpStatus.NOT_FOUND);
      throw new Error('Blog not found');
    }

    const updatedBlog = await blogService.updateBlogStatus(id, 'PUBLISHED');

    return res.json({
      ok: true,
      result: {
        blog: updatedBlog,
      },
    });
  } catch (err) {
    return next(err);
  }
};
