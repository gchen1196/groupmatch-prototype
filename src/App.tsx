import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { DiscoverPage } from './pages/DiscoverPage';
import { MatchesPage } from './pages/MatchesPage';
import './App.css';

// Mocked current user group (as per PRD: prototype uses mocked session)
const CURRENT_GROUP_ID = '11111111-1111-1111-1111-111111111111';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="app__nav">
          <NavLink to="/" end className="app__nav-link">
            Discover
          </NavLink>
          <NavLink to="/matches" className="app__nav-link">
            Matches
          </NavLink>
        </nav>

        <main className="app__main">
          <Routes>
            <Route
              path="/"
              element={<DiscoverPage currentGroupId={CURRENT_GROUP_ID} />}
            />
            <Route
              path="/matches"
              element={<MatchesPage currentGroupId={CURRENT_GROUP_ID} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
