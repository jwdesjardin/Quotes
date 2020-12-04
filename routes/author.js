var express = require('express');
var router = express.Router();
const Author = require('../models').Author;

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
}

/* GET  */
router.get('/', asyncHandler(async (req, res) => {
//Returns the currently authenticated user
    const authors = await Author.findAll();
    res.status(200).json(authors);
}));

/* POST  */
router.post('/', asyncHandler(async (req, res) => {
//Returns the currently authenticated user
    const author = await Author.create(req.body);
    res.status(201).json(author);
}));

    /* DELETE  */
router.delete('/:id', asyncHandler(async (req, res) => {

    //Deletes a course and returns no content
    const author = await Author.findByPk(req.params.id);
    if(author) {
        await author.destroy();
        res.status(204).json({ msg : "Successfuly deleted Author" });
    } else {
        const error = new Error('The Author could not be located and was not deleted');
        error.status = 404;
        throw error;
    }
    }));


module.exports = router;