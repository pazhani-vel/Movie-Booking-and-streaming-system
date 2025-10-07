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
import Login from "./pages/login";
import { UserProvider } from "./context/UserContext.jsx";
import MyBookings from "./pages/Mybookingpage.jsx";
import Home from "./pages/Home/Home.jsx";
import Playerpage from "./pages/Playerpage/Playerpage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <UserProvider>
    <Routes>
  <Route path="/get/:id" element={<Playerpage/>}/>
  <Route path="/home" element={<Home/>} />
  <Route path="/" element={<Login/>} />
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
