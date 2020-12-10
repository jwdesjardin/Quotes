import { useContext } from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LinkBar from '../utils/LinkBar';
import { ContentContext } from '../../context/contentContext';

const Authors = props => {
	const { deleteAuthor, authors } = useContext(ContentContext);

	const deleteAuthorHandler = async e => {
		try {
			e.preventDefault();
			const value = e.target.value;
			console.log('1', value);
			await deleteAuthor(value);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			<h1 className='mb-3'>Authors</h1>
			<LinkBar />

			<Row>
				{authors.map((author, index) => {
					return (
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
								<Link to={`/update-author/${author.id}`}>
									<Button className='m-1' variant='info'>
										UpdateAuthor
									</Button>
								</Link>
								<Link to={`/authors`}>
									<Button
										className='m-1'
										value={author.id}
										onClick={deleteAuthorHandler}
										variant='danger'
									>
										Delete Author
									</Button>
								</Link>
							</Card.Body>
						</Card>
					);
				})}
			</Row>

			<Row>
				<Link to='/tags'>
					<Button className='m-1' variant='danger'>
						Tags
					</Button>
				</Link>
				<Link to='/quotes'>
					<Button className='m-1' variant='dark'>
						Quotes
					</Button>
				</Link>
			</Row>
		</Container>
	);
};

export default Authors;
