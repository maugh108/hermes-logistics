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
import { useFetchDrivers } from "../../drivers/driver-hooks";
const CreateOrderModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addOrder] = useMutation(CREATE_ORDER, {
    refetchQueries: [FETCH_ORDERS]
  })

  const [driversIds, setdriversIds] = useState([])
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
      driversIds
    }
    onClose()
    addOrder({ variables })

  }
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#2D3748",
      // match with the menu
      borderRadius: '1px',
      // Overwrittes the different states of border
      borderColor: 'white',
      color: 'black'
      // Removes weird border around container

    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      background: '#2D3748',
      color: '#2D3748',
      marginTop: 0
    }),
    option: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      background: '#2D3748',
      color: 'white',
      marginTop: 0
    }),
    multiValue: base => ({
      ...base,
      backgroundColor: '#2D3748',
      color: 'red',
      // kill the white space on first and last option
      padding: 0
    }),
    multiValueLabel: base => ({
      ...base,
      color: 'white',

      // kill the white space on first and last option
      padding: 0
    }),
    menuList: base => ({
      ...base,
      backgroundColor: '#2D3748',
      color: '#2D3748',
      // kill the white space on first and last option
      padding: 0
    })
  };
  const Change = e => {
    const ids = e.map(i => i.value)
    setdriversIds(ids)
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
                <FormLabel>Order Number</FormLabel>
                <Input name="number" type='text' placeholder="Order Number" />
                <FormLabel>Order Pickup</FormLabel>
                <Input name="pickup" type='text' placeholder="Order Pickup" />
                <FormLabel>Order Status</FormLabel>
                <CSelect name="status" >
                  <option selected disabled>Order Status</option>
                  <option value="NEW">New</option>
                  <option value="SEND">Send</option>
                  <option value="DELIVERED">Delivered</option>
                </CSelect>
                <FormLabel>Select Trailer</FormLabel>
                <CSelect name="trailer" >
                  <option selected disabled>Select Trailer</option>
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
                <FormLabel>Select Truck</FormLabel>
                <CSelect name="truck" >
                  <option selected disabled>Select Truck</option>
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
                    <FormLabel>Select Drivers</FormLabel>
                    <Select styles={customStyles} options={driverResults.data.drivers.map(driver => {
                      return ({ value: driver._id, label: driver.firstName })
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