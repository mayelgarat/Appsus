import { MailSentDate } from "./MailSentDate.jsx";
import { mailService } from "../services/mailService.js";
const { Link } = ReactRouterDOM;

export class MailPreview extends React.Component {
  state = {
    isStar: null,
    isRead: null,
  };

  componentDidMount() {
    this.setState({
      isStar: this.props.email.isStar,
      isRead: this.props.email.isRead,
    });
  }

  render() {
    const { email } = this.props;
    const { onSelectedEmail } = this.props;
    const { isRead } = this.state;
    return (
      <section className="mail-preview clean-link">
        <button
          className={this.state.isStar ? "star" : "unstar"}
          onClick={() => {
            this.setState({ isStar: !this.state.isStar });
            this.props.onToggleStar(email.id);
          }}
        >
          <i className="fas fa-star"></i>{" "}
        </button>

        <Link to={`/mail/${email.id}`}>
          <div
            className="content"
            className={this.state.isRead ? "read" : "unread"}
            onClick={() => {
              console.log(isRead);
              onSelectedEmail(email);
              this.setState({ isRead: true });
              this.props.onRead(email.id);
              // }
            }}
          >
            <div className="from">{email.from}</div>
            <div className="subject">{email.subject}</div>
            <div className="body">{email.body.substring(0, 80)}...</div>
            <div className="date">
              <MailSentDate date={this.props.email.sentAt} />
            </div>
          </div>
        </Link>
        <div className="btn-hover">
          <button
            className="read-btn-hover"
            onClick={() => {
              this.setState({ isRead: !this.state.isRead });
              this.props.onToggleRead(email.id);
            }}
          >
            {this.state.isRead ? (
              <i className="fas fa-envelope-open"></i>
            ) : (
              <i className="fas fa-envelope"></i>
            )}
          </button>
          <button
            className="delete-btn-hover"
            onClick={() => {
              this.props.onMoveToTrash(email.id);
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </section>
    );
  }
}
