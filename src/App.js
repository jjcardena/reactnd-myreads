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
    /*
      NOTES: The search from BooksAPI is limited to a particular set of search terms.
      You can find these search terms here:
      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      you don't find a specific author or title. Every search is limited by search terms.
    */
    if (!maxResults) maxResults = 10;
    if (query.trim());
    BooksAPI.search(query, maxResults).then((search) => {
        if (search.error){
          this.setState({search: []});
        }
        else {
          this.setState((state) => ({
            search: search.map((searchbook) => {
              state.books.forEach((shelfbook) => {
                if(shelfbook.id===searchbook.id)
                  searchbook = shelfbook;
              })
              return searchbook;
            })
          }));
        }
    });
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks shelfs={this.state.shelfs}
          books={this.state.books}
          onBookShelfUpdate={this.bookShelfUpdate}/>
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks shelfOptions={this.state.shelfs}
          books={this.state.search}
          onSearch={this.searchBooks}
          onBookShelfUpdate={this.bookShelfUpdate}/>
        )}/>
      </div>
    );
  };
}

export default App;
