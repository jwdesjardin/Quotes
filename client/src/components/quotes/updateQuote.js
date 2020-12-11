import { Row, Form, Button } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';

const UpdateQuote = ({ updateQuote, getQuote, quotes, id, setUpdateId, authors }) => {
	const [ currentQuote, setCurrentQuote ] = useState({});

	useEffect(
		() => {
			(async () => {
				try {
					const quote = await getQuote(id);
					setCurrentQuote(quote);
				} catch (error) {
					console.log(error);
				}
			})();
		},
		[ quotes, getQuote, id ]
	);

	const quoteInput = useRef('');
	const sourceInput = useRef('');
	const yearInput = useRef('');
	const authorInput = useRef(0);

	const updateHandler = async e => {
		e.preventDefault();

		const body = {
			verse: quoteInput.current.value,
			sourceText: sourceInput.current.value,
			date: yearInput.current.value,
			AuthorId: authorInput.current.value
		};

		try {
			await updateQuote(id, body);
			closeModule();
		} catch (error) {
			console.log(error);
		}
	};

	const closeModule = () => {
		setUpdateId(0);
	};

	return (
		<Row>
			<div className='border p-4'>
				<h3>Update Quote: </h3>

				{currentQuote && (
					<Form onSubmit={updateHandler}>
						<Form.Group>
							<Form.Label>Id</Form.Label>
							<Form.Control type='text' defaultValue={currentQuote.id} disabled />
						</Form.Group>

						<Form.Group>
							<Form.Label>Quote</Form.Label>
							<Form.Control type='text' defaultValue={currentQuote.verse} ref={quoteInput} />
						</Form.Group>

						<Form.Group>
							<Form.Label>Source</Form.Label>
							<Form.Control type='text' deafultValue={currentQuote.sourceText} ref={sourceInput} />
						</Form.Group>

						<Form.Group>
							<Form.Label>Year</Form.Label>
							<Form.Control type='text' defaultValue={currentQuote.date} ref={yearInput} />
						</Form.Group>

						<Form.Group>
							<Form.Label>Author</Form.Label>
							<Form.Control as='select' ref={authorInput} defaultValue={currentQuote.AuthorId}>
								{authors &&
									authors.map(author => (
										<option key={author.id} value={author.id}>
											{author.name}
										</option>
									))}
							</Form.Control>
						</Form.Group>

						<Button className='m-2' variant='primary' type='submit' onClick={updateHandler}>
							Update Quote
						</Button>
					</Form>
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
		</Row>
	);
};

export default UpdateQuote;
