import { useContext, useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ContentContext } from '../../context/contentContext';

import UpdateQuote from './updateQuote';
import AllQuotes from './allQuotes';
import AddQuote from './addQuote';

const Quotes = props => {
	const {
		quotes,
		authors,
		getAllAuthors,
		deleteQuote,
		updateQuote,
		getQuote,
		getAllQuotes,
		createQuote
	} = useContext(ContentContext);

	const [ updateId, setUpdateId ] = useState(0);
	const [ addQuoteDisplay, setAddQuoteDisplay ] = useState(false);

	useEffect(() => {
		getAllQuotes();
		getAllAuthors();
	}, []);

	return (
		<Container>
			<h1 className='mb-3'>Quotes</h1>
			<Row style={{ height: '20px' }} />
			<Button onClick={() => setAddQuoteDisplay(true)}>Add Quote</Button>
			<Container>
				<Row>
					<Col className='m-3'>
						<Row>
							<AllQuotes deleteQuote={deleteQuote} quotes={quotes} setUpdateId={setUpdateId} />
						</Row>
					</Col>

					<Col className='m-3'>
						{addQuoteDisplay && (
							<AddQuote
								createQuote={createQuote}
								setAddQuoteDisplay={setAddQuoteDisplay}
								authors={authors}
							/>
						)}
					</Col>

					<Col className='m-3'>
						{updateId > 0 ? (
							<UpdateQuote
								quotes={quotes}
								getQuote={getQuote}
								updateQuote={updateQuote}
								setUpdateId={setUpdateId}
								id={updateId}
								authors={authors}
							/>
						) : (
							<p>Nothing to update</p>
						)}
					</Col>
				</Row>
			</Container>

			<Row style={{ height: '20px' }} />

			<Link to='/authors'>
				<Button className='m-1' variant='danger'>
					Authors
				</Button>
			</Link>

			<Link to='/tags'>
				<Button className='m-1' variant='dark'>
					Tags
				</Button>
			</Link>
		</Container>
	);
};

export default Quotes;
