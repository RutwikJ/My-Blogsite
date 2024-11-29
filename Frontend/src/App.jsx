import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './Pages/Dashboard';
import Layout from './pages/Layout';


const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/> 
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
     </Routes>
  </BrowserRouter>
  )
}

export default App