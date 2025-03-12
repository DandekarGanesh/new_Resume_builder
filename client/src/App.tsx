import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import CreateResume from './pages/Resume/CreateResume'

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


                   {/* Authentication Start */}
                    <Route path="/SignUp" element={ <SignUp />}/>
                    <Route path="/Login" element={ <Login />}/>
                    <Route path="/ForgotPassword" element={ <ForgotPassword /> }/>
                    <Route path="/ResetPassword/:token" element={ <ResetPassword /> }/>
                   {/* Authentication End */}


                   {/* Resume Start  */}
                    <Route path="/New Resume" element={ <CreateResume /> }/>
                   {/* Resume End  */}
                 

                  <Route path="*" element={<h1> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio fugiat, voluptatum dolor aperiam officiis dicta eum, quia illum voluptates ut molestiae! Obcaecati a molestiae repellat dolores vero alias culpa rerum!
                  Eius blanditiis laudantium ipsam saepe repellat perspiciatis atque laborum, minus deleniti, provident harum? Tempora vitae rem fugit ullam. Facere quis quos deleniti est molestiae ullam temporibus repudiandae neque, facilis mollitia?
                  Voluptatem fuga id recusandae soluta eos nostrum nam quibusdam molestias laudantium expedita exercitationem accusantium ex, atque quam corporis, aliquid placeat, aspernatur tenetur quasi illo similique dolorem obcaecati ea. Eligendi, non.
                  Error, molestias perspiciatis recusandae quisquam rem sed, debitis quos officiis quia blanditiis sint consequuntur iste nam harum ea sit odio quaerat earum, ratione quo nulla atque. Explicabo, recusandae. Architecto, recusandae?
                  Repellat quod sit porro impedit eligendi minima voluptatum cumque illum rerum laborum minus animi, enim eaque error! Quis itaque quos accusantium. Cupiditate, voluptates ea! Animi debitis nisi enim illo ea!
                  Voluptatibus necessitatibus odit, quas magni minus nisi eaque, illo expedita doloribus atque iusto deserunt officia mollitia ut cum, earum perferendis. Neque quos modi sit fugiat qui in eveniet suscipit totam?
                  Possimus omnis placeat sapiente ullam quia nesciunt similique corporis pariatur beatae deserunt voluptates nisi accusamus, quis doloribus quas porro! Placeat, deserunt. At modi quibusdam doloremque facilis porro aspernatur rerum natus!
                  Sit neque, omnis dolore magnam dignissimos aspernatur eius, similique dicta suscipit debitis sapiente vel, ipsam magni aperiam? Ipsam beatae officia tenetur a, soluta, deleniti earum possimus cum quos, distinctio quasi.
                  Illo aperiam praesentium unde saepe quae tenetur adipisci qui odio soluta </h1>} />

                </Routes>
           </HomeLayout>
       </BrowserRouter>
    </>
  )
}

export default App
