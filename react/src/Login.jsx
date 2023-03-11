import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import './App.css'
import { useMutation } from "@apollo/client";
import { LOGIN } from "./user/user-mutations";
import axios from 'axios'
import {  useNavigate  } from "react-router-dom"
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleShowClick = () => setShowPassword(!showPassword);
    const [makeLogin] = useMutation(LOGIN)
    const login = (e) => {
        e.preventDefault()
        const variables = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        //makeLogin({variables})
        axios.post('http://localhost:3000/login', variables)
        .then(res=>{
            localStorage.setItem("token", res.data.token)
            navigate('/', {replace:true})
              
        })
    }
    return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="blackAlpha.800"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={login}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="blackAlpha.800" />}
                  />
                  <Input type="text" name="username" placeholder="username"  _placeholder={{ color: 'blackAlpha.800' }} textColor='blackAlpha.800' borderColor='blackAlpha.800'/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="blackAlpha.800"
                    children={<CFaLock color="blackAlpha.800" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    _placeholder={{ color: 'blackAlpha.800' }} textColor='blackAlpha.800'
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick} color='blackAlpha.600' borderColor={"blackAlpha.400"}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
