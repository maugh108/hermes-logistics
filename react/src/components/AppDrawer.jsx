import { HamburgerIcon, PhoneIcon } from '@chakra-ui/icons'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
  } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Drawer.css'
const AppDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/', {replace:true})
    }
    return(
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                <HamburgerIcon/>
            </Button>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} colorScheme='teal' >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>

                <DrawerBody>
                    <div><Link to="/" >Dashboard</Link> </div>
                    <div><Link to="/orders" >Orders</Link> </div>
                    <div><Link to="/trucks" >Trucks</Link></div>
                    <div><Link to="/trailers">Trailers</Link></div>
                    <div><Link to="/users">Users</Link></div>
                    <div><Link to="/drivers">Drivers</Link></div>
                    <div className='pointer' onClick={logout}>Logout</div>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AppDrawer