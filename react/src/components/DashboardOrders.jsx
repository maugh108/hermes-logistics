import React from 'react'
import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import '../css/DashboardOrder.css'
const DashboardOrder = () => {
    return (
        <Card m='5' bg='whiteAlpha.300'>
            <CardHeader>
                <Heading size='md'>Order #542243</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider/>} spacing='4'>
                    <Box>
                        <Heading>
                            Summary
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            View a summary of all your clients overt the last month.
                        </Text>
                    </Box>
                    <Box>
                        <Heading size={'xs'} textTransform='uppercase'>
                            Overview
                        </Heading>
                        <Text pt='2' fontSize={'sm'}>
                            Check out the overview of your clients.
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default DashboardOrder