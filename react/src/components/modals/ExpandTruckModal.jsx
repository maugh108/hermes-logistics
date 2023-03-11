import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { useMutation } from "@apollo/client";
import { EditIcon } from "@chakra-ui/icons";
import { CREATE_TRUCK } from "../../truck/truck-mutations";
import { FETCH_TRUCKS } from "../../truck/truck-queries";
const ExpandTruckModal = (truck) => { 
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [id, setid] = useState(truck.truck ? truck.truck._id : '')
    const [name, setname] = useState(truck.truck ? truck.truck.name : '')
    const [brand, setbrand] = useState(truck.truck ? truck.truck.brand : '')
    const [number, setnumber] = useState(truck.truck ? truck.truck.number : '')

    const [ addTruck ] = useMutation(CREATE_TRUCK, {
        refetchQueries: [FETCH_TRUCKS]
    })
    const expandTruck = e =>{
        e.preventDefault()
        const variables =  { 
            name,
            brand,
            number
        }
        if(truck.truck) variables.id = truck.truck._id
        onClose()
        addTruck({variables})
        
    }
    const OpenModal = () => {
      setname('')
      setbrand('')
      setid('')
      setnumber('')
      onOpen()
    }
    return (
      <>
        {
          truck.truck ? 
          <EditIcon color='blue.500' boxSize={6} className="pointer" onClick={onOpen}/>
          : 
          <Button bg="green.400" color='blackAlpha.900'  onClick={OpenModal}>Create Truck</Button>
        }
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Users</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={expandTruck}>
                <FormControl >
                    <input name="id" type="text" hidden value={id} onChange={evt => setid(evt.target.value)}/>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" type='text' placeholder="Name"  value={name} onChange={evt => setname(evt.target.value)}/>
                    <FormLabel>Brand</FormLabel>
                    <Input name="brand" type='text' placeholder="Brand" value={brand} onChange={evt => setbrand(evt.target.value)}/>
                    <FormLabel>Number</FormLabel>
                    <Input name="number" type='text' placeholder="Number" value={number} onChange={evt => setnumber(evt.target.value)}/>
                </FormControl>
                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='blue' type='submit' >Save</Button>
                </ModalFooter>
            </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default ExpandTruckModal