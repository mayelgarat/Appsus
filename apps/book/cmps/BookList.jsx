
import {BookPreview} from './BookPreview.jsx'
export function BookList({ books, onSelectBook }) {
  return (
    <section className="book-list">
        
      {books.map(book => <BookPreview key={book.id} book={book} onSelectBook={onSelectBook} />)}
    </section>
  );
}
