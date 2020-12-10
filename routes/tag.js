var express = require('express');
var router = express.Router();
const Tag = require('../models').Tag;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

const errorHandler = (status, msg) => {
  const error = new Error(msg);
  error.status = status;
  throw error;
};

/* GET ALL  */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    // returns all tags
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  })
);

/* GET ONE  */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    // returns one tag
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (tag) {
      res.status(200).json(tag);
    } else {
      const error = new Error('The Tag could not be located');
      error.status = 404;
      throw error;
    }
  })
);

/* POST  */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    //creates and returns a tag
    const tag = await Tag.create(req.body);
    if (tag) {
      res.status(201).json(tag);
    } else {
      errorHandler(404, 'Tag could not be created');
    }
  })
);

/* UPDATE  */
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    //updates tag
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!req.body.name) {
      errorHandler(404, 'Name attribute not found');
    }
    if (tag) {
      tag.name = req.body.name;
      tag.save();
      res.status(201).json(tag);
    } else {
      errorHandler(404, 'Tag Id not found');
    }
  })
);

/* DELETE  */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    //deletes the given tag
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      await tag.destroy();
      res.status(204).json({ msg: 'Successfuly deleted Tag' });
    } else {
      const error = new Error(
        'The Tag could not be located and was not deleted'
      );
      error.status = 404;
      throw error;
    }
  })
);

module.exports = router;
