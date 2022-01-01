const { NavLink, withRouter } = ReactRouterDOM;
export function AppHeader() {
  // const { booksCount } = this.state
  return (
    <header className="app-header">
      <NavLink exact to="/">
        {" "}
        <h1 className="headline">Appsus</h1>
      </NavLink>
      {/* <span>Books to show: {booksCount}</span> */}
      <nav className="main-nav">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mails</NavLink>
        <NavLink to="/note">Notes</NavLink>
        {/* <NavLink to="/book">Books</NavLink> */}
      </nav>
    </header>
  );
}