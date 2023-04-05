import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Button } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useIsFocused } from '@react-navigation/native';
import { getAddressList } from '../Redux/Slices/Address';
import Address from '../components/Address';
import AddressList from '../components/AddressList';
import { useNavigation } from '@react-navigation/native';

export default function AddressListPage({ isCheckout }: any) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const address = useSelector((storeState: any) => storeState.address);
    const isFocused = useIsFocused();


    useEffect(() => {

        if (isFocused) {
            dispatch(getAddressList());
            console.log('addresslistpage', address);
        }

    }, [isFocused])


    const addAddressPage = () => {

        const param = {
            id: null,
            is_update: false
        }

        navigation.navigate('AddressDetailPage', { screen: 'AddressDetailPage', param: param });
    }



    return (
        <>
            <ScrollView>
                {address && address.data &&
                    (address.data.map((item: any, index: any) => {
                        return <AddressList address={item} key={index} isCheckout={isCheckout}></AddressList>
                    })
                    )
                }
                <View style={styles.container}>
                    <Button
                        bg={'#1cad48'}
                        mb={3}
                        mt={3}
                        style={styles.button}
                        _text={{ fontSize: 14, fontWeight: 600 }}
                        onPress={() => addAddressPage()}>ADD NEW ADDRESS
                    </Button>
                </View>
            </ScrollView>
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
