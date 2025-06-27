import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Principal from './pages/Principal'
import Contact from "./pages/Contact"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import AboutUs from "./pages/AboutUs"
import GalleriesPage from "./pages/GalleriesPage"
import Login from "./components/admin/Login"
import FeeStructure from "./pages/FeeStructure"
import Faculty from "./pages/Faculty"


const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mission" element={<AboutUs />} />
        <Route path="/galleries" element={<GalleriesPage />} />
        <Route path="/fee-structure" element={<FeeStructure />} />
        <Route path="/faculty" element={ <Faculty/>} />
        <Route path="/admin" element={<Login />}>
          
        </Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App