// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Explore from './components/Explore';
import ExploreProfile from './components/ExploreProfile';
import UpdateProfile from './components/UpdateProfile';
import ProfileReview from './components/ProfileReview';

const App = () => {
  return (
    <>
      <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/exploreProfile" element={<ExploreProfile />} />  
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/profilereview" element={<ProfileReview />} />
      </Routes>
    </Router>

      <Footer />
    </>
  );
};

export default App;
