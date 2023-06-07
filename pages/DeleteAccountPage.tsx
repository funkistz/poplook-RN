import React, { useEffect, useState } from 'react';
import { Button, Flex, HStack, ScrollView, Text, Box } from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../Redux/Slices/Sessions';
import Dialog from "react-native-dialog";
import { persistor } from '../Redux/app';
import { logout } from '../Redux/Slices/Sessions';
import { clearCart } from '../Redux/Slices/Cart';
import { clearCheckout } from '../Redux/Slices/Checkout';
import { clearAddress } from '../Redux/Slices/Address';
import { getWishList } from '../Redux/Slices/Wishlist';

export default function DeleteAccountPage({ navigation }: { navigation: any }) {

    const { user } = useSelector(userSelector);
    const dispatch = useDispatch()
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
        navigation.navigate('DeleteAccountSuccessPage', { screen: 'DeleteAccountSuccessPage'})

        persistor.purge().then(() => {
            dispatch(logout())
            dispatch(getWishList())
            dispatch(clearCart())
            dispatch(clearCheckout())
            dispatch(clearAddress())
        });
    };


    return (
        <>
        <Flex flex={1} bg={'white'}>

        <Dialog.Container visible={visible}>
            <Dialog.Title>Delete Account</Dialog.Title>
            <Dialog.Description>Please enter the email associated with your account.</Dialog.Description>
            <Dialog.Input placeholder="Email Address"></Dialog.Input>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>

        <ScrollView p={6}>
                {user &&
                    <>
                    <HStack space={3} >
                        <Text color='#000' fontSize={16} mb={3} fontWeight='bold'>Dear {user.name},</Text>
                    </HStack>
                    <HStack space={3} >
                        <Text color='#000' fontSize={15} mb={3}>We are sorry to see you go, but if you have made up your mind do take note that when your account is deleted:</Text>
                    </HStack>
                    <HStack space={3} >
                        <Text color='#000' fontSize={15} mb={3}>1. All your data will be removed and any points earned for the account will be forfeited.</Text>
                    </HStack>
                    <HStack space={3} >
                        <Text color='#000' fontSize={15} mb={3}>2. After successful deletion of your account, you will not be able to access your Poplook account.</Text>
                    </HStack>
                    <HStack space={3} >
                        <Text color='#000' fontSize={15} mb={3}>3. You will no longer be able to track any purchases, return and/or exchange online.</Text>
                    </HStack>
                    <HStack space={3} >
                        <Text color='#000' fontSize={15} mb={3}>4. You will no longer receive e-mails for promotions from Poplook.</Text>
                    </HStack>
                    </>  
                }
            </ScrollView>
            <Box backgroundColor='#ffffff' p={5}>
                <Button style={styles.footer} onPress={() => confirmDelete()}>PROCEED</Button>
            </Box>
        </Flex>
        </>
    )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#1cad48'
    },
})