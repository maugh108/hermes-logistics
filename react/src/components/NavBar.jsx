import { chakra } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import '../css/NavBar.css'
import AppDrawer from "./AppDrawer"
import { FaSignOutAlt } from "react-icons/fa";
const NavBar = () => {
    const navigate = useNavigate()
    useEffect(()=> {
    }, [location])
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/', {replace:true})
    }
    const CFaSignOutAlt = chakra(FaSignOutAlt)
    return (
        <nav>
            <label className="logo">Hemes Logistics</label>
            <ul>
                <li className="drawer"> <AppDrawer/> </li>
                <li className="nav-item"><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard </Link></li>
                <li className="nav-item"><Link to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>Orders</Link></li>
                <li className="nav-item"><Link to="/trucks" className={location.pathname === '/trucks' ? 'active' : ''}>Trucks</Link></li>
                <li className="nav-item"><Link to="/trailers" className={location.pathname === '/trailers' ? 'active' : ''}>Trailers</Link></li>
                <li className="nav-item"><Link to="/users" className={location.pathname === '/users' ? 'active' : ''}>Users</Link></li>
                <li className="nav-item"><Link to="/drivers" className={location.pathname === '/drivers' ? 'active' : ''}>Drivers</Link></li>
                <li className="nav-item pointer" onClick={logout}><CFaSignOutAlt /></li>
            </ul>
        </nav>
    )
}

export default NavBar