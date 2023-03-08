import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { CREATE_ORDER } from "../../order/order-mutations";  
import { useMutation } from "@apollo/client";
import { FETCH_ORDERS } from "../../order/order-queries";
import { EditIcon } from "@chakra-ui/icons";
const ExpandOrderModal = (order) => { 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id, setid] = useState(order.order ? order.order._id : '')
    const [number, setnumber] = useState(order.order ? order.order.number : '')
    const [pickup, setpickup] = useState(order.order ? order.order.pickup : '')
    const [status, setstatus] = useState(order.order ? order.order.status : '')
    const [open, setopen] = useState(false)
    const [ addOrder ] = useMutation(CREATE_ORDER, {
        refetchQueries: [FETCH_ORDERS]
    })
    const expandOrder = e =>{
        e.preventDefault()
        const variables =  { 
            id,
            number,
            pickup,
            status
        }
        onClose()
        addOrder({variables})
        
    }
    return (
      <>
        <EditIcon color='blue.500' boxSize={6} className="pointer" onClick={onOpen}/>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={expandOrder}>
                <FormControl >
                    <FormLabel>Order number</FormLabel>
                    <input name="id" type="text" hidden value={id} onChange={evt => setid(evt.target.value)}/>
                    <Input name="number" type='text' placeholder="Order number"  value={number} onChange={evt => setnumber(evt.target.value)}/>
                    <FormLabel>Order pickup</FormLabel>
                    <Input name="pickup" type='text' placeholder="Order pickup" value={pickup} onChange={evt => setpickup(evt.target.value)}/>
                    <FormLabel>Order Status</FormLabel>
                    <Select name="status" value={status} onChange={evt => setstatus(evt.target.value)}>
                        <option defaultValue="" disabled>Order Status</option>
                        <option value="NEW">Nuevo</option>
                        <option value="SEND">Enviado</option>
                        <option value="DELIVERED">Entregado</option>
                    </Select>
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

export default ExpandOrderModal