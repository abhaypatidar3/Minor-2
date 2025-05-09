import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Explore from './components/Explore';
import ExploreProfile from './components/ExploreProfile';
import ProfileReviews from './components/ProfileReview';
import UpdateProfile from './components/UpdateProfile';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import About from './components/About';

export default function App() {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/register"       element={<Register />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/explore"        element={<Explore />} />
          <Route path="/exploreProfile" element={<ExploreProfile />} />
          <Route path="/updateProfile"  element={<UpdateProfile />} />
          <Route path="/profilereview"  element={<ProfileReviews />} />
          <Route path="/footer"  element={<Footer />} />
          <Route path="/contactus"  element={<ContactUs />} />
          <Route path="/faq"  element={<FAQ />} />
           <Route path="/about"  element={<About />} />
        </Routes>

      </main>

      <Footer />
    </Router>
  );
}
