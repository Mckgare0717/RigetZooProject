
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import Education from './pages/educational/education';
import Planmytrip from './pages/planmytrip/Planmytrip';
import AboutUs from './pages/aboutus/About';
import Profile from './pages/Profile/Profile';
import NavBar from './components/Navbar/NavBar';
import BookingForm from './pages/bookings/bookingForm';
import { Sitemap } from './components/sitemap/SiteMap';
import { LoginForm } from './pages/auth/login/loginForm';
import { Register } from './pages/auth/register/registerForm';
import HotelBook from './pages/bookings/hotelBookings/HotelBook';
import { PrivacyPolicy } from './pages/PrivacyPolicy/PrvacyPolicy';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function App() {
  const tokenAuth = localStorage.getItem("token")
  

  
  return (
    
    <div className="App">
    
      <header>
      <NavBar/>
      </header>
      {/* all this below code are routes to different pages */}
      <Routes>
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/" element={<HomePage />} /> 
        <Route exact path="/education" element={<Education />} />
        <Route path="/plan" element={<Planmytrip/>}/>  
        <Route path="/loginAuth" element={<LoginForm/>}/>
        <Route path="/regAuth" element={<Register/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/hotelBook" element={tokenAuth?<HotelBook/>: <Navigate to="/loginAuth"/>}/>
        <Route path='/booking' element={tokenAuth?<BookingForm/>: <Navigate to="/loginAuth"/>}/>
        <Route path="/profile" element={tokenAuth? <Profile/>: <Navigate to="/loginAuth"/>}/> 
      </Routes>
    <footer>
      <Sitemap />
    </footer>
    
    </div>
  );
}

export default App;
