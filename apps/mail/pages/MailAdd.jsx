const { Link } = ReactRouterDOM;

export class MailAdd extends React.Component {
  state = {
    email: {
      to: "",
      subject: "",
      body: "",
    },
    isDraft: null,
  };


  // draftInterval;

  // componentDidMount() {
  //   this.draftInterval = setInterval(this.onSaveToDraft, 5000);
        
  //           if (mail) this.setDraftInfo(mail)
        
  //     }

  // componentWillUnmount() {
  //     clearInterval(this.draftInterval);

  // }

  // setDraftInfo = (mail) => {
  //     this.setState({ email: { to: mail.to, subject: mail.subject, body: mail.body}, isDraft: true })
  // }


  // onSaveToDraft = () => {
  //     if (!this.state.isDraft) {
  //         mailService.createDraft(this.state.email)
  //             .then(this.setState((prevState) => ({ ...prevState, email: { ...prevState.email}, isDraft: true })))
  //     }
  //     else mailService.saveToDraft(this.state.email, this.state.email);
  // }




  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value : target.value;
    this.setState((prevState) => ({
      email: { ...prevState.email, [field]: value },
    }));
  };

  onSubmit = (ev) => {
    this.props.onUnselectedCompose();
    this.props.onAddMail(this.state.email);
    eventBusService.emit("user-msg", { txt: "Saved !", type: "success" });
    this.props.history.push('/mail');

  };

  onDelete = (ev) => {
    ev.preventDefault();
    this.props.onUnselectedCompose();
  };

  render() {
    const { subject, body } = this.state.email;
    const { noteToSent } = this.props;

    return (
      <section className="mail-add">
        <h1 className="new-msg-headline">New Message </h1>
        <form id="form">
          <div className="to-container">
            <label htmlFor="to">To:</label>
            <input
              className="to-input"
              type="text"
              name="to"
              id="to"
              onChange={this.handleChange}
              required
            ></input>
          </div>
          <div className="sub-container">
            <label htmlFor="subject">Subject:</label>
            <input
              className="subject-input"
              type="text"
              name="subject"
              id="subject"
              value={noteToSent ? noteToSent.subject : subject}
              onChange={this.handleChange}
            ></input>
          </div>
          <textarea
            name="body"
            value={noteToSent ? noteToSent.body : body}
            onChange={this.handleChange}
          ></textarea>
          <div className="btn-container">
            <Link to={"/mail"}>
              <button className="save-btn-mail-add" onClick={this.onSubmit}>
                Send
              </button>
            </Link>
            <Link to={"/mail"}>
              <button className="delete-btn-add-mail" onClick={this.onDelete}>
                <i className="fas fa-trash"></i>
              </button>
            </Link>
          </div>
        </form>
      </section>
    );
  }
}
