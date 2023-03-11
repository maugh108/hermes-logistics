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

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import './App'
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useFetchDrivers } from "./driver/driver-hooks";
import { DELETE_DRIVER } from "./driver/driver-mutations";
import { FETCH_DRIVERS } from "./driver/driver-queries";
import ExpandDriverModal from "./components/modals/ExpandDriverModal";

const Drivers = () => {
    const { data, loading, error } = useFetchDrivers()
    const [removeDriver] = useMutation(DELETE_DRIVER, {
        refetchQueries: [FETCH_DRIVERS]
    })
    const DeleteDriver = (o) => {
        const variables = {
            id: o._id
        }
        removeDriver({ variables })
    }
    useEffect(() => {
    }, [data])

    return (
        <>
            <ExpandDriverModal driver={null} />
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Drivers Table</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>FirstName</Th>
                            <Th>LastName</Th>
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
                            data.drivers ? data?.drivers.map(d => {
                                return (
                                    <Tr key={d._id}>
                                        <Td>{d.firstName}</Td>
                                        <Td>{d.lastName}</Td>
                                        <Td>
                                            <ExpandDriverModal driver={d} />
                                            <DeleteIcon color='red.500' boxSize={6} className="pointer" onClick={() => { DeleteDriver(d) }} />
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

export default Drivers