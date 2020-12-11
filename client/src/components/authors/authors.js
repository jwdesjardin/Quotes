import { useContext, useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ContentContext } from '../../context/contentContext';

import AllAuthors from './allAuthors';
import UpdateAuthor from './updateAuthor';
import AddAuthor from './addAuthor';

const Authors = props => {
	const { deleteAuthor, updateAuthor, createAuthor, authors, getAuthor, getAllAuthors } = useContext(ContentContext);

	const [ updateId, setUpdateId ] = useState(0);
	const [ addAuthorDisplay, setAddAuthorDisplay ] = useState(false);

	useEffect(() => {
		getAllAuthors();
	}, []);

	return (
		<Container>
			<h1 className='mb-3'>Authors</h1>
			<Row style={{ height: '20px' }} />
			<Button onClick={() => setAddAuthorDisplay(true)}>Add Author</Button>
			<Container>
				<Row>
					<Col className='m-3'>
						<Row>
							<AllAuthors authors={authors} deleteAuthor={deleteAuthor} setUpdateId={setUpdateId} />
						</Row>
					</Col>
					<Col className='m-3'>
						{addAuthorDisplay && (
							<AddAuthor createAuthor={createAuthor} setAddAuthorDisplay={setAddAuthorDisplay} />
						)}
					</Col>
					<Col className='m-3'>
						{updateId > 0 ? (
							<UpdateAuthor
								authors={authors}
								getAuthor={getAuthor}
								updateAuthor={updateAuthor}
								setUpdateId={setUpdateId}
								id={updateId}
							/>
						) : (
							<p>Nothing to update</p>
						)}
					</Col>
				</Row>
			</Container>

			<Row style={{ height: '20px' }} />

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
