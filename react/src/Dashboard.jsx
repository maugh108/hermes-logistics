
import './App.css'
import DashboardOrder from './components/DashboardOrder'
import { Grid,  GridItem } from '@chakra-ui/react'
import { useFetchOrders } from './order/order-hooks'
import { useEffect } from 'react'
const Dashboard = () => {
    const {data, loading, error} = useFetchOrders()

    useEffect(() => {
    }, [data])
    return (
        <>
            <Grid className='grid-margins' templateColumns='repeat(3, 1fr)' gap={10}>
                <GridItem className='max-dash-h' w='100%' h='calc(100vh - 120px)' bg='blackAlpha.600'>
                    {data?.orders.filter(o => o.status==='NEW').map(o => {
                        return (
                            <DashboardOrder key={o._id} order={o}/>
                        )
                    })}
                </GridItem>
                <GridItem className='max-dash-h' w='100%' h='calc(100vh - 120px)' bg='blackAlpha.600'>
                    {data?.orders.filter(o => o.status==='SEND').map(o => {
                        return (
                            <DashboardOrder key={o._id} order={o}/>
                        )
                    })}
                </GridItem>
                <GridItem className='max-dash-h' w='100%' h='calc(100vh - 120px)' bg='blackAlpha.600'>
                    {data?.orders.filter(o => o.status==='DELIVERED').map(o => {
                        return (
                            <DashboardOrder key={o._id} order={o}/>
                        )
                    })}
                </GridItem>
            </Grid>
        </>
    )
}

export default Dashboard