import { Container, Form, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const AddTag = ({ createTag, setAddTagDisplay }) => {
	const tagInput = useRef('');

	const submitHandler = async e => {
		e.preventDefault();

		const body = {
			name: tagInput.current.value
		};

		try {
			await createTag(body);
		} catch (error) {
			console.log(error);
		}
	};

	const closeModule = e => {
		e.preventDefault();
		setAddTagDisplay(false);
	};

	return (
		<Container>
			<h1>Add Tag</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label>Tag</Form.Label>
					<Form.Control type='text' placeholder='e.g. funny' ref={tagInput} />
				</Form.Group>

				<Button className='m-2' variant='primary' type='submit'>
					Create Tag
				</Button>
			</Form>
			<Button className='m-2' variant='secondary' onClick={closeModule}>
				Close
			</Button>
		</Container>
	);
};

export default AddTag;
