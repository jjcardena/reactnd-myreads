import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

/**
* @description Represents the main layout component and contains the book shelfs
*/
class ListBooks extends Component{
  static propTypes = {
    shelfs: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    onBookShelfUpdate: PropTypes.func.isRequired
  };

  render() {
    const { shelfs, books } = this.props;
    const filteredShelfs = shelfs.filter(shelf => shelf.value !== 'none');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {filteredShelfs.map(shelf =>
              <BookShelf key={shelf.value} shelf={shelf}
              books={books.filter(book => book.shelf===shelf.value)}
              shelfOptions={shelfs}
              onBookShelfUpdate={this.props.onBookShelfUpdate}/>
            )}
          </div>
        </div>
        <div className="open-search">
          <Link
          to="/search"
          >Add a book</Link>
        </div>
      </div>
    );
  };
}

export default ListBooks;
