// import { KeepApp } from "./pages/KeepApp.jsx";
// import { NoteApp } from "./pages/NoteApp.jsx"
import { NoteApp } from "./apps/keep/pages/NoteApp.jsx"
import { MailApp } from "./apps/mail/pages/MailApp.jsx";
// import { MailDetails  } from "./apps/mail/pages/MailDetails.jsx";
import { AppHeader } from './pages/AppHeader.jsx'
import {Home} from './pages/Home.jsx'
import {About} from './pages/About.jsx'
import {Footer} from './pages/Footer.jsx'
import {UserMsg} from './apps/mail/pages/UserMsg.jsx'
import {BookApp} from './apps/book/pages/BookApp.jsx'
import {BookDetails} from './apps/book/pages/BookDetails.jsx'


const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className="app">
        {/* <UserMsg /> */}
        <AppHeader />

        <main>
          <Switch>
            {/* <Route component={BookDetails} path="/book/:bookId" /> */}
            {/* <Route component={MailDetails} path="/mail/:mailId" /> */}
            {/* <Route component={BookApp} path="/book" /> */}
            <Route component={MailApp} path="/mail" />
            {/* <Route component={MailApp} path="/mail" /> */}
            {/* <Route component={BookApp} path="/book" />
            <Route component={BookDetails} path="/book/:bookId" /> */}
            {/* <Route component={MailApp} path="/mail" /> */}
            <Route component={NoteApp} path="/note" />
            {/* <Route component={About} path="/about" /> */}
            <Route exact component={Home} path="/" />
            <Route component={About} path="/about" />
          </Switch>
        </main>
        <Footer/>
      </section>
    </Router>
  );
}