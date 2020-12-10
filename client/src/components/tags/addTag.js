import { Container , Form, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

 const AddTag = (props) => {

    const tagInput = useRef('');

    const submitHandler = (e) => {
        e.preventDefault();
        
        const body = {
            name: tagInput.current.value
        };

        //sumbit new user to db
        Axios.post('http://localhost:5000/tag', body)
        .then(({data}) => {
            console.log(data);
            props.history.push('/tags');
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        }) 
    }

    return (
        <Container>
            <h1>Add Tag</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group >
                    <Form.Label>Tag</Form.Label>
                    <Form.Control type='text' placeholder='e.g. funny' ref={tagInput} />
                </Form.Group>

                <Button className='m-2' variant='primary' type='submit' >Create Tag</Button>
            </Form>
            <Link to='/'><Button className='m-2' variant='secondary' >Home</Button></Link>
        </Container>  
    );
 }

 export default AddTag;