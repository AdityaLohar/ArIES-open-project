/* eslint-disable no-unused-vars */
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import authScreenAtom from '../atoms/authAtom.js';
import { useRecoilState, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom.js';

export default function SignUpCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const toast = useToast();
    const setUser = useSetRecoilState(userAtom)

    const handleSignup = async () => {
        try {
            const res = await fetch('/api/users/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            });
            const data = await res.json()
            // console.log(data)

            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
                return;
            }

            localStorage.setItem("user-threads", JSON.stringify(data))
            setUser(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Flex
            // minH={'100vh'}
            align={'center'}
            justify={'center'}
        >

            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input type="text" onChange={(e) => setInputs({ ...inputs, name: e.target.value })} value={inputs.name} autoComplete='off' />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" onChange={(e) => setInputs({ ...inputs, username: e.target.value })} value={inputs.username} autoComplete='off' />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={(e) => setInputs({ ...inputs, email: e.target.value })} value={inputs.email} autoComplete='off' />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} autoComplete='off' value={inputs.password} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={useColorModeValue('gray.600', 'gray.700')}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue('gray.00', 'gray.800'),
                                }}
                                onClick={handleSignup}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'} onClick={() => { setAuthScreen("login") }}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack >
        </Flex >
    );
}