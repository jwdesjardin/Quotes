import React, { useState } from 'react';
import axios from 'axios';

export const ContentContext = React.createContext();

export const Provider = props => {
	const [ authors, setAuthors ] = useState([]);
	const [ quotes, setQuotes ] = useState([]);
	const [ tags, setTags ] = useState([]);

	const getAllAuthors = async () => {
		try {
			const { data } = await axios.get('http://localhost:5000/author');
			console.log('setting authors', data);
			setAuthors(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getAllTags = async () => {
		try {
			const { data } = await axios.get('http://localhost:5000/tag');
			console.log('setting tags', data);
			setTags(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getAllQuotes = async () => {
		try {
			const { data } = await axios.get('http://localhost:5000/quote');
			console.log('setting quotes', data);
			setQuotes(data);
		} catch (error) {
			console.log(error);
		}
	};

	const createTag = async body => {
		// update db
		try {
			const { data } = await axios.post('http://localhost:5000/tag', body);
			// update state
			setTags([ ...tags, data ]);
		} catch (error) {
			console.log(error);
		}
	};

	const updateTag = async (id, body) => {
		// update db
		try {
			const { data } = await axios.put(`http://localhost:5000/tag/${id}`, body);
			// update state
			const workingState = [ ...tags ];
			const filteredTags = workingState.filter(tag => tag.id !== parseInt(id));
			setTags([ ...filteredTags, data ]);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTag = async id => {
		// update db
		await axios
			.delete(`http://localhost:5000/tag/${id}`)
			.then(({ data }) => {
				// update state
				const workingState = [ ...tags ];
				const result = workingState.filter(tag => tag.id !== id);
				console.log('7', 'setting new tags', result, tags);
				setTags([ ...result ]);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const getTag = async name => {
		try {
			const workingState = [ ...tags ];
			const tag = workingState.find(tag => tag.name === name);
			const id = tag.id;
			const { data } = await axios.get(`http://localhost:5000/tag/${id}`);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const getTagById = async id => {
		try {
			const { data } = await axios.get(`http://localhost:5000/tag/${id}`);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const createQuote = async body => {
		// update db
		axios
			.post('http://localhost:5000/quote', body)
			.then(({ data }) => {
				// update state
				setQuotes([ ...quotes, data ]);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const updateQuote = async (id, body) => {
		// update db
		axios
			.put(`http://localhost:5000/quote/${id}`, body)
			.then(({ data }) => {
				// update state
				const workingState = [ ...quotes ];
				const filteredQuotes = workingState.filter(quote => quote.id !== id);
				setQuotes([ ...filteredQuotes, data ]);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const deleteQuote = async id => {
		// update db
		await axios
			.delete(`http://localhost:5000/quote/${id}`)
			.then(({ data }) => {
				// update state
				const workingState = [ ...quotes ];
				console.log('quotes', workingState);
				console.log('id', id);
				const filteredQuotes = workingState.filter(quote => quote.id !== parseInt(id));
				console.log('new quotes', filteredQuotes);
				setQuotes([ ...filteredQuotes ]);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const getQuote = async id => {
		try {
			const { data } = await axios.get(`http://localhost:5000/quote/${id}`);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const createAuthor = async body => {
		// update db
		axios
			.post('http://localhost:5000/author', body)
			.then(({ data }) => {
				// update state
				setAuthors([ ...authors, data ]);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const updateAuthor = async (id, body) => {
		// update db
		axios
			.put(`http://localhost:5000/author/${id}`, body)
			.then(({ data }) => {
				// update state
				const workingState = [ ...authors ];
				const filteredAuthors = workingState.filter(author => author.id !== id);
				setAuthors([ ...filteredAuthors, data ]);
			})
			.catch(err => {
				console.log(err);
			});
	};
	const deleteAuthor = async id => {
		// update db
		await axios
			.delete(`http://localhost:5000/author/${id}`)
			.then(({ data }) => {
				// update state
				const workingAuthors = [ ...authors ];
				const result = workingAuthors.filter(author => author.id !== parseInt(id));
				setAuthors([ ...result ]);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const getAuthor = async id => {
		axios
			.get(`http://localhost:5000/author/${id}`)
			.then(({ data }) => {
				return data;
			})
			.catch(err => {
				console.log(err);
			});
	};

	const value = {
		authors,
		quotes,
		tags,
		getAllAuthors,
		getAuthor,
		createAuthor,
		updateAuthor,
		deleteAuthor,
		getAllQuotes,
		getQuote,
		createQuote,
		updateQuote,
		deleteQuote,
		getAllTags,
		getTag,
		getTagById,
		createTag,
		updateTag,
		deleteTag
	};

	return <ContentContext.Provider value={value}>{props.children}</ContentContext.Provider>;
};
