import { Container, Form, Button } from 'react-bootstrap';
import { useRef, useEffect, Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../../context/contentContext';

const UpdateTag = props => {
	const { updateTag, getTagById, tags } = useContext(ContentContext);

	const [ currentTag, setCurrentTag ] = useState({});

	const { id } = props.match.params;

	useEffect(
		() => {
			(async () => {
				const tag = await getTagById(id);
				setCurrentTag(tag);
			})();
		},
		[ tags, getTagById, id ]
	);

	const tagInput = useRef('');

	const updateHandler = async e => {
		e.preventDefault();

		const body = {
			name: tagInput.current.value
		};

		try {
			await updateTag(id, body);
			props.history.push('/tags');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			{currentTag && (
				<Fragment>
					<h1>Update Tag</h1>
					<Form onSubmit={updateHandler}>
						<Form.Group>
							<Form.Label>Id</Form.Label>
							<Form.Control type='text' defaultValue={currentTag.id} disabled />
						</Form.Group>

						<Form.Group>
							<Form.Label>Tag</Form.Label>
							<Form.Control type='text' defaultValue={currentTag.name} ref={tagInput} />
						</Form.Group>

						<Button className='m-2' variant='primary' type='submit'>
							Update Tag
						</Button>
					</Form>
				</Fragment>
			)}
			<Link to='/'>
				<Button className='m-2' variant='secondary'>
					Home
				</Button>
			</Link>
		</Container>
	);
};

export default UpdateTag;
