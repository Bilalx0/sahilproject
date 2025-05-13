import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Mansions from "./pages/Mansions";
import Penthouses from "./pages/Penthouses";
import About from "./pages/About";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Magazine from "./pages/Magazine";
import BlogPage from "./pages/BlogPage";
import ListingPage from "./pages/ListingPage";
import DashboardAdmin from "./pages/DashboardAdmin";
import CreatePost from "./components/CreatePost";
import SignupSection from "./pages/SignupSection";
import NewDevelopment from "./pages/NewDevelopment";
import CollectiveListing from "./pages/CollectiveListing";
import ListedCollectibles from "./pages/ListedCollectibles";
import MagazineForm from "./components/MagazineForm";
import MansionForm from "./components/MansionForm";
import PenthouseForm from "./components/PenthouseForm";
import CollectibleForm from "./components/Collectibles";
import HomePageForm from "./components/HomePageForm";
import NewDevelopmentForm from "./components/NewDevelopmentform";
import MansionList from "./components/MansionList";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { MansionProvider } from "./context/MansionContext";
import Admin from "./pages/Admin";
import LuxeCollectibles from "./pages/LuxeCollectibles";
import { CollectiblesProvider } from "./context/CollectibleContext";
import IconicForm from "./pages/IconicForm";
import UserForm from "./components/Auth/UserForm";
import ScrollToTop from "./ScrollToTop"; // adjust path if needed

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token && token !== "";
  };

  return (
    <MansionProvider>
      <CollectiblesProvider>
        <Router>
          <ScrollToTop />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/mansions" element={<Mansions />} />
            <Route path="/penthouses" element={<Penthouses />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/magazine" element={<Magazine />} />
            <Route path="/blogpage/:id" element={<BlogPage />} />
            <Route path="/mansion/:reference" element={<ListingPage />} />
            <Route path="/signupsection" element={<SignupSection />} />
            <Route path="/newdevelopment" element={<NewDevelopment />} />
            <Route path="/collectivelisting" element={<CollectiveListing />} />
            <Route path="/listedcollectibles" element={<LuxeCollectibles />} />

            <Route path="/userform" element={<UserForm />} />
            <Route path="/userform/:id" element={<UserForm />} />

            {/* Form Routes */}
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/magazineform" element={<MagazineForm />} />
            <Route path="/magazineform/:id" element={<MagazineForm />} />
            <Route path="/mansionform" element={<MansionForm />} />
            <Route path="/mansionform/:id" element={<MansionForm />} />
            <Route path="/penthouseform" element={<PenthouseForm />} />
            <Route path="/collectiblesform" element={<CollectibleForm />} />
            <Route path="/collectiblesform/:id" element={<CollectibleForm />} />
            <Route path="/homeform" element={<HomePageForm />} />
            <Route
              path="/new-developmentform"
              element={<NewDevelopmentForm />}
            />
            <Route path="/mansionlist" element={<MansionList />} />
            <Route
              path="/newdevelopmentform"
              element={<NewDevelopmentForm />}
            />
            <Route
              path="/newdevelopmentform/:id"
              element={<NewDevelopmentForm />}
            />
            <Route path="/iconicform" element={<IconicForm />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated() ? (
                  <DashboardAdmin />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin"
              element={isAuthenticated() ? <Admin /> : <Navigate to="/login" />}
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CollectiblesProvider>
    </MansionProvider>
  );
}

export default App;
