import React, { useEffect, useState } from 'react';
import { Button, Flex, HStack, ScrollView, Text, Box } from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../Redux/Slices/Sessions';
import { persistor } from '../Redux/app';
import { logout } from '../Redux/Slices/Sessions';
import { clearCart } from '../Redux/Slices/Cart';
import { clearCheckout } from '../Redux/Slices/Checkout';
import { clearAddress } from '../Redux/Slices/Address';
import { getWishList } from '../Redux/Slices/Wishlist';

export default function DeleteAccountSuccessPage() {

    const { user } = useSelector( userSelector);
    const dispatch = useDispatch()

    useEffect(() => {

        const timer = setTimeout(() => {
            persistor.purge().then(() => {
                dispatch(logout())
                dispatch(getWishList())
                dispatch(clearCart())
                dispatch(clearCheckout())
                dispatch(clearAddress())
            });
          }, 5000); 
      
        return () => clearTimeout(timer);

    }, [])


    return (
        <>
        <Flex flex={1} bg={'white'}>

        <ScrollView p={6}>
                {user &&
                    <>
                    <HStack>
                        <Text color='#000' fontSize={17} mb={3} fontWeight='bold'>Dear {user.name},</Text>
                    </HStack>
                    <HStack>
                        <Text color='#000' fontSize={16} mb={3}>We've received your request to delete your account. The deletion will be complete in 1-3 working days. You will receive a confirmation email on deletion. Thank you.</Text>
                    </HStack>
                    </>  
                }
            </ScrollView>
        </Flex>
        </>
    )
}