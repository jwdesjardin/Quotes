import { Button, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AllTags = ({ tags, deleteTag, setUpdateId }) => {
	const deleteTagHandler = async e => {
		try {
			e.preventDefault();
			const id = e.target.value;
			console.log('deleting', id);
			await deleteTag(id);
		} catch (err) {
			console.log(err);
		}
	};

	const toggleUpdate = e => {
		const id = e.target.value;
		setUpdateId(id);
	};

	return (
		<Row>
			<div className='border p-4'>
				<h3>All Tags: </h3>
				<ul>
					{tags &&
						tags.map((tag, index) => {
							return (
								<li key={index}>
									<Card style={{ width: '18rem' }}>
										<Card.Body>
											<Card.Title className='m-3'>{tag.name}</Card.Title>
											<Button
												className='m-1'
												onClick={deleteTagHandler}
												variant={'danger'}
												value={tag.id}
											>
												Delete Tag
											</Button>

											<Button
												className='m-1'
												variant='info'
												onClick={toggleUpdate}
												value={tag.id}
											>
												Update Tag
											</Button>
										</Card.Body>
									</Card>
								</li>
							);
						})}
				</ul>
			</div>
		</Row>
	);
};

export default AllTags;
