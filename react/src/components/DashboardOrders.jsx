import React from 'react'
import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import '../css/DashboardOrder.css'
const DashboardOrder = ({order}) => {
    return (
        <Card m='5' bg='whiteAlpha.300'>
            <CardHeader>
                <Heading size='md'>Order #{order.number}</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider/>} spacing='4'>
                    <Box>
                        <Heading>
                            Pickup
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {order.pickup}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size={'xs'} textTransform='uppercase'>
                            Status
                        </Heading>
                        <Text pt='2' fontSize={'sm'}>
                            {order.status}
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default DashboardOrder