import { Box, useToast, Button, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/chatProvider";
import ChatLoading from "../ChatLoading";
import { getSender, getSenderPic } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";
import { Avatar } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
// import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "process.env.BACKEND_API/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir='column'
      alignItems='center'
      p={3}
      width={{ base: "100%", md: "31%" }}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily='Work sans'
        display='flex'
        width='100%'
        justifyContent='space-between'
        alignItems='center'
      >
        Chats
        <GroupChatModal>
          <Button
            display='flex'
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
 rightIcon={<AddIcon />}
          >
            New Group
            // <i className='fa-solid fa-people-roof'></i>
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display='flex'
        flexDir='column'
        p={3}
        width='100%'
        h='100%'
        borderRadius='lg'
        overflowY='hidden'
      >
        {chats ? (
          <Stack overflowY='scroll'>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor='pointer'
                bg={selectedChat === chat ? "#38B2AC" : "#e8e8e8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius='lg'
                key={chat._id}
                display='flex'
                flexDir='row'
                alignItems='center'
              >
                <Avatar
                  mr={2}
                  cursor='pointer'
                  name={getSender(loggedUser, chat.users)}
                  src={
                    !chat.isGroupChat
                      ? getSenderPic(loggedUser, chat.users)
                      : "https://www.shutterstock.com/image-vector/town-hall-vector-icon-on-260nw-2140190045.jpg"
                  }
                  size='md'
                />
                <Text px={3}>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
