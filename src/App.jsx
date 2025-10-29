import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Register from "./pages/register";
import CustomerRegister from "./pages/CustomerRegister";
import EventOrganizerRegister from "./pages/EventOrganizerRegister";
import CustomerLogin from "./pages/CustomerLogin";
import EventOrganizerLogin from "./pages/EventOrganizerLogin";
import EventOrganizerProfile from "./pages/EventOrganizerProfile";
import OrderViewPage from "./pages/OrderViewPage";
import OrdersListWithDetails from "./pages/OrderConfirmPage";
import CateringServiceList from "./pages/CateringServiceList";
import CatererProfile from "./pages/CatererProfile";
import BookCatering from "./pages/BookCatering";
import BillPage from "./pages/BillPage";
import CustomerOrders from "./pages/CustomerOrders";
import CompletedOrdersPage from "./pages/CompletedOrdersPage";
import About from './pages/About';
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerList from "./pages/CustomerList";
import EventOrganizerList from "./pages/EventOrganizerList";
import BookingList from "./pages/BookingList";
function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home.jsx" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/EventOrganizerList" element={<EventOrganizerList />} />
        <Route path="/AdminLogin.jsx" element={<AdminLogin />} />
        <Route path="/BookingList" element={<BookingList />} />
        <Route path="/AdminDashboard.jsx" element={<AdminDashboard />} />
        <Route path="/CustomerList" element={<CustomerList />} />
        <Route path="/Registerpage.jsx" element={<Register />} />
        <Route path="/CustomerRegister.jsx" element={<CustomerRegister />} />
        <Route path="/EventOrganizerRegister.jsx" element={<EventOrganizerRegister />} />
        <Route path="/CustomerLogin.jsx" element={<CustomerLogin />} />
        <Route path="/EventOrganizerLogin.jsx" element={<EventOrganizerLogin />} />
        <Route path="/EventOrganizerProfile.jsx" element={<EventOrganizerProfile />} />
        <Route path="/OrderViewPage.jsx" element={<OrderViewPage />} />
        <Route path="/OrderConfirmPage.jsx" element={<OrdersListWithDetails />} />
        <Route path="/CateringServiceList.jsx" element={<CateringServiceList />} />
        <Route path="/CatererProfile.jsx" element={<CatererProfile />} />
        <Route path="/BookCatering.jsx" element={<BookCatering />} />
        <Route path="/BillPage.jsx" element={<BillPage />} />
        <Route path="/CustomerOrders.jsx" element={<CustomerOrders />} />
        <Route path="/CompletedOrdersPage.jsx" element={<CompletedOrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
