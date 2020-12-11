import { Card, Button, Row } from 'react-bootstrap';

const AllQuotes = ({ quotes, deleteQuote, setUpdateId }) => {
	const deleteQuoteHandler = async e => {
		try {
			e.preventDefault();
			const value = e.target.value;
			await deleteQuote(value);
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

										<Button className='m-1' variant='info' onClick={toggleUpdate} value={quote.id}>
											Update Quote
										</Button>
									</Card.Body>
								</Card>
							</li>
						);
					})}
			</ul>
		</Row>
	);
};

export default AllQuotes;
