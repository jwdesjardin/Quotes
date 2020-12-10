
import { Link } from 'react-router-dom'

const AuthorLink = (props) => {
    const { author } = props;
    return (
        <Link to={`/authors/${author.id}`}>
            <div className='authorCard'>
                <div className='img-card'> <img src='' /> </div>
                <h3>{author.firstName} {author.lastName}</h3>
                <p>Quotes: 0</p>
            </div>
        </Link>
    );
}

export default AuthorLink;