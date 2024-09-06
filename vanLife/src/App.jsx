import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Vans from './pages/Vans/Vans'
import "./server"
import VanDetails from './pages/Vans/VanDetail'
import Layout from './components/Layout'
import Dashboard from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/reviews'
import HostLayout from './components/HostLayout'
import HostVans from './pages/Host/HostVans'
import HostVanDetails from './pages/Host/HostVanDetail'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import NotFoundPage from './pages/NotFoundPage'
import Login from './login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetails />} />
          <Route
            path="login"
            element={<Login />}
          />

          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:id" element={<HostVanDetails />} >
              <Route index element={<HostVanInfo/>} />
              <Route path="pricing" element={<HostVanPricing/>} />
              <Route path="photos" element={<HostVanPhotos/>} />
            </Route>
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
