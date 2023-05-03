import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Button, Flex } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useIsFocused } from '@react-navigation/native';
import { getAddressList } from '../Redux/Slices/Address';
import Address from '../components/Address';
import AddressList from '../components/AddressList';
import { useNavigation } from '@react-navigation/native';

export default function AddressListPage({ isCheckout, onToggle }: { onToggle:any, isCheckout:boolean}) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const address = useSelector((storeState: any) => storeState.address);
    const isFocused = useIsFocused();

    useEffect(() => {

        if (isFocused) {
            dispatch(getAddressList());
            console.log('addresslistpage2', address.data);
        }

    }, [isFocused])


    const addAddressPage = () => {

        const param = {
            id: null,
            is_update: false
        }

        navigation.navigate('AddressDetailPage', { screen: 'AddressDetailPage', param: param });
    }

    const chooseAddress = (address: any) => {

        onToggle()
        
        const params = {
          data: address,
          action: 'checkout'
        }
    
        console.log('hantar' ,params);
    
        navigation.navigate('CheckoutPage', { screen: 'CheckoutPage', param: params });

    }



    return (
        <>
        <Flex backgroundColor='white'>
        <ScrollView>
            {address && address.data.length > 0 &&
                (address.data.map((item: any, index: any) => {
                    return <>
                        <TouchableOpacity onPress={() => isCheckout ? chooseAddress(item) : ''}>
                            <AddressList address={item} key={index} isCheckout={isCheckout}></AddressList>
                        </TouchableOpacity>
                    </>
                    
                })
                )
            }
            <View style={styles.container}>
                <Button bg={'#1cad48'} marginY={3} style={styles.button} _text={{ fontSize: 14, fontWeight: 600}}
                onPress={() => addAddressPage()}>ADD NEW ADDRESS</Button>
            </View>
        </ScrollView>
        </Flex>
        
        </>
    );
    }

        


const styles = StyleSheet.create({
    bold: {
        fontSize: 13,
        color: 'black'
    },
    normal: {
        fontSize: 13,
        color: 'grey'
    },
    border: {
        borderBottomWidth: 1,
    },
    button: {
        borderRadius: 10,
        sizes: 'md'
    },
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
})
