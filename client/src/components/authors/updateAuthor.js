import { Row, Form, Button } from 'react-bootstrap';
import { useRef, useEffect, Fragment, useState } from 'react';

const UpdateAuthor = ({ updateAuthor, getAuthor, authors, id, setUpdateId }) => {
	const [ currentAuthor, setCurrentAuthor ] = useState({});

	useEffect(
		() => {
			(async () => {
				const author = await getAuthor(id);
				console.log(author.authorData);
				setCurrentAuthor(author.authorData);
				// console.log(currentAuthor);
			})();
		},
		[ authors, getAuthor, id ]
	);

	const nameInput = useRef('');
	const locationInput = useRef('');
	const bornInput = useRef('');
	const deadInput = useRef('');

	const updateHandler = async e => {
		e.preventDefault();

		const body = {
			name: nameInput.current.value,
			location: locationInput.current.value,
			bornYear: bornInput.current.value,
			deadYear: deadInput.current.value
		};

		try {
			await updateAuthor(id, body);
			closeModule();
		} catch (err) {
			console.log(err);
		}
	};

	const closeModule = () => {
		setUpdateId(0);
	};

	return (
		<Row>
			<div className='border p-4'>
				<h3>Update Author: </h3>
				{currentAuthor && (
					<Fragment>
						<Form onSubmit={updateHandler}>
							<Form.Group>
								<Form.Label>Id</Form.Label>
								<Form.Control type='text' defaultValue={currentAuthor.id} disabled />
							</Form.Group>

							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control type='text' defaultValue={currentAuthor.name} ref={nameInput} />
							</Form.Group>

							<Form.Group>
								<Form.Label>Location</Form.Label>
								<Form.Control type='text' defaultValue={currentAuthor.location} ref={locationInput} />
							</Form.Group>

							<Form.Group>
								<Form.Label>Born</Form.Label>
								<Form.Control type='text' defaultValue={currentAuthor.bornYear} ref={bornInput} />
							</Form.Group>

							<Form.Group>
								<Form.Label>Died</Form.Label>
								<Form.Control type='text' defaultValue={currentAuthor.deadYear} ref={deadInput} />
							</Form.Group>

							<Button className='m-2' variant='primary' type='submit'>
								Update Author
							</Button>
						</Form>
					</Fragment>
				)}

				<Button
					className='m-2'
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

export default UpdateAuthor;
