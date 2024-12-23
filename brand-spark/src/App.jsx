import Home from './pages/Home/Home';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import ContactForm from './pages/Contact/ContactPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import TeamPage from './pages/About/TeamPage';
import ServicesCards from './components/Service/ServicesCards';
import Portfolio from './pages/Portfolio/Portfolio';
import LoginPage from './pages/Admin/LoginPage';
import AdminDashboards from './pages/Admin/AdminDashboard';
import { useSelector } from 'react-redux';
import AddService from './components/Admin/AddService/AddService';
import AddPortfolio from './components/Admin/AddPortfolio/AddPortfolio';
import AddVideo from './components/Admin/AddVideo/AddVideo';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const admin = useSelector((store) => store.admin.loggedIn);

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<TeamPage />} />
        <Route path="/services" element={<ServicesCards />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route
          path="/admin"
          element={admin ? <Navigate to={'/admin/dashboard'} /> : <LoginPage />}
        />
        <Route
          path="/admin/dashboard"
          element={admin ? <AdminDashboards /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/add-service"
          element={admin ? <AddService /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/add-portfolio"
          element={admin ? <AddPortfolio /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/add-video"
          element={admin ? <AddVideo /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/add-service"
          element={admin ? <Navigate to={'/admin/dashboard'} /> : <LoginPage />}
        />
        <Route
          path="/admin/add-portfolio"
          element={admin ? <Navigate to={'/admin/dashboard'} /> : <LoginPage />}
        />
        <Route
          path="/admin/add-video"
          element={admin ? <Navigate to={'/admin/dashboard'} /> : <LoginPage />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
    </div>
  );
}

export default App;
