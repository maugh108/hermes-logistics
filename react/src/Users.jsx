import React, { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'
import CreateOrderModal from "./components/modals/CreateOrderModal";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import './App'
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { FETCH_USERS } from "./user/user-queries";
import { CREATE_USER, DELETE_USER } from "./user/user-mutations";
import ExpandUserModal from "./components/modals/ExpandUserModal";
import { useFetchUsers } from "./user/user-hooks";
const User = () => {
    const {data, loading, error} = useFetchUsers()
    const [removeUser] = useMutation(DELETE_USER, {
        refetchQueries: [FETCH_USERS]
    })
    const [addUser] = useMutation(CREATE_USER)
    const DeleteUser = (u) => {
        const variables = { 
            id : u._id
        }
        removeUser({variables})
    }
    const CreateUser = () => {
        const variables = {
            firstName: '23e1',
            lastName: 'qwds',
            username: 'w23e',
            password: 'das',
            age: 22
        }
        addUser({variables})
    }
    useEffect(() => {
    }, [data])
    return (
        <>
            <ExpandUserModal user={null}/>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Users table</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>FirstName</Th>
                        <Th>Lastname</Th>
                        <Th>username</Th>
                        <Th>Password</Th>
                        <Th>Age</Th>
                        <Th></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {loading ?
                            <Tr>
                                <Td>Loading</Td>
                                <Td>Loading</Td>
                                <Td>Loading</Td>
                                </Tr>
                        :
                        data?.users ? data?.users.map(u => {
                            return(
                                <Tr key={u._id}>
                                    <Td>{u.firstName}</Td>
                                    <Td>{u.lastName}</Td>
                                    <Td>{u.username || ''}</Td>
                                    <Td>{u.password}</Td>
                                    <Td>{u.age}</Td>
                                    <Td>
                                        <ExpandUserModal user={u}/>
                                        <DeleteIcon color='red.500' boxSize={6}  className="pointer" onClick={() => {DeleteUser(u)}}/>
                                    </Td>
                                </Tr>
                            )
                        })
                        : ''
                        }
                        
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default User