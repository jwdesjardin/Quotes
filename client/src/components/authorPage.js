import { Jumbotron, Container } from 'react-bootstrap'


const authorPage = (props) => {

    const { authors } = props;
    const id = props.match.params.id;
    console.log('author page', authors, id);

    // const author = authors.filter(x => x.id === id);
    const author = authors[id];
    console.log('author page', author);

    const { name } = author;
    const bornYear = author.bornYear || null;
    const deadYear = author.deadYear || null;
    const location = author.location || null;
    


    return (
        <Jumbotron fluid>
            <Container>
                <h1>{name}</h1>
                <p>{bornYear && deadYear && `Lived: ${bornYear}-${deadYear}`}</p>
                <p>{location && `Location: ${location}`}</p>
            </Container>
        </Jumbotron>
    );
}

export default authorPage;