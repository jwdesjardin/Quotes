import { Container, Button, Row, Card } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../../context/contentContext';

import AllTags from './allTags';
import UpdateTag from './updateTag';
import AddTag from './addTag';

const Tags = props => {
	const { deleteTag, updateTag, createTag, tags, getTagById, getAllTags } = useContext(ContentContext);

	const [ updateId, setUpdateId ] = useState(0);
	const [ addTagDisplay, setAddTagDisplay ] = useState(false);

	useEffect(() => {
		getAllTags();
	}, []);

	return (
		<Container>
			<h1 className='mb-3'>Tags</h1>
			<Button onClick={() => setAddTagDisplay(true)}>Add Tag</Button>

			<Row style={{ height: '20px' }} />

			<AllTags deleteTag={deleteTag} tags={tags} setUpdateId={setUpdateId} />

			<Row style={{ height: '20px' }} />

			{updateId > 0 ? (
				<UpdateTag
					tags={tags}
					getTagById={getTagById}
					updateTag={updateTag}
					setUpdateId={setUpdateId}
					id={updateId}
				/>
			) : (
				<p>Nothing to update</p>
			)}

			<Row style={{ height: '20px' }} />

			{addTagDisplay && <AddTag createTag={createTag} setAddTagDisplay={setAddTagDisplay} />}

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
