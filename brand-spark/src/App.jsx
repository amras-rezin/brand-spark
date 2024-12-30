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
import VideoGallery from './components/Admin/AddVideo/VideoGallery';
import AddClient from './components/Admin/AddClient/AddClient';
import AddClientForm from './components/Admin/AddClient/AddClientForm';
import AddServiceForm from './components/Admin/AddService/AddServiceForm';
import AddPortfolioForm from './components/Admin/AddPortfolio/AddPortfolioForm';

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
          path="/admin/clients"
          element={admin ? <AddClient /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/add-client"
          element={admin ? <AddClientForm /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/services"
          element={admin ? <AddService /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/add-service"
          element={admin ? <AddServiceForm /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/portfolio"
          element={admin ? <AddPortfolio /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/add-portfolio"
          element={admin ? <AddPortfolioForm /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/videos"
          element={admin ? <VideoGallery /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/add-video"
          element={admin ? <AddVideo /> : <Navigate to={'/admin'} />}
        />
        <Route
          path="/admin/services"
          element={
            admin ? <Navigate to={'/admin/services'} /> : <LoginPage />
          }
        />
        <Route
          path="/admin/add-service"
          element={
            admin ? <Navigate to={'/admin/add-service'} /> : <LoginPage />
          }
        />
        <Route
          path="/admin/clients"
          element={
            admin ? <Navigate to={'/admin/clients'} /> : <LoginPage />
          }
        />
        <Route
          path="/admin/add-client"
          element={
            admin ? <Navigate to={'/admin/add-client'} /> : <LoginPage />
          }
        />
        <Route
          path="/admin/portfolio"
          element={
            admin ? <Navigate to={'/admin/portfolio'} /> : <LoginPage />
          }
        />
        <Route
          path="/admin/add-portfolio"
          element={
            admin ? <Navigate to={'/admin/add-portfolio'} /> : <LoginPage />
          }
        />
        <Route
          path="/admin/videos"
          element={admin ? <Navigate to={'/admin/videos'} /> : <LoginPage />}
        />
        <Route
          path="/admin/add-video"
          element={admin ? <Navigate to={'/admin/add-video'} /> : <LoginPage />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function NotFound() {
  return (
    <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
      <div className="w-full lg:w-1/2">
        <img
          className="hidden lg:block"
          src="https://i.ibb.co/v30JLYr/Group-192-2.png"
          alt=""
        />
        <img
          className="hidden md:block lg:hidden"
          src="https://i.ibb.co/c1ggfn2/Group-193.png"
          alt=""
        />
        <img
          className="md:hidden"
          src="https://i.ibb.co/8gTVH2Y/Group-198.png"
          alt=""
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
          Looks like you've found the doorway to the great nothing
        </h1>
        <p className="py-4 text-base text-gray-800">
          The content you’re looking for doesn’t exist. Either it was removed,
          or you mistyped the link.
        </p>
        <p className="py-2 text-base text-gray-800">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <button
          onClick={() => {
            const isAdminRoute = location.pathname.startsWith('/admin');
            if(isAdminRoute) {
              window.location.href = '/admin'
            } else {
              window.location.href = '/';
            }
          }}
          className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
        >
          Go back to Homepage
        </button>
      </div>
    </div>
  );
}

export default App;
