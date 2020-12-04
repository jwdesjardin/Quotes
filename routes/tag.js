var express = require('express');
var router = express.Router();
const Topic = require('../models').Topic;

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
    const topics = await Topic.findAll();
    res.status(200).json(topics);
}));

/* POST  */
router.post('/', asyncHandler(async (req, res) => {
//Returns the currently authenticated user
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
}));

    /* DELETE  */
router.delete('/:id', asyncHandler(async (req, res) => {

    //Deletes a course and returns no content
    const topic = await Topic.findByPk(req.params.id);
    if(topic) {
        await topic.destroy();
        res.status(204).json({ msg : "Successfuly deleted Course" });
    } else {
        const error = new Error('The Topic could not be located and was not deleted');
        error.status = 404;
        throw error;
    }
    }));


module.exports = router;