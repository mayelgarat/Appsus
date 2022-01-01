import { mailService } from "../services/mailService.js";
import { MailList } from "../cmps/MailList.jsx";
import { MailDetails } from "./MailDetails.jsx";
import { SideBar } from "../pages/SideBar.jsx";
import { MailAdd } from "../pages/MailAdd.jsx";
import { UpperFilter } from "./UpperFilter.jsx";
import { eventBusService } from '../../../services/event-bus.service.js'

export class MailApp extends React.Component {
  state = {
    emails: [],
    filterBy: {
      status: "inbox",
      text: "",
      isRead: null,
      isStared: null,
      lables: null,
    },
    selectedEmail: null,
    selectedCompose: null,
  };


  componentDidMount() {

    this.loadEmails();

  }


  onSelectedEmail = (selectedEmail) => {
    this.setState({ selectedEmail });
  };

  onUnSelectedEmail = () => {
    this.setState({ selectedEmail: false });
  };


  loadEmails = () => {
    const { filterBy } = this.state;
    // console.log('filterBy in load', filterBy);
    mailService.query(filterBy).then((emails) => {
      // console.log('filterBy in load', filterBy);
      // console.log("emails in load", emails);
      this.setState({ emails });
    });
  };

  onSelectedCompose = () => {
    this.setState({ selectedCompose: true });
  };

  onUnselectedCompose = () => {
    this.setState({ selectedCompose: false });
  };

  onToggleStar = (emailId) => {
    mailService.toggleStar(emailId).then(() => {
      this.loadEmails();
    });
  };

  onToggleRead = (emailId) => {
    mailService.toggleRead(emailId).then(() => {
      this.loadEmails();
    });
  };

  onRead = (emailId) => {
    mailService.read(emailId).then(() => {
      this.loadEmails();
    });
  };

  onSetFilter = (filterBy) => {
    // console.log("filterBy on setFilter mail app", filterBy);
    this.setState(
      (prevState) => ({
        filterBy: { ...prevState.filterBy, ...filterBy },
      }),
      () => {
        this.loadEmails();
        // console.log("this.state mail app", this.state);
      }
    );
  };

  onAddMail = (email) => {
    mailService.createEmail(email).then(() => this.loadEmails());
  };

  onRemoveMail = (email) => {
    mailService.deleteEmail(email).then(() => this.loadEmails());
  };

  onMoveToTrash = (emailId) => {
    const idx = this.state.emails.findIndex((email) => email.id === emailId);
    if (this.state.emails[idx].isTrash) {
      mailService.deleteEmail(emailId).then(() => this.loadEmails());
    } else {
      mailService.moveToTrash(emailId).then(() => this.loadEmails());
    }
  };

  onGetFilterList = (field, value) => {
 
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => {
        console.log(this.state.filterBy);
        this.onSetFilter(this.state.filterBy);
      }
    );
  };

  render() {
    const { emails, selectedEmail, selectedCompose } = this.state;
    return (
      <section className="mail-app">
        <div className="main-app">
          <SideBar
            onGetFilterList={this.onGetFilterList}
            filterBy={this.state.filterBy}
            emails={emails}
            onSelectedCompose={this.onSelectedCompose}
          />
          {!selectedEmail && (
            <div className="main-container">
              {selectedCompose && (
                <MailAdd
                  onUnselectedCompose={this.onUnselectedCompose}
                  // onSelectedCompose={this.onSelectedCompose}
                  onUnSelectedEmail={this.onUnSelectedEmail}
                  onAddMail={this.onAddMail}
                />
              )}
              {!selectedCompose && (
                <React.Fragment>
                  <UpperFilter onSetFilter={this.onSetFilter} />
                  <MailList
                    emails={emails}
                    onSelectedEmail={this.onSelectedEmail}
                    onRemoveMail={this.onRemoveMail}
                    onToggleStar={this.onToggleStar}
                    onRead={this.onRead}
                    onToggleRead={this.onToggleRead}
                    onMoveToTrash={this.onMoveToTrash}
                  />
                </React.Fragment>
              )}
            </div>
          )}
          {selectedEmail && (
            <React.Fragment>
              <div className="main-container">
                <MailDetails
                  email={selectedEmail}
                  onSelectedEmail={this.onSelectedEmail}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </section>
    );
  }
}
