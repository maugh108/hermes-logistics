import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Trailer from './Trailer'
import User from './User'
import User from './Truck'
import User from './Drivers'

function App() {
  
  return (
    <div className="App"> 
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/orders' element={<Truck/>}/>
        <Route path='/trailers' element={<Trailer/>}/>
        <Route path='/users' element={<User/>}/>
        <Route path='/users' element={<Drivers/>}/>
      </Routes>
      
    </div>
  )
}

export default App
