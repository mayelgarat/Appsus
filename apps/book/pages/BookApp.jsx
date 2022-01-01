import { bookService } from "../services/bookService.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookDetails } from "./BookDetails.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookAdd } from "../cmps/BookAdd.jsx";
import { eventBusService } from "../services/event-bus.service.js";

export class BookApp extends React.Component {
  state = {
    books: [],
    filterBy: null,
    selectedBook: null,
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    const { filterBy } = this.state;
    bookService.query(filterBy).then((books) => {
      this.setState({ books });
    });
  };

  onSelectBook = (selectedBook) => {
    this.setState({ selectedBook });
  };

  onBack = () => {
    this.setState({ selectedBook: null });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadBooks);
  };

  onAddNewBook = (book) => {
    const idx = this.state.books.findIndex((Book) => {
      return Book.id === book.id;
    });
    if (idx !== -1) return;
    bookService.addNewBook(book).then(() => {
      this.loadBooks();
      eventBusService.emit("user-msg", { txt: "Saved !", type: "success" });
    });
  };

  render() {
    const { books } = this.state;
    const { selectedBook } = this.state;
    return (
      <section className="book-app">
        {!selectedBook && (
          <React.Fragment>
            <BookFilter onSetFilter={this.onSetFilter} />
            <BookAdd onAddNewBook={this.onAddNewBook} />
            <BookList books={books} onSelectBook={this.onSelectBook} />
          </React.Fragment>
        )}
        {/* {selectedBook && (
          <BookDetails book={selectedBook} onBack={this.onBack} />
        )} */}
      </section>
    );
  }
}
