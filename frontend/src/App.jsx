import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Principal from './pages/Principal'
import Contact from "./pages/Contact"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import AboutUs from "./pages/AboutUs"
import GalleriesPage from "./pages/GalleriesPage"
import Login from "./components/admin/Login"
import Layout from "./pages/admin/Layout"
import Faculty from "./pages/Faculty"
import AdmissionForm from "./pages/AdmissionForm"
import { Toaster } from "react-hot-toast"
import {useAppContext} from './context/AppContext'
import Dashboard from "./pages/admin/Dashboard"
import NewsletterAdmin from "./pages/admin/NewsletterAdmin"

const App = () => {

  const { token } = useAppContext();

  return (
    <>
      <Toaster/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mission" element={<AboutUs />} />
        <Route path="/galleries" element={<GalleriesPage />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/admission" element={<AdmissionForm/>} />
        <Route path="/admin" element={token ? <Layout/> :<Login />}>
          <Route index element={<Dashboard />} />
          <Route path="newsletter" element={ <NewsletterAdmin/> } />
        </Route>
      </Routes>
      {token ? null : <Footer/>}
    </>
  )
}

export default App