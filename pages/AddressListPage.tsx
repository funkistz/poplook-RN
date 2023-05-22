import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Button, Flex, HStack, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useIsFocused } from '@react-navigation/native';
import { getAddressList } from '../Redux/Slices/Address';
import Address from '../components/Address';
import AddressList from '../components/AddressList';
import { useNavigation } from '@react-navigation/native';
import { assignCheckoutAddress } from '../Redux/Slices/Checkout';
import AddressAdd from '../components/Modals/AddressAdd';
import CartService from '../Services/CartService'

export default function AddressListPage({ route, onToggle }: any) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const address = useSelector((storeState: any) => storeState.address);
    const isFocused = useIsFocused();
    const [isModalVisible, setModalVisible] = useState(false);
    const { isCheckout } = route.params;
    const id_cart = useSelector((storeState: any) => storeState.cart.id_cart);

    useEffect(() => {

        if (isFocused) {
            dispatch(getAddressList());
            // console.log('addresslist', address)
        }

    }, [isFocused])

    useEffect(() => {

        console.log('navigation comeback')

    }, [navigation])


    const addAddressPage = () => {

        const param = {
            id: null,
            is_update: false,
            is_checkout: false
        }

        navigation.navigate('AddressDetailPage', { screen: 'AddressDetailPage', param: param });
    }

    const addAddressCheckoutPage = () => {

        const param = {
            id: null,
            is_update: false,
            is_checkout: true
        }

        navigation.navigate('AddressDetailPage', { screen: 'AddressDetailPage', param: param });
    }

    const chooseAddress = async (address: any) => {

        const fetchData = async () => {
            const response = await CartService.cartStep2(id_cart, address.id_address);
            const json = await response.json();
            navigation.goBack();
        }
        fetchData().catch(console.error);

    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
            <Flex flex={isCheckout ? 0 : 1} backgroundColor='white'>
                <AddressAdd
                    visible={isModalVisible}
                    onToggle={toggleModal}
                    isCheckout={true}
                    id={address.id_address}
                />
                <ScrollView>
                    <HStack style={{ height: 50, paddingVertical: 5, marginHorizontal: 20, marginVertical: 10 }}  >
                        <Button bg={'#1cad48'} w={'100%'} _text={{ fontSize: 14, fontWeight: 600 }} _pressed={{ backgroundColor: '#1cad48' }}
                            onPress={() => isCheckout ? addAddressCheckoutPage() : addAddressPage()}>ADD NEW ADDRESS</Button>
                    </HStack>
                    {address && address.data != null && address.data.length > 0 &&
                        (address.data.map((item: any, index: any) => {
                            return <TouchableOpacity key={index} onPress={() => isCheckout ? chooseAddress(item) : ''}>
                                <AddressList address={item} key={index} isCheckout={isCheckout}></AddressList>
                            </TouchableOpacity>

                        })
                        )
                    }

                    {address.data == null &&
                        <>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
                                <Text color='black' fontSize={14}>No address available.</Text>
                            </View>

                        </>
                    }
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
