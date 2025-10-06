import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './components/pages/Home';
import { Discover } from './components/pages/Discover';
import { EventDetail } from './components/pages/EventDetail';
import { Wishlist } from './components/pages/Wishlist';
import { Community } from './components/pages/Community';
import { Map } from './components/pages/Map';
import { Favorites } from './components/pages/Favorites';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900">
              <Header />
              <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/discover" element={<Discover />} />
                          <Route path="/event/:id" element={<EventDetail />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/community" element={<Community />} />
                          <Route path="/favorites" element={<Favorites />} />
                          <Route path="/map" element={<Map />} />
                        </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
