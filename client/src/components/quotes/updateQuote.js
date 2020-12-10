import { Container, Form, Button } from 'react-bootstrap';
import { useRef, useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ContentContext } from '../../context/contentContext';

const UpdateQuote = props => {
	const { authors, quotes, updateQuote, getQuote } = useContext(ContentContext);

	const [ currentQuote, setCurrentQuote ] = useState({});

	const { id, history } = props;

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

	const quoteInputUP = useRef('');
	const sourceInputUP = useRef('');
	const yearInputUP = useRef('');
	const authorInputUP = useRef('');

	const updateHandler = async e => {
		e.preventDefault();

		const body = {
			verse: quoteInputUP.current.value,
			sourceText: sourceInputUP.current.value,
			date: yearInputUP.current.value,
			AuthorId: authorInputUP.current.value
		};

		try {
			await updateQuote(id, body);
			history.push('/quotes');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Form onSubmit={updateHandler}>
				<h3>Update Quote</h3>
				{currentQuote && (
					<Fragment>
						<Form.Group>
							<Form.Label>Id</Form.Label>
							<Form.Control type='text' defaultValue={currentQuote.id} disabled />
						</Form.Group>

						<Form.Group>
							<Form.Label>Quote</Form.Label>
							<Form.Control type='text' defaultValue={currentQuote.verse} ref={quoteInputUP} />
						</Form.Group>

						<Form.Group>
							<Form.Label>Source</Form.Label>
							<Form.Control type='text' deafultValue={currentQuote.sourceText} ref={sourceInputUP} />
						</Form.Group>

						<Form.Group>
							<Form.Label>Year</Form.Label>
							<Form.Control type='text' defaultValue={currentQuote.date} ref={yearInputUP} />
						</Form.Group>

						<Form.Group>
							<Form.Label>Author</Form.Label>
							<Form.Control as='select' ref={authorInputUP} defaultValue={currentQuote.AuthorId}>
								{authors &&
									authors.map(author => (
										<option key={author.id} value={author.id}>
											{author.name}
										</option>
									))}
							</Form.Control>
						</Form.Group>
					</Fragment>
				)}

				<Link to='/'>
					<Button className='m-3' variant='secondary'>
						Home
					</Button>
				</Link>

				<Button className='m-2' variant='primary' type='submit'>
					Update Quote
				</Button>
			</Form>
		</Container>
	);
};

export default UpdateQuote;
