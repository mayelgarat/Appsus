import { storageService } from "../services/storageService.js";
import { bookService } from "../services/bookService.js"
import { StarRating } from '../cmps/StarRating.jsx';

export class ReviewAdd extends React.Component {
  state = {
    review: {
      fullName: "Reader Name",
      date: this.defaultDate,
      bookReview: "",
      rate: 1,
    },
  };

  componentDidMount() {
    this.state.savedReviews = storageService.loadFromStorage("reviewDB");
    console.log("this.state.savedReviews", this.state.savedReviews);
    if (!this.state.savedReviews) this.setState({ savedReviews: [] });
  }

  get defaultDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const currDate = `${year}-${month}-${day}`;
    return currDate;
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value : target.value;
    this.setState((prevState) => ({
      review: { ...prevState.review, [field]: value },
    }));
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    const { review } = this.state;
    const { bookId } = this.props;
    bookService.saveReview(bookId, review).then(this.props.loadBook);
    this.props.onToggleReviewModal();
  };

  render() {
    const {
      review: { fullName, date, bookReview, rate },
    } = this.state;
    const { savedReviews } = this.state;
    return (
      <section className="review-add">
        <div className="review-modal">
          <h1>Add review</h1>
          <button
            className="btn-toggle-modal"
            onClick={() => this.props.onToggleReviewModal()}
          >
            ×
          </button>
          <form className="review-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Reader name"
              name="fullName"
              id="by-fullname"
              autoComplete="off"
              value={fullName}
              onChange={this.handleChange}
            ></input>
            <StarRating handleChange={this.handleChange} rate={rate} />
            <label className="form-date" htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={this.handleChange}
            ></input>
            <textarea
              placeholder="free text"
              name="bookReview"
              rows="4"
              cols="40"
              value={bookReview}
              onChange={this.handleChange}
            ></textarea>
            <button onSubmit={this.onSubmit}>Add Review</button>
          </form>
        </div>
      </section>
    );
  }
}
