import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

/**
* @description Represents book searcher feature
*/
class SearchBooks extends Component {
  state = {
    query: ''
  };

  timer = null;

  componentDidMount() {
    if(this.state.query.trim()!=='')
      this.props.onSearch(this.state.query);
  };

  updateQuery = (query) => {
    this.setState({ query: query });
    clearTimeout(this.timer);
    if(query.trim()!=='')
      this.timer = window.setTimeout(() => this.props.onSearch(query),500);
  };

  render () {
    let booksResult = this.props.books;
    let errorOnResult = false;
    if(booksResult.length === 0)
      errorOnResult = true;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {!errorOnResult && booksResult.map((book) =>
              <li key={book.id}>
                <Book book={book} shelfOptions={this.props.shelfOptions}
                onBookShelfUpdate={this.props.onBookShelfUpdate}/>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  };
}

export default SearchBooks;
