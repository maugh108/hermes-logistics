

import { useMutation } from '@apollo/client'
import { CREATE_USER } from './user/user-mutations'
import { FETCH_USERS } from './user/user-queries'
import { useFetchUsers } from './user/user-hooks'
import './App.css'
import DashboardOrder from './components/DashboardOrder'
import { Grid,  GridItem } from '@chakra-ui/react'
const Dashboard = () => {
    const {data, loading, error} = useFetchUsers()
    const [ addUser ] = useMutation(CREATE_USER, {
        refetchQueries: [FETCH_USERS]
    })
    const postUser = () => {
        const firstName = 'Alberto'
        const lastName = 'Guajardo'
        const age = 31
        addUser({variables:{firstName, lastName, age}})
    }
    return (
        <>
            <Grid className='grid-margins' templateColumns='repeat(3, 1fr)' gap={10}>
                <GridItem w='100%' h='calc(100vh - 120px)' bg='blackAlpha.600'>
                    <DashboardOrder/>
                </GridItem>
                <GridItem w='100%' h='calc(100vh - 120px)' bg='blackAlpha.600'>
                    <DashboardOrder/>
                </GridItem>
                <GridItem w='100%' h='calc(100vh - 120px)' bg='blackAlpha.600' />
            </Grid>
        </>
    )
}

export default Dashboard