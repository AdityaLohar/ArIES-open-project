import { Avatar, AvatarBadge, Flex, Image, Stack, Text, WrapItem, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { BsCheck2All } from "react-icons/bs"
import { selectedConversationsAtom } from '../atoms/messagesAtom'

const Conversations = ({ conversation }) => {
    const user = conversation.participants[0]
    const currentUser = useRecoilValue(userAtom)
    const lastMessage = conversation.lastMessage
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationsAtom)
    const colorMode = useColorMode()

    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={"1"}
            _hover={{
                cursor: "pointer",
                bg: useColorModeValue("gray.600", "gray.dark"),
                color: "white",
            }}
            borderRadius={"md"}
            onClick={() => setSelectedConversation({
                _id: conversation._id,
                userId: user._id,
                userProfilePic: user.profilePic,
                username: user.username,
                mock: conversation.mock
            })}
            bg={
                selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.400" : "gray.dark") : ""
            }
        >
            <WrapItem>
                <Avatar
                    size={{
                        base: "xs",
                        sm: "sm",
                        md: "md",
                    }}
                    src={user.profilePic}
                >
                    <AvatarBadge boxSize='1em' bg='green.500' />
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight="700" display={"flex"} alignItems={"center"}>
                    {/* {user.username} */}
                    {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                    {currentUser._id === lastMessage.sender ? <BsCheck2All size={16} /> : ""}
                    {lastMessage.text.length > 18 ? lastMessage.text.slice(0, 18) + '...' : lastMessage.text}
                </Text>
            </Stack>
        </Flex>
    )
}

export default Conversations