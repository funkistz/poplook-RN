import React, { useEffect, useState } from 'react';
import { Button, Flex, HStack, ScrollView, Text, Box } from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from '../Redux/Slices/Sessions';
import Dialog from "react-native-dialog";

export default function DeleteAccountSuccessPage() {

    const { user } = useSelector(
        userSelector
    );
    const [visible, setVisible] = useState(false);

    useEffect(() => {

    }, [])

    const confirmDelete = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
      };
    
      const handleDelete = () => {
        setVisible(false);
      };


    return (
        <>
        <Flex flex={1} bg={'white'}>

        <ScrollView p={6}>
                {user &&
                    <>
                    <HStack space={3} >
                        <Text color='#000' fontSize={16} mb={3} fontWeight='bold'>Dear {user.name},</Text>
                    </HStack>
                    <HStack space={3} >
                        <Text color='#000' fontSize={15} mb={3}>We've received your request to delete your account. The deletion will be complete in 1-3 working days. You will receive a confirmation email on deletion. Thank you.</Text>
                    </HStack>
                    </>  
                }
            </ScrollView>
        </Flex>
        </>
    )
}