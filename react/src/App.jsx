import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Orders from './Orders'
function App() {
  
  return (
    <div className="App"> 
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      
    </div>
  )
}

export default App