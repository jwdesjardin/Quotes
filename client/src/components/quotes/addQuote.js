import { Container, Form, Button } from 'react-bootstrap';
import { useRef } from 'react';

const AddQuote = ({ createQuote, setAddQuoteDisplay, authors }) => {
	const quoteInput = useRef('');
	const sourceInput = useRef('');
	const yearInput = useRef('');
	const authorInput = useRef('');

	const createHandler = async e => {
		e.preventDefault();

		const body = {
			verse: quoteInput.current.value,
			sourceText: sourceInput.current.value,
			date: yearInput.current.value,
			AuthorId: authorInput.current.value
		};

		try {
			await createQuote(body);
			closeModule();
		} catch (err) {
			console.log(err);
		}
	};

	const closeModule = () => {
		setAddQuoteDisplay(false);
	};

	return (
		<Container>
			<Form onSubmit={createHandler}>
				<h3>Add Quote</h3>
				<Form.Group>
					<Form.Label>Quote</Form.Label>
					<Form.Control type='text' placeholder='Text Here...' ref={quoteInput} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Source</Form.Label>
					<Form.Control type='text' placeholder='Speech, Movie, Book ...' ref={sourceInput} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Year</Form.Label>
					<Form.Control type='text' placeholder='' ref={yearInput} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Author</Form.Label>
					<Form.Control as='select' ref={authorInput} defaultValue='Select One'>
						<option disabled>Select One</option>
						{authors &&
							authors.map(author => (
								<option key={author.id} value={author.id}>
									{author.name}
								</option>
							))}
					</Form.Control>
				</Form.Group>

				<Button className='m-2' variant='primary' type='submit'>
					Create Quote
				</Button>
			</Form>

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
		</Container>
	);
};

export default AddQuote;
