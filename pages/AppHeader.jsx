const { NavLink, withRouter } = ReactRouterDOM;
export class AppHeader extends React.Component {
  state = {
    isClicked: null,
  };

  render() {
    const { isClick } = this.state;
    return (
      <header className="app-header">
        <NavLink exact to="/">
          {" "}
          <h1 className="headline">Appsus</h1>
        </NavLink>
        <button
          className="burger"
          onClick={() => {
            this.setState(
              { isClick: !isClick },
              console.log(this.state.isClicked)
            );
          }}
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* <span>Books to show: {booksCount}</span> */}
        {isClick && (
          <div className="main-nav">
            <div>
              <NavLink exact to="/">
                <button><i className="fas fa-home"></i></button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/about">
                {" "}
                <button><i className="fas fa-address-card"></i></button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/mail">
                <button><i className="fas fa-at"></i></button>
              </NavLink>
            </div>
            <div>
              <NavLink to="/note">
                <button><i className="far fa-sticky-note"></i></button>
              </NavLink>
            </div>
          </div>
        )}
      </header>
    );
  }
}
