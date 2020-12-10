import { Container, Alert, Card, Form, Button, Row, Col } from 'react-bootstrap';

const LearnBootstrap = () => {
	return (
		<div className='App'>
			<header className='App-header'>
				<Container>
					<Alert variant='danger'>Yo this is a huge alert</Alert>

					<Form>
						<Row>
							<Col md>
								<Form.Group conrtolId='formEmail'>
									<Form.Label>Email Address</Form.Label>
									<Form.Control type='email' placeholder='Example@gmail.com' />
									<Form.Text className='text-muted'>
										We'll never share your email adress, trust us!
									</Form.Text>
								</Form.Group>
							</Col>
							<Col md>
								<Form.Group conrtolId='formPassword'>
									<Form.Label>Password</Form.Label>
									<Form.Control type='email' placeholder='password' />
								</Form.Group>
							</Col>
						</Row>
						<Button variant='secondary'>submit</Button>
					</Form>

					<Card className='mb-3' style={{ color: '#000' }}>
						<Card.Img src='https://picsum.photos/110/50' />
						<Card.Body>
							<Card.Title> Card Example</Card.Title>
							<Card.Text>This is an example of react-bootstrap cards</Card.Text>
						</Card.Body>
						<Button className='m-3' variant='secondary'>
							Click Here
						</Button>
					</Card>
				</Container>
			</header>
		</div>
	);
};

export default LearnBootstrap;

//  <h1>Quotes</h1>
// 			<Form>
// 				<Form.Group>
// 					<Form.Label>Option</Form.Label>
// 					<Form.Control as='select' ref={optionInput} onChange={changeHandler}>
// 						<option key='0' value='new'>
// 							New
// 						</option>
// 						{quotes &&
// 							quotes.map(quote => (
// 								<option key={quote.id} value={quote.id}>
// 									{quote.id}
// 								</option>
// 							))}
// 					</Form.Control>
// 				</Form.Group>
// 			</Form>

// const optionInput = useRef('');

// 	const changeHandler = e => {
// 		e.preventDefault();
// 		const text = optionInput.current.value;
// 		if (text === 'new') {
// 			setCurrentQuote({});
// 		} else {
// 			const index = parseInt(text);
// 			const quote = quotes[index];
// 			setCurrentQuote(quote);
// 			console.log(currentQuote);
// 		}
// 	};
