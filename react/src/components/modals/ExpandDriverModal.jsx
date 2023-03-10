import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { EditIcon } from '@chakra-ui/icons'
import { CREATE_DRIVER } from '../../driver/driver-mutations'
import { FETCH_DRIVERS } from '../../driver/driver.queries'

const ExpandDriverModal = (driver) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id, setId] = useState(driver.driver ? driver.driver._id : '')
    const [firstName, setfirstName] = useState(driver.driver ? driver.driver.firstName : '')
    const [lastName, setlastName] = useState(driver.driver ? driver.driver.lastName : '')

    const [addDriver] = useMutation(CREATE_DRIVER, {
        refetchQueries: [FETCH_DRIVERS]
    })

    const ExpandDriver = e => {
        e.preventDefault()
        const variables = {
            firstName,
            lastName,
        }

        if (driver.driver) variables.id = driver.driver._id
        onClose()
        addDriver({ variables })
    }

    const OpenModal = () => {
        setfirstName('')
        setlastName('')
        setId('')
        onOpen()
    }

    return (
        <>
            {
                driver.driver ?
                    <EditIcon color='blue.500' boxSize={6} className="pointer" onClick={onOpen} />
                    :
                    <Button bg="green.400" color='blackAlpha.900' onClick={OpenModal}>Create driver</Button>
            }

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Users</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={expandDriver}>
                            <FormControl>
                                <input name="id" type='text' hidden values={id} onChange={evt => setid(evt.target.value)} />
                                <FormLabel>Name</FormLabel>
                                <Input name="name" type='text' placeholder="Name" value={firstName} onChange={evt => setfirstName(evt.target.value)} />
                                <FormLabel>Last name</FormLabel>
                                <Input name="lastName" type='text' placeholder="Lastname" value={lasttName} onChange={evt => setlastName(evt.target.value)} />
                            </FormControl>
                            <ModalFotter>
                                <Button colorScheme='red' mr={3} onClick={onClose}>Close</Button>
                                <Button colorScheme='blue' type='submit'>Save</Button>
                            </ModalFotter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ExpandDriverModal