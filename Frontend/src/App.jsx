import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import AdminLayout from "./layout/admin/AdminLayout";
import BookingForm from "./pages/BookingForm";
import ThankYouPage from "./pages/ThankYouPage";
import BookingDashboard from "./pages/BookingDashboard";
import Profile from "./pages/Profile";
import PersonalInfo from "./components/profileComponents/PersonalInfo";
import SecuritySettings from "./components/profileComponents/SecuritySettings";
import Preferences from "./components/profileComponents/Preferences";
import Documents from "./components/profileComponents/Documents";
import BillingInfo from "./components/profileComponents/BillingInfo";
import BookingPage from "./pages/BookingPage";
import Services from "./pages/Services";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import MyListings from "./pages/MyListings";
import Message from "./pages/Message";
import Analytics from "./pages/Analytics";
// import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
// import ViewListings from "./pages/ViewListings";
import EditListing from "./components/EditListing";
import AI_search from "./components/AI_search";
import SidebarLayot from "./components/SidebarLayout";
import UserListingsView from "./pages/UserListingsView";
import DynamicPricingApp from "./components/DynamicPricingApp";
// import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <Router>
        {" "}
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/ai-search" element={<AI_search />} />
          <Route path="/dynamic-pricing" element={<DynamicPricingApp />} />
          <Route path="/prediction" element={<SidebarLayot />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/view-listings" element={<ViewListings />} /> */}
          <Route path="/view-listings" element={<UserListingsView />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
          <Route path="/user-listing" element={<UserListingsView />} />
          <Route path="/booking-page/:id" element={<BookingPage />} />
          <Route path="/booking" element={<BookingForm />} />{" "}
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<BookingDashboard />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<PersonalInfo />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="documents" element={<Documents />} />
            <Route path="billing" element={<BillingInfo />} />
          </Route>
          {/* Listings */}
          <Route path="/listings" element={<Listings />} />
          <Route path="/myListings" element={<MyListings />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          {/* Message */}
          <Route path="/message" element={<Message />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
