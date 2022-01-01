import { ListFilter } from "../cmps/ListFilter.jsx";
const { Link } = ReactRouterDOM;

export class SideBar extends React.Component {
  state = {};

  render() {
    const { emails } = this.props;

    return (
      <section className="side-bar">
        <Link to={"/mail/new-mail"}>
          {" "}
          <button
            className="compose-btn"
            onClick={() => {
              this.props.onSelectedCompose();
            }}
          >
            Compose +
          </button>
        </Link>
        <ListFilter filterBy={this.props.filterBy} onGetFilterList={this.props.onGetFilterList} emails={emails} />
      </section>
      //
    );
  }
}
