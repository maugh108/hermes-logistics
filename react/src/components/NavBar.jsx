import React, { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import '../css/NavBar.css'
import AppDrawer from "./AppDrawer"
const NavBar = () => {
    const location = useLocation()
    useEffect(()=> {
        console.log(location)
    }, [location])
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
            </ul>
        </nav>
    )
}

export default NavBar