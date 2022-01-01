import { BookApp } from "./pages/BookApp.jsx";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { BookDetails } from "./pages/BookDetails.jsx";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx"

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function BKApp() {
  return (
    <Router>
      <section className="app">
        <UserMsg/>
        <AppHeader />
        <main>
          <Switch>
            <Route component={BookDetails} path="/book/:bookId" />
            <Route component={BookApp} path="/book" />

          </Switch>
        </main>
      </section>
    </Router>
  );
}
