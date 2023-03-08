import React, { useEffect } from "react";
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
import { useFetchOrder } from "./order/order-hooks";
const Orders = () => {
    const {data, loading, error} = useFetchOrder()
    const OpenOrder = () => {
        OpenCreateOrder()
        
    }
    useEffect(() => {
    }, [data])
    return (
        <>
            <CreateOrderModal/>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Orders table</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Number</Th>
                        <Th>Pickup</Th>
                        <Th >Status</Th>
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
                        data?.orders.map(o => {
                            return(
                                <Tr key={o._id}>
                                    <Td>{o.number}</Td>
                                    <Td>{o.pickup}</Td>
                                    <Td>{o.status}</Td>
                                </Tr>
                            )
                        })
                        }
                        
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Orders