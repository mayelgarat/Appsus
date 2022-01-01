import {mailService} from '../services/mailService.js'

const { Link } = ReactRouterDOM;
export function MailDetails({ email, onSelectedEmail }) {
  return (
    <section className="mail-details">
      <Link to={"/mail"}>
        <button
          className="back-btn"
          onClick={() => {
            onSelectedEmail(null);
          }}
        >
          <i className="fas fa-arrow-circle-left"></i>
        </button>
      </Link>
      <h1 className="mail-subject">{email.subject}</h1>
      <h3 className="mail-to"><small>From: </small>{email.from}</h3>
      <h4 className="mail-to"><small>To: </small>{email.to}</h4>
      <p>{new Date(email.sentAt).toLocaleString()}</p>
      <p className="mail-body">{email.body}</p>
    </section>
  );
}
