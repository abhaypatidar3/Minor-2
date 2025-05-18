import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Explore from "./components/Explore";
import ExploreProfile from "./components/ExploreProfile";
import ProfileReviews from "./components/ProfileReview";
import UpdateProfile from "./components/UpdateProfile";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import About from "./components/About";
import SearchBySkill from "./components/SerachBySkill";
import GetProfile from "./components/GetProfile";
import HireTalent from "./components/HireTalent";
import Project from "./components/Project";
import CreateProject from "./components/CreateProject";
import ProfileDashboard from "./components/GetProfile";
import MyProjects from "./components/MyProject";
import Hire from "./components/Hire";
import ViewOtherProfile from "./components/ViewOtherProfile";
import Request from "./components/Request";
import ProjectDetail from "./components/ProjectDetails";

export default function App() {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/exploreProfile" element={<ExploreProfile />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/profilereview" element={<ProfileReviews />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/searchbyskill" element={<SearchBySkill />} />
          <Route path="/getprofile" element={<GetProfile />} />
          <Route path="/hireme" element={<HireTalent />} />
          <Route path='/projects' element={<Project />} />
          <Route path='/createprojects' element={<CreateProject />} />
          {/* <Route path="/profile" element={<ProfileDashboard />} /> */}
          <Route path="/myproject" element={<MyProjects />} />
                     <Route path="/profile/:username" element={<ViewOtherProfile />} />

          <Route path="/hire/:username" element={<Hire />} />
          +         <Route path="/notifications" element={<Request />} />
    +       <Route path="/projects/:id" element={<ProjectDetail/>} />

          
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}
