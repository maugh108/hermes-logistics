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
import { CREATE_TRAILER } from "../../trailer/trailer-mutations";
import { FETCH_TRAILERS } from "../../trailer/trailer-queries";
const ExpandTrailerModal = (trailer) => { 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id, setid] = useState(trailer.trailer ? trailer.trailer._id : '')
    const [number, setnumber] = useState(trailer.trailer ? trailer.trailer.number : '')
    const [type, setType] = useState(trailer.trailer ? trailer.trailer.type : '')
    const [ addTrailer ] = useMutation(CREATE_TRAILER, {
        refetchQueries: [FETCH_TRAILERS]
    })
    const expandOrder = e =>{
        e.preventDefault()
        const variables =  { 
            id,
            number,
            type
        }
        onClose()
        addTrailer({variables})
        
    }
    return (
      <>
        <EditIcon color='blue.500' boxSize={6} className="pointer" onClick={onOpen}/>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Trailer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={expandOrder}>
                <FormControl >
                    <FormLabel>Trailer number</FormLabel>
                    <input name="id" type="text" hidden value={id} onChange={evt => setid(evt.target.value)}/>
                    <Input name="number" type='text' placeholder="Trailer number"  value={number} onChange={evt => setnumber(evt.target.value)}/>
                    <FormLabel>Trailer Type</FormLabel>
                    <Select name="status" value={type} onChange={evt => setType(evt.target.value)}>
                        <option defaultValue="" disabled>Trailer type</option>
                        <option value="COOL">Cool</option>
                        <option value="NORMAL">Normal</option>
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

export default ExpandTrailerModal 