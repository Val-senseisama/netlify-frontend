import React from "react";
import { IconButton, Image, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
import { Button } from "@chakra-ui/react";

const ProfileModal = ({user, children}) =>{

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
    <>
        
       { children ? (
        <span onClick={onOpen}>{children}</span>
        ) : (
        <IconButton
        display={{base: "flex"}}
        icon= {<ViewIcon />}
        onClick={onOpen} />
       )}

       <Modal size={{ base: "xs", md: "md", lg:"lg" }} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
        h="410px">
          <ModalHeader
          fontSize="40px"
          fontFamily="Helvetica"
          display="flex"
          justifyContent= "center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between">
           <Image 
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
           />
           <Text
           fontSize={{base: "16px", md: "20px"}}
           fontFamily="Helvetica">
            Email: {user.email}
           </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        
        </>
    )

}

export default ProfileModal;
