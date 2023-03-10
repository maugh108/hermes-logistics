import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Button, useDisclosure, } from '@chakra-ui/react'
import CreateTrailerModal from './components/modals/CreateTrailerModal'
import ExpandTrailerModal from './components/modals/ExpandTrailerModal'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import './App'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { FETCH_TRUCKS } from './truck/truck-queries'
import { useFetchTrucks } from './truck/truck-hooks'
import { DELETE_TRUCK } from './truck/truck-mutations'
import ExpandTruckModal from './components/modals/ExpndTruckModal'

const Truck = () => {
    const { data, loading, error } = useFetchTrucks()
    const [removeTruck] = useMutation(DELETE_TRUCK, {
        refetchQueries: [FETCH_TRUCKS]
    })
    const DeleteTruck = (o) => {
        const variables = {
            id: o._id
        }
        removeTruck({ variables })
    }

    useEffect(() => {
    }, [data])
    return (
        <>
            <ExpandTruckModal truck={null} />
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Trailer Table</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Brand</Th>
                            <Th>Name</Th>
                            <Th>Number</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {loading ?
                            <Tr>
                                <Td>Loading</Td>
                                <Td>Loading</Td>
                                <Td>Loading</Td>
                                <Td>Loading</Td>
                            </Tr>
                            :
                            data.trucks ? data?.trucks.map(t => {
                                return (
                                    <Tr key={t._id}>
                                        <Td>{t.brand}</Td>
                                        <Td>{t.name}</Td>
                                        <Td>{t.number}</Td>
                                        <Td>
                                            <ExpandTruckModal truck={t} />
                                            <DeleteIcon color='red.500' boxSize={6} className='pointer' onClick={() => { DeleteTruck(t) }} />
                                        </Td>
                                    </Tr>
                                )
                            }) : ''
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Truck