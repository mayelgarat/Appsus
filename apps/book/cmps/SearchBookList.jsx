export function SearchBookList({ books , onAddNewBook}) {

  return (
    <ul className="books-list">
      {books.map((book) => {
        return (
          <li key={book.id}>
            {book.volumeInfo.title}
            <button 
            onClick={()=>{onAddNewBook(book)}}
            >+</button>
          </li>
        );
      })}
    </ul>
  );
}
