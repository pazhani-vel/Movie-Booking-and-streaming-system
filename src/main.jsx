import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TicketBookingPage from "./pages/TicketBookingPage";
import BookingPage from "./pages/BookingPage";
import LanguagePage from "./pages/LanguagePage";
import TheatrePage from "./pages/TheatrePage";
import ShowTimingPage from "./pages/ShowTimingPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Signup from "./pages/signup";
import Login_user from "./pages/Login_user/login_user.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import MyBookings from "./pages/Mybookingpage.jsx";
import Home from "./pages/Home/Home.jsx";
import Playerpage from "./pages/Playerpage/Playerpage.jsx";
import Login_admin from "./pages/Login_admin/login_admin.jsx";
import Admin_MoviePage from "./Admin_page/Admin_Home.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <UserProvider>
    <Routes>
  <Route path="/admin_login" element={<Login_admin/>}/>
  <Route path="/admin_home" element={<Admin_MoviePage/>}/>
  <Route path="/get/:id" element={<Playerpage/>}/>
  <Route path="/home" element={<Home/>} />
  <Route path="/" element={<Login_user/>} />
  <Route path="/mybookingpage" element={<MyBookings/>}/>
  <Route path="/signup" element={<Signup/>} />
  <Route path="/TicketBookingpage" element={<TicketBookingPage />} />
  <Route path="/booking/:movieId" element={<BookingPage />} />
  <Route path="/language/:movieId" element={<LanguagePage />} />
  <Route path="/theatres/:movieId/:city/:lang" element={<TheatrePage />} />
  <Route path="/showtiming/:movieId/:city/:lang/:theaterName" element={<ShowTimingPage />} />
  <Route path="/seatselection/:movieId/:city/:lang/:theaterName/:timing" element={<SeatSelectionPage />} />
  <Route path="/bookingconfirmation" element={<BookingConfirmationPage />} />
</Routes>
  </UserProvider>
  </BrowserRouter>
);
