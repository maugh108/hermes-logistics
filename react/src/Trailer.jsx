import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Button, useDisclosure, } from '@chakra-ui/react'
import CreateTrailerModal from './components/modals/CreateTrailerModal'
import ExpandTrailerModal from './components/modals/ExpandTrailerModal'
import { useFetchOrder, useFetchOrders } from "./order/order-hooks";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import './App'
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { DELETE_TRAILER } from "./trailer/trailer-mutations";
import { FETCH_TRAILERS } from "./trailer/trailer-queries";
import { useFetchTrailers } from "./trailer/trailer-hooks";
const Trailer = () => {
    const {data, loading, error} = useFetchTrailers()
    const [removeTrailer] = useMutation(DELETE_TRAILER, {
        refetchQueries: [FETCH_TRAILERS]
    })
    const DeleteOrder = (o) => {
        const variables = { 
            id : o._id
        }
        removeTrailer({variables})
    }
    useEffect(() => {
    }, [data])
    return (
        <>
            <CreateTrailerModal />
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Trailer table</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Number</Th>
                        <Th>Type</Th>
                        <Th></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {loading ?
                            <Tr>
                                <Td>Loading</Td>
                                <Td>Loading</Td>
                                </Tr>
                        :
                        data.trailers ? data?.trailers.map(t => {
                            return(
                                <Tr key={t._id}>
                                    <Td>{t.number}</Td>
                                    <Td>{t.type}</Td>
                                    <Td>
                                        <ExpandTrailerModal trailer={t}/>
                                        <DeleteIcon color='red.500' boxSize={6}  className="pointer" onClick={() => {DeleteOrder(t)}}/>
                                    </Td>
                                </Tr>
                            )
                        })
                        : ''}
                        
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Trailer