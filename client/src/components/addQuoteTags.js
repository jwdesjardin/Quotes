import { Button, Badge } from 'react-bootstrap';
import axios from 'axios';

const AddQuoteTags = ({ currentQuote, history, appTags }) => {
  const { id, verse, sourceText, date, AuthorId, Tags } = currentQuote;

  const tagDeleteHandler = e => {
    e.preventDefault();
    const name = e.target.value;
    axios
      .delete(`http://localhost:5000/quote/${id}/${name}`)
      .then(res => history.push('/quotes'))
      .catch(err => console.log(err));
  };

  const tagAddHandler = e => {
    e.preventDefault();
    const name = e.target.value;
    axios
      .post(`http://localhost:5000/quote/${id}/${name}`)
      .then(res => history.push('/quotes'))
      .catch(err => console.log(err));
  };

  const values = Object.values(appTags);
  const availableTags = appTags.filter(tag => {
    return values.contains(tag) !== true;
  });

  console.log('available tags:', availableTags);

  return (
    <div>
      <h1>Add Tags to Quote</h1>
      <h3> Quote Info </h3>
      <p>Id: {id}</p>
      <p>Quote: {verse}</p>
      <p>Source: {sourceText}</p>
      <p>Date: {date}</p>
      <p>Author: {AuthorId}</p>
      <h4>
        Tags:{' '}
        {Tags.length > 0 ? (
          Tags.map((tag, index) => (
            <Badge
              key={index}
              value={tag.name}
              onClick={tagDeleteHandler}
              className='m-3'
              variant={index % 2 === 0 ? 'primary' : 'secondary'}
            >
              {tag.name}
            </Badge>
          ))
        ) : (
          'No tags attached'
        )}
      </h4>

      <h3>Tags to Add</h3>
      <div>
        <h2>
          {availableTags &&
            availableTags.map((tag, index) => (
              <Badge
                key={index}
                value={tag.name}
                onClick={tagAddHandler}
                className='m-3'
                variant={index % 2 === 0 ? 'info' : 'warning'}
              >
                {tag.name}
              </Badge>
            ))}
        </h2>
      </div>

      <Button variant='success'> </Button>
    </div>
  );
};

export default AddQuoteTags;
