import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button, Input, } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Drawer.css'
const AppDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Open
            </Button>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef} colorScheme='teal'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <div><link to='/'>Dashboard</link></div>
                        <div><link to='/orders'>Orders</link></div>
                        <div><link to='/trucks'>Trucks</link></div>
                        <div><link to='/trailers'>Trailers</link></div>
                        <div><link to='/users'>Users</link></div>
                        <div><link to='/drivers'>Drivers</link></div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AppDrawer