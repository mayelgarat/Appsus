import { bookService } from "../services/bookService.js"
import { SearchBookList } from "../cmps/SearchBookList.jsx";

export class BookAdd extends React.Component {
  state = {
    inputValue: "",
    foundBooks: [],
  };

  handleChange = ({ target }) => {
    const inputValue = target.value;
    this.setState({ inputValue });
  };
  
  onSubmit = (ev) => {
    ev.preventDefault();
    const data = bookService.GoogleSearchApi(this.state.inputValue);
    data.then((data) => {
      const booksFromSearch = data.items;
      this.setState({ foundBooks: booksFromSearch }, () => {
        console.log("this.state.foundBooks", this.state.foundBooks);
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input
          className="search-input"
            type="text"
            placeholder="Search for a book"
            name="book-name"
            id="book-name"
            onChange={this.handleChange}
          ></input>
          <button>Search</button>
        </form>
        <SearchBookList books={this.state.foundBooks} onAddNewBook={this.props.onAddNewBook}/>
      </React.Fragment>
    );
  }
}
