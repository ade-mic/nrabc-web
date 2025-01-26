import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import EventsCalendarPage from './pages/EventsCalenderPage';
import AboutUsPage from './pages/AboutPage';
import Ministries from './pages/Ministries';
import AuthenticationPage from './pages/AuthenticationPage';
import AdminDashboard from './pages/AdminDashBoard';
import { AuthProvider } from './contexts/AuthContext';
import CreateArticle from './blog/pages/CreateArticle';
import PrivateRoute from './contexts/PrivateRoute';

import './styles/App.css';

function App() {
  return (
    <MantineProvider>
      <Router>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/events" element={<EventsCalendarPage />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/account" element={<AuthenticationPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/admin" 
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/create-article" 
                element={
                  <PrivateRoute>
                    <CreateArticle />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}

export default App;
