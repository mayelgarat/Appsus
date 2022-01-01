import { Books } from "./books.js";
import { storageService } from "./storageService.js";
import { utilService } from "./util.service.js";

const KEY = "bookDB";

export const bookService = {
  query,
  getBookById,
  saveReview,
  removeReview,
  GoogleSearchApi,
  addNewBook,
  getNextBookId,
  getPrevBookId
};

_createBooks();

function query(filterBy = null) {
  const books = _loadBooksFromStorage();
  if (!filterBy) return Promise.resolve(books);
  const filteredBooks = _getFilteredBooks(books, filterBy);
  return Promise.resolve(filteredBooks);
}

function saveReview(bookId, reviewToSave) {
  const books = _loadBooksFromStorage();
  const book = books.find((book) => book.id === bookId);
  const review = _createReview(reviewToSave);
  console.log("book", book);
  book.reviews.unshift(review);
  _saveBooksToStorage(books);
  return Promise.resolve();
}

function GoogleSearchApi(value) {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%${value}`
    )
    .then((res) => {
      return res.data;
    });
}

function removeReview(bookId, reviewId) {
  let books = _loadBooksFromStorage();
  let book = books.find((book) => book.id === bookId);
  const bookIdx = books.findIndex((book) => book.id === bookId);
  const newReviews = book.reviews.filter((review) => review.id !== reviewId);
  book.reviews = newReviews;
  books[bookIdx] = book;
  _saveBooksToStorage(books);
  return Promise.resolve();
}

function getBookById(bookId) {
  const books = _loadBooksFromStorage();
  var book = books.find((book) => {
    return bookId === book.id;
  });
  return Promise.resolve(book);
}

function _createReview(reviewToSave) {
  return {
    id: utilService.makeId(),
    ...reviewToSave,
  };
}
function _createBooks() {
  var books = _loadBooksFromStorage();
  if (!books || !books.length) {
    books = Books.getBooks();
    _saveBooksToStorage(books);
  }
  return books;
}

function addNewBook(book) {
  const books = _loadBooksFromStorage();

  books.unshift({
    id: book.id,
    title: book.volumeInfo.title,
    subtitle: book.volumeInfo.subtitle,
    authors: book.volumeInfo.authors,
    description:
      "himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus",
    publishedDate: book.volumeInfo.publishedDate,
    thumbnail: book.volumeInfo.imageLinks.thumbnail,
    language: book.volumeInfo.language,
    categories: book.volumeInfo.categories,
    pageCount: book.volumeInfo.pageCount,
    listPrice: {
      amount: utilService.getRandomIntInclusive(20, 180),
      currencyCode: "ILS",
      isOnSale: false,
    },
    reviews: [],
  });
  _saveBooksToStorage(books);
  return Promise.resolve();
}

function getNextBookId(bookId) {
  const books = _loadBooksFromStorage();
  const bookIdx = books.findIndex((book) => book.id === bookId);
  let nextBookIdx = bookIdx + 1;
  if (nextBookIdx === books.length) nextBookIdx = 0;
  return books[nextBookIdx].id;
}
function getPrevBookId(bookId) {
  const books = _loadBooksFromStorage();
  const bookIdx = books.findIndex((book) => book.id === bookId);
  let prevBookIdx = bookIdx - 1;
  if (prevBookIdx === -1) prevBookIdx = books.length-1;
  return books[prevBookIdx].id;
}

function _getFilteredBooks(books, filterBy) {
  let { title, minPrice, maxPrice } = filterBy;
  minPrice = minPrice ? minPrice : 0;
  maxPrice = maxPrice ? maxPrice : Infinity;
  return books.filter((book) => {
    return (
      book.title.includes(title) &&
      book.listPrice.amount >= minPrice &&
      book.listPrice.amount <= maxPrice
    );
  });
}

function _saveBooksToStorage(books) {
  storageService.saveToStorage(KEY, books);
}

function _loadBooksFromStorage() {
  return storageService.loadFromStorage(KEY);
}
