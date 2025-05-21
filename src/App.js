import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
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
import NewDevelopmentForm from "./components/NewDevelopmentform";
import CollectiveListing from "./pages/CollectiveListing";
import LuxeCollectibles from "./pages/LuxeCollectibles";
import ListedCollectibles from "./pages/ListedCollectibles";
import MagazineForm from "./components/MagazineForm";
import MansionForm from "./components/MansionForm";
import PenthouseForm from "./components/PenthouseForm";
import CollectibleForm from "./components/Collectibles";
import HomePageForm from "./components/HomePageForm";
import MansionList from "./components/MansionList";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { MansionProvider } from "./context/MansionContext";
import Admin from "./pages/Admin";
import { CollectiblesProvider } from "./context/CollectibleContext";
import IconicForm from "./pages/IconicForm";
import UserForm from "./components/Auth/UserForm";
import ScrollToTop from "./ScrollToTop";
import { CurrencyProvider } from "./context/CurrencyContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("ProtectedRoute: Checking auth state - Loading:", loading, "User:", user);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppContent() {
  const { user, loading } = useAuth();
  console.log("AppContent: Rendering routes - Loading:", loading, "User:", user);
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
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
      <Route path="/listedcollectibles" element={<ListedCollectibles />} />
      <Route path="/luxecollectibles" element={<LuxeCollectibles />} />

      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            {user && user.role === "admin" ? <Admin /> : <Navigate to="/" replace />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/userform"
        element={
          <ProtectedRoute>
            <UserForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userform/:id"
        element={
          <ProtectedRoute>
            <UserForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-post"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/magazineform"
        element={
          <ProtectedRoute>
            <MagazineForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/magazineform/:id"
        element={
          <ProtectedRoute>
            <MagazineForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mansionform"
        element={
          <ProtectedRoute>
            <MansionForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mansionform/:id"
        element={
          <ProtectedRoute>
            <MansionForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/penthouseform"
        element={
          <ProtectedRoute>
            <PenthouseForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collectiblesform"
        element={
          <ProtectedRoute>
            <CollectibleForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collectiblesform/:id"
        element={
          <ProtectedRoute>
            <CollectibleForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/homeform"
        element={
          <ProtectedRoute>
            <HomePageForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/newdevelopmentform"
        element={
          <ProtectedRoute>
            <NewDevelopmentForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/newdevelopmentform/:id"
        element={
          <ProtectedRoute>
            <NewDevelopmentForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mansionlist"
        element={
          <ProtectedRoute>
            <MansionList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/iconicform"
        element={
          <ProtectedRoute>
            <IconicForm />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <MansionProvider>
          <CurrencyProvider>
            <CollectiblesProvider>
              <ScrollToTop />
              <AppContent />
            </CollectiblesProvider>
          </CurrencyProvider>
        </MansionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;