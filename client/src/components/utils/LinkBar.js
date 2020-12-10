import { Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LinkBar = () => {
  return (
    <Row>
      <Link to='/add-author'>
        <Button className='m-1' variant='primary'>
          Add Author
        </Button>
      </Link>
      <Link to='/add-quote'>
        <Button className='m-1' variant='secondary'>
          Add Quote
        </Button>
      </Link>
      <Link to='/add-tag'>
        <Button className='m-1' variant='success'>
          Add a Tag
        </Button>
      </Link>
    </Row>
  );
};

export default LinkBar;
