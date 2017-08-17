import React, { Component } from 'react';

/**
* @description Represents a book and renders the book shelf changer control
*/
class Book extends Component {
  state = {
    shelfValue: ''
  };
  
  componentDidMount() {
    this.setState( {shelfValue : this.props.book.shelf} );
  };

  statusChange = (newShelf) => {
    this.setState({ shelfValue: newShelf });
    this.props.onBookShelfUpdate(this.props.book, newShelf);
  };
  render() {
    const { book, shelfOptions} = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelfValue} onChange={(event) => this.statusChange(event.target.value)}>
              <option value="none" disabled>Move to...</option>
              {shelfOptions.map((shelf) =>
                <option key={shelf.value} value={shelf.value}>{shelf.name}</option>
              )}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  };
}

export default Book;
