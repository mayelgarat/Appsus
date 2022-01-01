import { LongText } from "../cmps/LongText.jsx";
import { bookService } from "../services/bookService.js";
import { ReviewAdd } from "../cmps/ReviewAdd.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";

const { Link } = ReactRouterDOM;

export class BookDetails extends React.Component {
  state = {
    book: null,
    isLongTxtShown: false,
    isShowReviewModal: false,
  };

  componentDidMount() {
    this.loadBook();
    this.isLong();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook();
    }
  }

  loadBook = () => {
    const { bookId } = this.props.match.params;
    bookService.getBookById(bookId).then((book) => {
      if (!book) return this.props.history.push("/");
      this.setState({ book });
    });
  };
  isLong = () => {
    if (!this.state.book) return;
    if (this.state.book.description.length > 100)
      this.setState({ isLongTxtShown: true });
  };

  get readingLength() {
    if (this.state.book.pageCount > 500) return "Long Reading";
    else if (this.state.book.pageCount > 200) return "Decent Reading";
    else if (this.state.book.pageCount < 100) return "Light Reading";
  }

  get publishedDate() {
    const currYear = new Date(Date.now()).getFullYear();
    const publishedText =
      currYear - this.state.book.publishedDate > 1 ? "Veteran Book" : "New!";
    return publishedText;
  }

  get priceColor() {
    const price = this.state.book.listPrice.amount;
    let classNameByPrice;
    if (price > 150) {
      classNameByPrice = "red";
    } else if (price < 20) {
      classNameByPrice = "green";
    }
    return classNameByPrice;
  }

  get isOnSale() {
    var salePosition = this.state.book.listPrice.isOnSale ? "block" : "none";
    return salePosition;
  }

  get readMoreClass() {
    const readMore =
      this.state.book.description.length <= 100 ? "none" : "block";
    return readMore;
  }

  onGoBack = () => {
    this.props.history.push("/book");
  };

  onToggleReviewModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isShowReviewModal: !this.state.isShowReviewModal,
    }));
  };

  onRemoveReview = (reviewId) => {
    const bookId = this.state.book.id;
    bookService.removeReview(bookId, reviewId).then(this.loadBook);
  };

  showStars = (countStar) => {
    return [...Array(5)].map((star, idx) => (
      <span key={idx} className={"star " + (idx < countStar ? "on" : "off")}>
        &#9733;
      </span>
    ));
  };

  render() {
    if (!this.state.book) return <div>Loading...</div>;
    return (
      <section className="details">
        <Link
          className="primary-btn clean-link"
          to={`/book/${bookService.getPrevBookId(this.state.book.id)}`}
        >
          Previous book
        </Link>
        <div className="container-img">
          <img className="details-img" src={this.state.book.thumbnail}></img>
          <img className={this.isOnSale} src="./img/sale.jpg"></img>
        </div>
        <div className="details-container">
          <h1 className="headline"> {this.state.book.title}</h1>
          <p>
            <span>Authors:</span> {this.state.book.authors}
          </p>
          <p>{this.state.book.subtitle}</p>
          <LongText
            text={this.state.book.description}
            isLongTxtShown={
              this.state.book.description.length > 100 ? true : false
            }
          />
          <p>
            <span>Published Date:</span> {this.state.book.publishedDate}
            {", "} {this.publishedDate}
          </p>

          <p>
            <span>Page Count: </span>
            {this.state.book.pageCount}
            {", "}
            {this.readingLength}
          </p>

          <p className={this.priceColor}>
            Price:
            {this.state.book.listPrice.amount}
            {this.state.book.listPrice.currencyCode === "ILS" ? (
              <i className="fas fa-shekel-sign"></i>
            ) : (
              <i className="fas fa-euro-sign"></i>
            )}
          </p>
          <button onClick={this.onToggleReviewModal}>Add review</button>
          {this.state.isShowReviewModal && (
            <ReviewAdd
              bookId={this.state.book.id}
              loadBook={this.loadBook}
              onToggleReviewModal={this.onToggleReviewModal}
            />
          )}
          <button onClick={this.onGoBack}>Go back</button>
          <div className="review-container"></div>
          <ReviewList
            reviews={this.state.book.reviews}
            showStars={this.showStars}
            onRemoveReview={this.onRemoveReview}
          ></ReviewList>
        </div>

          <Link
            className="primary-btn clean-link"
            to={`/book/${bookService.getNextBookId(this.state.book.id)}`}
          >
            Next book
          </Link>
      </section>
    );
  }
}
