import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Vans from './pages/Vans/Vans'
import "./server"
import VanDetail from './pages/Vans/VanDetail'
import Layout from './components/Layout'
import Dashboard from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/reviews'
import HostLayout from './components/HostLayout'
import HostVans from './pages/Host/HostVans'
import HostVanDetail from './pages/Host/HostVanDetail'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import NotFoundPage from './pages/NotFoundPage'
import Login from './login'
import AuthenticationRequired from './AuthenticationRequired'
import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('loggedin') === 'true';
  });

  function handleLogInStatus() {
    setIsLoggedIn(true);
  }

  function handleLogOutStatus() {
    setIsLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} handleLogOutStatus={handleLogOutStatus} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route path="login" element={<Login isLoggedIn={isLoggedIn} handleLogInStatus={handleLogInStatus} />} />

          <Route element={<AuthenticationRequired />}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
