import React from 'react';
import Book from './Book';

/**
* @description Represents a single book shelf that will contain books
*/
function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book =>
            <li key={book.id}>
              <Book book={book} shelfOptions={props.shelfOptions}
              onBookShelfUpdate={props.onBookShelfUpdate}/>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
