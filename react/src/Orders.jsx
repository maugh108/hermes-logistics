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
import { useFetchOrder, useFetchOrders } from "./order/order-hooks";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import './App'
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { FETCH_ORDER, FETCH_ORDERS } from "./order/order-queries";
import ExpandOrderModal from "./components/modals/ExpandOrderModal";
import { DELETE_ORDER } from "./order/order-mutations";
const Orders = () => {
    const {data, loading, error} = useFetchOrders()
    const [findOrderById,result] = useFetchOrder()
    const [removeOrder] = useMutation(DELETE_ORDER, {
        refetchQueries: [FETCH_ORDERS]
    })
    const [currentOrder, setCurrentOrder] = useState(null)
    
    const UpdateOrder = async o =>  {
        findOrderById({variables: {id: o._id}})
    }
    const DeleteOrder = (o) => {
        const variables = { 
            id : o._id
        }
        removeOrder({variables})
    }
    useEffect(() => {
        if(result.data && result.data.order && result.data.order._id){
            setCurrentOrder(result.data?.order)
        }
    }, [data, result])
    return (
        <>
            <CreateOrderModal />
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Orders table</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Number</Th>
                        <Th>Pickup</Th>
                        <Th>Status</Th>
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
                        data?.orders.map(o => {
                            return(
                                <Tr key={o._id}>
                                    <Td>{o.number}</Td>
                                    <Td>{o.pickup}</Td>
                                    <Td>{o.status}</Td>
                                    <Td>
                                        <ExpandOrderModal order={o}/>
                                        <DeleteIcon color='red.500' boxSize={6}  className="pointer" onClick={() => {DeleteOrder(o)}}/>
                                    </Td>
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