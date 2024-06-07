/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from "@chakra-ui/react"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from 'react-router-dom';
import { useState } from "react";

const UserHeader = ({ user }) => {
    const toast = useToast();
    const currentUser = useRecoilValue(userAtom)

    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id))
    // console.log(following)

    const [updating, setUpdating] = useState(false)

    const handleFollow = async () => {
        if (!currentUser) {
            toast({
                title: 'Error',
                status: 'Please login to follow',
                description: "error",
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        setUpdating(true)

        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()

            if (data.error) {
                toast({
                    title: 'Error',
                    status: 'error',
                    description: data.error,
                    duration: 3000,
                    isClosable: true,
                })
                return;
            }

            if (following) {
                toast({
                    title: 'Success',
                    status: 'success',
                    description: `Unfollowed ${user.name}`,
                    duration: 3000,
                    isClosable: true,
                })
                user.followers.pop()
            }
            else {
                toast({
                    title: 'Success',
                    status: 'success',
                    description: `Followed ${user.username}`,
                    duration: 3000,
                    isClosable: true,
                })
                user.followers.push(currentUser?._id)
            }

            setFollowing(!following)
        } catch (err) {
            console.log(err);
        } finally {
            setUpdating(false)
        }

    }

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            console.log("URL is copied");
            toast({
                title: 'Link copied.',
                status: 'success',
                description: "Profile link copied.",
                duration: 3000,
                isClosable: true,
            })
        });
    }

    return (
        <VStack gap={6} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} > {user.username}</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} padding={1} borderRadius={"full"} >
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    {user.profilePic &&
                        <Avatar
                            name="Mark Zuckerberg"
                            src={user.profilePic}
                            size={{
                                base: "md",
                                md: "xl"
                            }}
                        />}
                    {!user.profilePic &&
                        <Avatar
                            name="Mark Zuckerberg"
                            src="https://bit.ly/broken-link"
                            size={{
                                base: "md",
                                md: "xl"
                            }}
                        />}
                </Box>
            </Flex>

            <Text>{user.bio}</Text>

            {currentUser?._id === user._id && (
                <Link as={RouterLink} to={"/update"} >
                    <Button size={"sm"}>Update Profile</Button>
                </Link>
            )}
            {currentUser?._id !== user._id && (
                <Button size={"sm"} onClick={handleFollow} isLoading={updating} >{following ? "Unfollow" : "Follow"}</Button>

            )}

            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"} >{user.followers.length} followers</Text>
                    <Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"} >instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>

            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>

        </VStack>
    )
}

export default UserHeader