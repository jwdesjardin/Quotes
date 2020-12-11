import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

const AddQuoteTags = ({ quoteId, quotes, getQuote, tags, addQuoteTag, removeQuoteTag, setAddTagsDisplayId }) => {
	//get current quote
	const [ currentQuote, setCurrentQuote ] = useState({});

	useEffect(
		() => {
			(async () => {
				const quote = await getQuote(quoteId);
				setCurrentQuote(quote);
			})();
		},
		[ quotes, getQuote ]
	);

	//add listener if clicked to remove from quote then remove from this display
	const removeHandler = async e => {
		const tagName = e.target.value;
		await removeQuoteTag(quoteId, tagName);
	};

	//add listner if clicked to add to quote and then remove from this display
	const addHandler = async e => {
		const tagName = e.target.value;
		await addQuoteTag(quoteId, tagName);
	};

	const closeModule = () => {
		setAddTagsDisplayId(0);
	};

	const usedTags = currentQuote.tags || null;

	const availableTags = tags.filter(tag => !usedTags.includes(tag.name));

	return (
		<div className='border p-4'>
			<h3>Add Tag to Quote: </h3>

			{currentQuote && (
				<Container>
					<div className='border p-4'>
						<h5>Current Tags: </h5>
						{currentQuote.tags.length > 0 ? (
							currentQuote.tags.map((tag, index) => (
								<Button
									value={tag.name}
									variant={index % 2 === 0 ? 'info' : 'warning'}
									onClick={removeHandler}
								>
									{' '}
									{tag.name}
								</Button>
							))
						) : (
							''
						)}
					</div>

					<div className='border p-4'>
						<h5>Avaliable Tags: </h5>
						{availableTags.length > 0 ? (
							availableTags.map((tag, index) => (
								<Button
									value={tag.name}
									variant={index % 2 === 0 ? 'info' : 'warning'}
									onClick={addHandler}
								>
									{' '}
									{tag.name}
								</Button>
							))
						) : (
							''
						)}
					</div>
				</Container>
			)}

			<Button
				className='m-3'
				variant='secondary'
				onClick={e => {
					e.preventDefault();
					closeModule();
				}}
			>
				Close
			</Button>
		</div>
	);
};

export default AddQuoteTags;
