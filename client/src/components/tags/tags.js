import { Container, Button, Row, Card } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import LinkBar from '../utils/LinkBar';
import { ContentContext } from '../../context/contentContext';

const Tags = props => {
	const { deleteTag, getTag, tags } = useContext(ContentContext);

	const deleteTagHandler = async e => {
		try {
			e.preventDefault();
			const value = e.target.value;
			console.log('1', value);
			const tag = await getTag(value);
			console.log('6', tag);
			await deleteTag(tag.id);
			console.log('8');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			<h1 className='mb-3'>Tags</h1>
			<LinkBar />

			<Row style={{ height: '20px' }} />

			<Row>
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
												value={tag.name}
											>
												Delete Tag
											</Button>
											<Link to={`/update-tag/${tag.id}`}>
												<Button className='m-1' variant='info'>
													Update Tag
												</Button>
											</Link>
										</Card.Body>
									</Card>
								</li>
							);
						})}
				</ul>
			</Row>

			<Row style={{ height: '20px' }} />

			<Row>
				<Link to='/authors'>
					<Button className='m-1' variant='danger'>
						Authors
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

export default Tags;
