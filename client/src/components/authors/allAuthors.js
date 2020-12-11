import { Card, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AllAuthors = ({ authors, deleteAuthor, setUpdateId }) => {
	const deleteAuthorHandler = async e => {
		try {
			e.preventDefault();
			const value = e.target.value;
			await deleteAuthor(value);
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
				<h3>All Authors: </h3>
				<ul>
					{authors &&
						authors.map((author, index) => {
							return (
								<li key={index}>
									<Card style={{ width: '18rem' }} key={index} className='m-3'>
										<Card.Img variant='top' src='https://picsum.photos/110/50' />
										<Card.Body>
											<Card.Title>{author.name}</Card.Title>
											<Card.Text>Quotes</Card.Text>
											<Link to={`/authors/${index}`}>
												<Button className='m-1' variant='success'>
													See Quotes
												</Button>
											</Link>

											<Button
												className='m-1'
												variant='info'
												onClick={toggleUpdate}
												value={author.id}
											>
												UpdateAuthor
											</Button>

											<Button
												className='m-1'
												value={author.id}
												onClick={deleteAuthorHandler}
												variant='danger'
											>
												Delete Author
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

export default AllAuthors;
