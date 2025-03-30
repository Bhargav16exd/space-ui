import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import SpaceMasterPage from './Pages/SpaceMasterPage'
import ClientPage from './Pages/ClientPage'
import LandingPage from './Pages/LandingPage'
import Sigin from './Pages/SigninPage'
import Signup from './Pages/SignupPage'

function App() {

  return (
    <Routes>

      <Route path='/' element={<LandingPage/>}></Route>

      <Route path='/login' element={<Sigin/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>

      <Route path='/homepage' element={<Homepage/>}></Route>
      <Route path='/master/:username/:uniqueSpaceName' element={<SpaceMasterPage/>}></Route>
      <Route path='/joinee/:username/:uniqueSpaceName' element={<ClientPage/>}></Route>
    

    </Routes>
  )
}

export default App
