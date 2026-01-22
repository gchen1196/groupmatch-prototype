import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import { Header } from './components/Header';
import { DiscoverPage } from './pages/DiscoverPage';
import { MatchesPage } from './pages/MatchesPage';
import { TEST_GROUPS } from './data/testGroups';

function App() {
  const [currentGroupId, setCurrentGroupId] = useState(TEST_GROUPS[0].id);

  const handleGroupChange = (value: string) => {
    setCurrentGroupId(value);
    // Clear cached queries when switching groups
    queryClient.clear();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-secondary/50">
          <Header
            groups={TEST_GROUPS}
            currentGroupId={currentGroupId}
            onGroupChange={handleGroupChange}
          />

          <main>
            <Routes>
              <Route
                path="/"
                element={<DiscoverPage currentGroupId={currentGroupId} />}
              />
              <Route
                path="/matches"
                element={<MatchesPage currentGroupId={currentGroupId} />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
