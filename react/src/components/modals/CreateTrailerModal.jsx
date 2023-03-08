import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { useMutation } from "@apollo/client";
import { CREATE_TRAILER } from "../../trailer/trailer-mutations";
import { FETCH_TRAILERS } from "../../trailer/trailer-queries";
const CreateTrailerModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ addTrailer ] = useMutation(CREATE_TRAILER, {
        refetchQueries: [FETCH_TRAILERS]
    })
    const expandOrder = e =>{
        e.preventDefault()
        const variables =  { 
            number: e.target.number.value,
            type: e.target.type.value
        }
        onClose()
        addTrailer({variables})
        
    }
    return (
      <>
        <Button bg="green.400" color='blackAlpha.900'  onClick={onOpen}>Create Trailer</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Trailer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={expandOrder}>
                <FormControl >
                    <FormLabel>Trailer Number</FormLabel>
                    <Input name="number" type='text' placeholder="Trailer number"/>
                    <FormLabel>Trailer Type</FormLabel>
                    <Select name="type" >
                        <option defaultValue disabled>Trailer Type</option>
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

export default CreateTrailerModal