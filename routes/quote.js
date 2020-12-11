var express = require('express');
const { sequelize } = require('../models');
var router = express.Router();
const Quote = require('../models').Quote;
const Tag = require('../models').Tag;
const QuoteTags = require('../models').QuoteTags;
const { Op } = sequelize;

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

/* get quotes */
router.get(
	'/',
	asyncHandler(async (req, res) => {
		//returns all quotes
		const quotes = await Quote.findAll({
			include: [
				{
					model: Tag,
					attributes: {
						exclude: [ 'id', 'createdAt', 'updatedAt', 'QuoteTags' ]
					}
				}
			]
		});
		res.status(200).json(quotes);
	})
);

/* GET ONE  */
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		// returns one tag
		const { id } = req.params;
		const quote = await Quote.findByPk(id);
		if (quote) {
			res.status(200).json(quote);
		} else {
			errorHandler(404, 'The Quote Id could not be found');
		}
	})
);

/* create quote */
router.post(
	'/',
	asyncHandler(async (req, res) => {
		//creates and returns a quote
		const quote = await Quote.create(req.body);
		res.status(201).json(quote);
	})
);

/* UPDATE  */
router.put(
	'/:id',
	asyncHandler(async (req, res) => {
		//updates tag
		const { id } = req.params;
		const quote = await Quote.findByPk(id);
		if (!req.body) {
			errorHandler(404, 'Request Body not found');
		}
		if (quote) {
			await quote.update(req.body);
			res.status(201).json(quote);
		} else {
			errorHandler(404, 'Tag Id not found');
		}
	})
);

// add tag to quote
router.post(
	'/:id/:tagName',
	asyncHandler(async (req, res) => {
		const { id, tagName } = req.params;
		const quote = await Quote.findByPk(id);
		const tag = await Tag.findOne({ where: { name: tagName } });
		console.log('quote and tag', quote, tag);
		quote.addTag(tag);
		quote.save();
		res.status(201).json(quote);
	})
);

// remove a tag from quote
router.delete(
	'/:id/:tagName',
	asyncHandler(async (req, res) => {
		const { id, tagName } = req.params;
		const quote = await Quote.findByPk(id);
		const tag = await Tag.findOne({ where: { name: tagName } });
		if (quote && tag) {
			const check = await quote.hasTag(tag);
			if (check) {
				await quote.removeTag(tag);
			}
		}
		// 202 - accepted
		res.status(202).json();
	})
);

/* delete quote */
router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		//deletes the quote given
		const quote = await Quote.findByPk(req.params.id);
		if (quote) {
			await quote.destroy();
			res.status(204).json({ msg: 'Successfuly deleted Course' });
		} else {
			const error = new Error('The Quote could not be located and was not deleted');
			error.status = 404;
			throw error;
		}
	})
);

module.exports = router;
