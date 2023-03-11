import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select as CSelect, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { CREATE_ORDER } from "../../order/order-mutations";  
import { useMutation } from "@apollo/client";
import { FETCH_ORDERS } from "../../order/order-queries";
import { EditIcon } from "@chakra-ui/icons";
import { useFetchTrailers } from "../../trailer/trailer-hooks";
import Select  from 'react-select'
import { useFetchDrivers } from "../../drivers/driver-hooks";
import { useFetchTrucks } from "../../truck/truck-hooks";
const ExpandOrderModal = (order) => { 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id, setid] = useState(order.order ? order.order._id : '')
    const [number, setnumber] = useState(order.order ? order.order.number : '')
    const [pickup, setpickup] = useState(order.order ? order.order.pickup : '')
    const [status, setstatus] = useState(order.order ? order.order.status : '')
    const [selectedTrailer, setselectedTrailer] = useState(order.order ? order.order.trailer : '')
    const [selectedTruck, setselectedTruck] = useState(order.order ? order.order.truck : '')
    const [selectedDrivers, setselectedDrivers] = useState(order.order ? order.order.drivers : [])
    const {data, loading, error} = useFetchTrailers()
    const [driversIds, setdriversIds] = useState([])
    const driverResults = useFetchDrivers()
    const trucks = useFetchTrucks()
   
    const [ addOrder ] = useMutation(CREATE_ORDER, {
        refetchQueries: [FETCH_ORDERS]
    })
    
    const expandOrder = e =>{
        e.preventDefault()
        const variables =  { 
            id,
            number,
            pickup,
            status,
            trailerId:selectedTrailer._id,
            truckId:selectedTruck._id,
            driversIds
        }
        onClose()
        addOrder({variables})
    }
    useEffect(() => {
      setselectedDrivers(order.order ? order.order.drivers : [])
      if(order.order) setdriversIds(order.order.drivers.map(m=> m._id))
    }, [order])
    const Change = e => {
      const ids = e.map(i=> i.value)
      setdriversIds(ids)
    }
    const customStyles = {
      control: (base, state) => ({
        ...base,
        background: "#2D3748",
        // match with the menu
        borderRadius: '1px',
        // Overwrittes the different states of border
        borderColor: 'white',
        color:'black'
        // Removes weird border around container
        
      }),
      menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        background:'#2D3748',
        color:'#2D3748',
        marginTop: 0
      }),
      option: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        background:'#2D3748',
        color:'white',
        marginTop: 0
      }),
      multiValue:base => ({
        ...base,
        backgroundColor:'#2D3748',
        color:'red',
        // kill the white space on first and last option
        padding: 0
      }),
      multiValueLabel:base => ({
        ...base,
        color:'white',
        
        // kill the white space on first and last option
        padding: 0
      }),
      menuList: base => ({
        ...base,
        backgroundColor:'#2D3748',
        color:'#2D3748',
        // kill the white space on first and last option
        padding: 0
      })
    };
    return (
      <>
        <EditIcon color='blue.500' boxSize={6} className="pointer" onClick={onOpen}/>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <form onSubmit={expandOrder}>
                <FormControl >
                    <FormLabel>Order number</FormLabel>
                    <input name="id" type="text" hidden value={id} onChange={evt => setid(evt.target.value)}/>
                    <Input name="number" type='text' placeholder="Order number"  value={number} onChange={evt => setnumber(evt.target.value)}/>
                    <FormLabel>Order pickup</FormLabel>
                    <Input name="pickup" type='text' placeholder="Order pickup" value={pickup} onChange={evt => setpickup(evt.target.value)}/>
                    <FormLabel>Order Status</FormLabel>
                    <CSelect name="status" value={status} onChange={evt => setstatus(evt.target.value)}>
                        <option defaultValue="" disabled>Order Status</option>
                        <option value="NEW">Nuevo</option>
                        <option value="SEND">Enviado</option>
                        <option value="DELIVERED">Entregado</option>
                    </CSelect>
                    <FormLabel>Select trailer</FormLabel>
                    <CSelect name="trailer" value={selectedTrailer ? selectedTrailer._id : ''} onChange={evt => setselectedTrailer(evt.target.value)}>
                      <option value="DEFAULT" disabled>Select trailer</option>
                      { loading ?
                        <option value="">Loading</option>
                        :
                        data.trailers.map((trailer) => {
                          return(
                            <option key={trailer._id} value={trailer._id}>{trailer.number}</option>
                          )
                        })
                      }
                    </CSelect>
                    <FormLabel>Select truck</FormLabel>
                    <CSelect name="truck" value={selectedTruck ? selectedTruck._id : ''} onChange={evt => setselectedTruck(evt.target.value)} >
                      <option value="DEFAULT" disabled>Select truck</option>
                      { trucks.loading ?
                        <option value="">Loading</option>
                        :
                        trucks.data.trucks.map((truck) => {
                          return(
                            <option key={truck._id} value={truck._id}>#{truck.number} {truck.brand} {truck.name}</option>
                          )
                        })
                      }
                    </CSelect>
                    { !driverResults.loading && driverResults.data && 
                      <>
                        <FormLabel>Select Drivers</FormLabel> 
                        <Select styles={customStyles} defaultValue={
                          driverResults.data.drivers.filter(x=> selectedDrivers.map(m=> m._id).includes(x._id)).map(m=> {
                            return ({value:m._id, label:m.firstName})
                          })} 
                          options={driverResults.data.drivers.map(driver=> {
                          return ({value:driver._id, label:driver.firstName})
                        })} isMulti onChange={Change}/>
                      </>
                    }
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

export default ExpandOrderModal