var express = require('express');
var router = express.Router();
const Author = require('../models').Author;

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

/* GET  */
router.get(
	'/',
	asyncHandler(async (req, res) => {
		//returns all authors
		const authors = await Author.findAll();
		res.status(200).json(authors);
	})
);

// Get one
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const author = await Author.findByPk(id);
		if (author) {
			const quoteCount = await author.countQuotes();
			res.status(200).json({
				authorData: author,
				quoteCount
			});
		} else {
			errorHandler(404, 'The Author Id could not be found');
		}
	})
);

router.get(
	'/:id/quotes',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const author = await Author.findByPk(id);
		const quotes = await author.getQuotes();
		res.status(200).json({
			name: author.name,
			quotes
		});
	})
);

/* POST  */
router.post(
	'/',
	asyncHandler(async (req, res) => {
		//creates an author and returns it
		const author = await Author.create(req.body);
		res.status(201).json(author);
	})
);

/* UPDATE  */
router.put(
	'/:id',
	asyncHandler(async (req, res) => {
		//updates tag
		const { id } = req.params;
		const author = await Author.findByPk(id);
		if (!req.body) {
			errorHandler(404, 'Request Body not found');
		}
		if (author) {
			await author.update(req.body);
			res.status(201).json(author);
		} else {
			errorHandler(404, 'Author Id not found');
		}
	})
);

/* DELETE  */
router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		//deletes the given author
		const author = await Author.findByPk(req.params.id);
		if (author) {
			await author.destroy();
			res.status(204).json({ msg: 'Successfuly deleted Author' });
		} else {
			const error = new Error('The Author could not be located and was not deleted');
			error.status = 404;
			throw error;
		}
	})
);

module.exports = router;
