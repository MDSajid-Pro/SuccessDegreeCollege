import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Principal from './pages/Principal'
import Contact from "./pages/Contact"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import AboutUs from "./pages/AboutUs"


const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mission" element={<AboutUs/> } />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App