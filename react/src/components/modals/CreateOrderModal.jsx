import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { CREATE_ORDER } from "../../order/order-mutations";  
import { useMutation } from "@apollo/client";
import { FETCH_ORDERS } from "../../order/order-queries";
const CreateOrderModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ addOrder ] = useMutation(CREATE_ORDER, {
        refetchQueries: [FETCH_ORDERS]
    })
    const expandOrder = e =>{
        e.preventDefault()
        const variables =  { 
            number: e.target.number.value,
            pickup: e.target.pickup.value,
            status: e.target.status.value
        }
        onClose()
        addOrder({variables})
        
    }
    return (
      <>
        <Button bg="green.400" color='blackAlpha.900'  onClick={onOpen}>Create Order</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={expandOrder}>
                <FormControl >
                    <FormLabel>Order number</FormLabel>
                    <Input name="number" type='text' placeholder="Order number"/>
                    <FormLabel>Order pickup</FormLabel>
                    <Input name="pickup" type='text' placeholder="Order pickup" />
                    <FormLabel>Order Status</FormLabel>
                    <Select name="status" >
                        <option defaultValue disabled>Order Status</option>
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

export default CreateOrderModal