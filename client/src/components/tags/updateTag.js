import { Row, Form, Button } from 'react-bootstrap';
import { useRef, useEffect, Fragment, useState } from 'react';

const UpdateTag = ({ updateTag, getTagById, tags, id, setUpdateId }) => {
	const [ currentTag, setCurrentTag ] = useState({});

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
				<h3>Update Tag: </h3>
				{currentTag && (
					<Fragment>
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

export default UpdateTag;
