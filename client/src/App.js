import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import Authors from './components/authors/authors';
import Quotes from './components/quotes/quotes';
import Tags from './components/tags/tags';

import AddQuote from './components/quotes/addQuote';

import UpdateQuote from './components/quotes/updateQuote';

import { ContentContext } from './context/contentContext';

function App() {
	// useEffect(
	// 	() => {
	// 		(async () => {
	// 			try {
	// 				await getAllQuotes();
	// 				await getAllAuthors();
	// 				await getAllTags();
	// 				console.log('Component did mount finished.');
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 		})();
	// 	},
	// 	[ tags, authors, quotes ]
	// );

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' render={() => <Redirect to='/tags' />} />

				<Route path='/authors' render={props => <Authors {...props} />} />

				<Route path='/quotes' render={props => <Quotes {...props} />} />

				<Route path='/add-quote' render={props => <AddQuote {...props} />} />

				<Route
					path='/update-quote/:id'
					render={props => <UpdateQuote id={props.match.params.id} history={props.history} />}
				/>

				{/* <Route path='/add-quote-tags' render={props => <AddQuoteTags currentQuote={} appTags={tags} />} /> */}

				<Route path='/tags' render={props => <Tags {...props} />} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
