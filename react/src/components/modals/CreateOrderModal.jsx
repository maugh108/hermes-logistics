import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select as CSelect, useDisclosure, useMultiStyleConfig } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

import { CREATE_ORDER } from "../../order/order-mutations";
import { useMutation } from "@apollo/client";
import { FETCH_ORDERS } from "../../order/order-queries";
import { useFetchTrailers } from "../../trailer/trailer-hooks";
import { useFetchTrucks } from "../../truck/truck-hooks";
import Select from 'react-select'
import { useFetchDrivers } from "../../driver/driver-hooks";

const CreateOrderModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addOrder] = useMutation(CREATE_ORDER, {
    refetchQueries: [FETCH_ORDERS]
  })

  const [driverIds, setdriversIds] = useState([])
  const { data, loading, error } = useFetchTrailers()
  const driverResults = useFetchDrivers()
  const trucks = useFetchTrucks()
  const expandOrder = e => {
    e.preventDefault()
    const variables = {
      number: e.target.number.value,
      pickup: e.target.pickup.value,
      status: e.target.status.value,
      trailerId: e.target.trailer.value,
      truckId: e.target.truck.value,
      driverIds
    }
    onClose()
    addOrder({ variables })

  }

  return (
    <>
      <Button bg="green.400" color='blackAlpha.900' onClick={onOpen}>Create Order</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={expandOrder}>
              <FormControl >
                <FormLabel>Order number</FormLabel>
                <Input name="number" type='text' placeholder="Order number" />
                <FormLabel>Order pickup</FormLabel>
                <Input name="pickup" type='text' placeholder="Order pickup" />
                <FormLabel>Order Status</FormLabel>
                <CSelect name="status" >
                  <option selected disabled>Order Status</option>
                  <option value="NEW">Nuevo</option>
                  <option value="SEND">Enviado</option>
                  <option value="DELIVERED">Entregado</option>
                </CSelect>

                <FormLabel>Select trailer</FormLabel>
                <CSelect name="trailer">
                  <option selected disabled>Select trailer</option>
                  {loading ?
                    <option value="">Loading</option>
                    :
                    data.trailers.map((trailer) => {
                      return (
                        <option key={trailer._id} value={trailer._id}>{trailer.number}</option>
                      )
                    })
                  }
                </CSelect>

                <FormLabel>Select truck</FormLabel>
                <CSelect name="truck">
                  <option selected disabled>Select truck</option>
                  {trucks.loading ?
                    <option value="">Loading</option>
                    :
                    trucks.data.trucks.map((truck) => {
                      return (
                        <option key={truck._id} value={truck._id}>#{truck.number} {truck.brand} {truck.name}</option>
                      )
                    })
                  }
                </CSelect>

                {!driverResults.loading && driverResults.data &&
                  <>
                    <FormLabel>Select drivers</FormLabel>
                    <Select options={driverResults.data.drivers.map(drive => {
                      return (
                        { value: driver._id, label: driver.firstName }
                      )
                    })} isMulti onChange={Change} />
                  </>
                }

              </FormControl>

              <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={onClose}>Close</Button>
                <Button colorScheme='blue' type='submit'>Save</Button>
              </ModalFooter>
            </form>
          </ModalBody>


        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateOrderModal