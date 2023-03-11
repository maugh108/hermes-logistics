import NavBar from './components/NavBar'
import { Route, Routes, useLocation, useNavigate,  } from 'react-router-dom'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Trailer from './Trailer'
import User from './User'
import Truck from './Truck'
import Drivers from './Drivers'
import Login from './Login'
import { useEffect } from 'react'
import axios from 'axios'
function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const checkToken = async(token) =>{
    const result = await axios.get('http://localhost:3000/check-token',  { headers:{ 'authorization' : token } })
    if(result.status !== 200 || !result.data) navigate('/login', {replace:true})
  }
    useEffect(()=> {
      if(location.pathname !== '/login'){
        const token = localStorage.getItem('token')
      
        if(!token) {
          navigate('/login', {replace:true})
        }else{
          checkToken(token)
        }
      }
    }, [location])


  return (
    <div className="App"> 
      {location.pathname !== '/login' &&
        <NavBar />
      }
      <Routes >
        <Route path="/"  element={<Dashboard/>} />
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/trucks' element={<Truck/>}/>
        <Route path='/trailers' element={<Trailer/>}/>
        <Route path='/users' element={<User/>}/>
        <Route path='/drivers' element={<Drivers/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
      
    </div>
  )
}

export default App
