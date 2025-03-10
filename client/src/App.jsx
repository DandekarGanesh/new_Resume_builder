import { BrowserRouter , Route, Routes } from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'

function App() {

  return (
    <>
       <BrowserRouter>
           <HomeLayout>
                <Routes>

                  {/* General Pages Started */}
                  <Route path="/Home" element={ <Home />}/>
                  <Route path="/About Us" element={ <AboutUs />}/>
                  <Route path="/Contact" element={ <Contact />}/>
                  {/* General Pages ends */}

                </Routes>
           </HomeLayout>
       </BrowserRouter>
    </>
  )
}

export default App
