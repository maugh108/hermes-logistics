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
import { CREATE_USER } from "../../user/user-mutations";
import { FETCH_USERS } from "../../user/user-queries";
const ExpandUserModal = (user) => { 
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [id, setid] = useState(user.user ? user.user._id : "")
    const [firstName, setfirstName] = useState(user.user ? user.user.firstName : '')
    const [lastName, setlastName] = useState(user.user ? user.user.lastName : '')
    const [age, setage] = useState(user.user ? user.user.age : '')
    const [username, setusername] = useState(user.user ? user.user.username : '')
    const [password, setpassword] = useState(user.user ? user.user.password : '')

    const [ addUser ] = useMutation(CREATE_USER, {
        refetchQueries: [FETCH_USERS]
    })
    const expandUser = e =>{
        e.preventDefault()
        const variables =  { 
            firstName,
            lastName,
            age: +age,
            username,
            password,
        }
        if(user.user) variables.id = user.user._id
        onClose()
        addUser({variables})
        
    }
    const OpenModal = () => {
      setfirstName('')
      setlastName('')
      setpassword('')
      setage('')
      setusername('')
      onOpen()
    }
    return (
      <>
        {
          user.user ? 
          <EditIcon color='blue.500' boxSize={6} className="pointer" onClick={onOpen}/>
          : 
          <Button bg="green.400" color='blackAlpha.900'  onClick={OpenModal}>Create User</Button>
        }
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Users</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={expandUser}>
                <FormControl >
                    <input name="id" type="text" hidden value={id} onChange={evt => setid(evt.target.value)}/>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" type='text' placeholder="Name"  value={firstName} onChange={evt => setfirstName(evt.target.value)}/>
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lastName" type='text' placeholder="Lastname" value={lastName} onChange={evt => setlastName(evt.target.value)}/>
                    <FormLabel>Username</FormLabel>
                    <Input name="username" type='text' placeholder="Username" value={username} onChange={evt => setusername(evt.target.value)}/>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type='password' placeholder="Password" value={password} onChange={evt => setpassword(evt.target.value)}/>
                    <FormLabel>Age</FormLabel>
                    <Input name="age" type='number' placeholder="Age" value={age} onChange={evt => setage(evt.target.value)}/>
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

export default ExpandUserModal