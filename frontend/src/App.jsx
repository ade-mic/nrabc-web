import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import AboutUsPage from './pages/AboutPage';
import Ministries from './pages/Ministries';
import AuthenticationPage from './pages/AuthenticationPage';
import AdminDashboard from './admin_dashboard/AdminDashBoard';
import { AuthProvider } from './contexts/AuthContext';
import CreateArticle from './blog/pages/CreateArticle';
import PrivateRoute from './contexts/PrivateRoute';
import ArticleView from './blog/pages/ArticleView';
import FullPageArticleView from './blog/pages/FullPageArticleView';
import EditArticle from './blog/pages/EditArticle';
import AllArticles from './blog/pages/AllArticles';
import EventForm from './events/EventForm'
import EventView from './events/EventView';
import AllEvents from './events/AllEvents';
import EventCalendar from './events/EventCalendar';
import UserManagement from './admin_dashboard/UserManagement';
import './styles/App.css';

function App() {
  return (
      <Router>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/events" element={<EventCalendar />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/account" element={<AuthenticationPage />} />
              <Route path="/article/:id" element={<FullPageArticleView />} />
              <Route path="/articles" element={<AllArticles />} />
              <Route path='/events/:id' element={<EventView />} />
              
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
              <Route
                path="/user-articles"
                element={
                    <PrivateRoute>
                      <ArticleView />
                    </PrivateRoute>
                  } 
              />
              <Route 
                path="/edit-article/:id" 
                element={
                  <PrivateRoute>
                    <EditArticle />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-event"
                element={
                  <PrivateRoute>
                    <EventForm />
                  </PrivateRoute>
                }
              />
              <Route
                path='/view-event'
                element={
                  <PrivateRoute>
                    <AllEvents />
                  </PrivateRoute>
                }
              />
              <Route
                path="/events/:id/edit"
                element={
                  <PrivateRoute>
                    <EventForm />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/user-management"
                element={
                  <PrivateRoute>
                    <UserManagement />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </Router>
  );
}

export default App;
