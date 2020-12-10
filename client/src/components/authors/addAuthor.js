import { Container, Form, Button } from 'react-bootstrap';
import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../../context/contentContext';

const AddAuthor = props => {
	const nameInput = useRef('');
	const locationInput = useRef('');
	const bornInput = useRef('');
	const deadInput = useRef('');

	const { createAuthor } = useContext(ContentContext);

	const submitHandler = async e => {
		e.preventDefault();

		const body = {
			name: nameInput.current.value,
			location: locationInput.current.value,
			bornYear: bornInput.current.value,
			deadYear: deadInput.current.value
		};

		try {
			await createAuthor(body);
			props.history.push('/authors');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			<h1>Add Author</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control type='text' placeholder='Marcus Aurelius' ref={nameInput} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Location</Form.Label>
					<Form.Control type='text' placeholder='Rome' ref={locationInput} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Born</Form.Label>
					<Form.Control type='text' placeholder='500 B.C.' ref={bornInput} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Died</Form.Label>
					<Form.Control type='text' placeholder='576 B.C.' ref={deadInput} />
				</Form.Group>

				<Button className='m-2' variant='primary' type='submit'>
					Create Author
				</Button>
			</Form>
			<Link to='/'>
				<Button className='m-3' variant='secondary'>
					Home
				</Button>
			</Link>
		</Container>
	);
};

export default AddAuthor;
