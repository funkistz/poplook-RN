import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Button, Flex, HStack } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useIsFocused } from '@react-navigation/native';
import { getAddressList } from '../Redux/Slices/Address';
import Address from '../components/Address';
import AddressList from '../components/AddressList';
import { useNavigation } from '@react-navigation/native';
import { getCartStep1 } from '../Redux/Slices/Checkout';
import AddressAdd from '../components/Modals/AddressAdd';

export default function AddressListPage({ isCheckout, onToggle }: { onToggle:any, isCheckout:boolean}) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const address = useSelector((storeState: any) => storeState.address);
    const country = useSelector((storeState: any) => storeState.session.country);
    const isFocused = useIsFocused();
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {

        if (isFocused) {
            dispatch(getAddressList());
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

        const param = {
            gift: "",
            address_id: address.id_address
        }

        dispatch(getCartStep1(param))

        onToggle()

    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
        <Flex flex={isCheckout ? 0 : 1} backgroundColor='white'>
        <ScrollView>
                {address && address.data != null && address.data.length > 0 &&
                    (address.data.map((item: any, index: any) => {
                        return <>
                            <TouchableOpacity onPress={() => isCheckout ? chooseAddress(item) : ''}>
                                <AddressList address={item} key={index} isCheckout={isCheckout}></AddressList>
                            </TouchableOpacity>
                        </>
                        
                    })
                    )
                }
            </ScrollView>
            <HStack style={{ height: 50, paddingVertical: 5, marginHorizontal: 20, marginVertical: 10 }}  >
            <Button bg={'#1cad48'} w={'100%'} _text={{ fontSize: 14, fontWeight: 600}}
                    onPress={() => isCheckout ? toggleModal() : addAddressPage()}>ADD NEW ADDRESS</Button>
            </HStack>
        </Flex>
        <AddressAdd
            visible={isModalVisible}
            onToggle={toggleModal}
            isCheckout={true}
            id={address.id_address}
        />
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
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
})
