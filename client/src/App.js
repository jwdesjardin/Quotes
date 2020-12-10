import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import Authors from './components/authors/authors';
import Quotes from './components/quotes/quotes';
import Tags from './components/tags/tags';

import AddAuthor from './components/authors/addAuthor';
import AddQuote from './components/quotes/addQuote';
import AddTag from './components/tags/addTag';

import UpdateQuote from './components/quotes/updateQuote';
import UpdateTag from './components/tags/updateTag';

import AuthorPage from './components/authorPage';

import { ContentContext } from './context/contentContext';

function App() {
	const { getAllAuthors, getAllQuotes, getAllTags } = useContext(ContentContext);

	useEffect(() => {
		(async () => {
			try {
				await getAllQuotes();
				await getAllAuthors();
				await getAllTags();
				console.log('Component did mount finished.');
			} catch (error) {
				console.log(error);
			}
		})();
		// eslint-disable-next-line
	}, []);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' render={() => <Redirect to='/tags' />} />

				<Route path='/authors' render={props => <Authors {...props} />} />

				<Route path='/add-author' render={props => <AddAuthor {...props} />} />

				<Route path='/author/:id' render={props => <AuthorPage />} />

				<Route path='/quotes' render={props => <Quotes {...props} />} />

				<Route path='/add-quote' render={props => <AddQuote {...props} />} />

				<Route
					path='/update-quote/:id'
					render={props => <UpdateQuote id={props.match.params.id} history={props.history} />}
				/>

				{/* <Route path='/add-quote-tags' render={props => <AddQuoteTags currentQuote={} appTags={tags} />} /> */}

				<Route path='/tags' render={props => <Tags {...props} />} />

				<Route path='/add-tag' render={props => <AddTag {...props} />} />
				<Route path='/update-tag/:id' render={props => <UpdateTag {...props} />} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
