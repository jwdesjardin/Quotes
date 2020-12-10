import { useContext } from 'react';
import { Card, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LinkBar from '../utils/LinkBar';
import { ContentContext } from '../../context/contentContext';

const Quotes = props => {
	const { quotes, deleteQuote } = useContext(ContentContext);

	const deleteQuoteHandler = async e => {
		try {
			e.preventDefault();
			const value = e.target.value;
			console.log('1', value);
			await deleteQuote(value);
			console.log('3');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			<LinkBar />

			<Row style={{ height: '20px' }} />

			<Row>
				<ul>
					{quotes &&
						quotes.map((quote, index) => {
							return (
								<li key={index}>
									<Card style={{ width: '18rem' }}>
										<Card.Body>
											<Card.Text>
												{quote.verse}
												{quote.sourceText && `- ${quote.sourceText}`}
												{quote.date && `- ${quote.date}`}
											</Card.Text>
											<Button
												onClick={deleteQuoteHandler}
												className='m-1'
												variant={'danger'}
												value={quote.id}
											>
												Delete Quote
											</Button>
											<Link to={`/update-quote/${quote.id}`}>
												<Button className='m-1' variant={'info'} value={quote.id}>
													Update Quote
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
