import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

/**
* @description Represents the myReads app, manages state and comunication with books API
*/
class App extends React.Component {
  state = {
    books : [],
    shelfs : [],
    search: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
    this.setState({ shelfs: BooksAPI.getAllShelfs() });
  };

  bookShelfUpdate = (bookToUpdate, shelf)  => {
    BooksAPI.update(bookToUpdate, shelf).then(() => {
        bookToUpdate.shelf = shelf;
        this.setState((state) => ({
          books : state.books.filter(book => book.id!==bookToUpdate.id).concat(bookToUpdate)
        }));
    });
  }
  searchBooks = (query, maxResults) => {
    if (!maxResults) maxResults = 10;
    if (query.trim());
    BooksAPI.search(query, maxResults).then((search) => {
        this.setState({ search });
    });
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks shelfs={this.state.shelfs}
          books={this.state.search}
          onSearch={this.searchBooks}
          onBookShelfUpdate={this.bookShelfUpdate}/>
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks shelfs={this.state.shelfs}
          books={this.state.books}
          onBookShelfUpdate={this.bookShelfUpdate}/>
        )}/>
      </div>
    );
  };
}

export default App;