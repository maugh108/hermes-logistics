

import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Trailer from './Trailer'
function App() {
  
  return (
    <div className="App"> 
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/trailers' element={<Trailer/>}/>
      </Routes>
      
    </div>
  )
}

export default App
