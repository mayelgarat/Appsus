const { Link } = ReactRouterDOM

export function BookPreview({ book, onSelectBook }) {
  return (
    <Link to={`/book/${book.id}`}>
 
    <section className="book-details" onClick={() => onSelectBook(book)}>
      <img className="book-img" src={book.thumbnail}></img>
      <h1 className="headline"> {book.title}</h1>
      <p>
        {book.listPrice.amount}
        {book.listPrice.currencyCode === "ILS" ? (
          <i className="fas fa-shekel-sign"></i>
        ) : (
          <i className="fas fa-euro-sign"></i>
        )}
      </p>
    </section>
    </Link>
  );
}
