import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Button, Flex, HStack, Text, VStack } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useIsFocused } from '@react-navigation/native';
import { getAddressList } from '../Redux/Slices/Address';
import AddressList from '../components/AddressList';
import { useNavigation } from '@react-navigation/native';
import AddressAdd from '../components/Modals/AddressAdd';
import CartService from '../Services/CartService'

export default function AddressListPage({ route, onToggle }: any) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const isFocused = useIsFocused();
    const [isModalVisible, setModalVisible] = useState(false);
    const { isCheckout } = route.params;

    const address = useSelector((storeState: any) => storeState.address);
    const id_cart = useSelector((storeState: any) => storeState.cart.id_cart);

    useEffect(() => {

        if (isFocused) {
            dispatch(getAddressList());
        }

    }, [isFocused])

    useEffect(() => {

        console.log('navigation comeback')
        // dispatch(getAddressList());

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

            const response = await CartService.changeAddress(id_cart, address.id_address);
            const json = await response.json()

            navigation.goBack();
        }
        fetchData().catch(console.error);

    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
            <Flex flex={1} backgroundColor='white'>
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
                            return  <>
                            <View style={{ backgroundColor: 'white' }}>
                                <HStack width={'100%'} style={styles.border} _dark={{ borderColor: "#ccc" }} paddingX={4}>
                            
                                <VStack marginY={2}>
                                    <TouchableOpacity key={index} onPress={() => isCheckout ? chooseAddress(item) : ''}>
                                        <AddressList address={item} key={index} isCheckout={isCheckout}></AddressList>
                                    </TouchableOpacity>
                                </VStack>

                            </HStack>
                            </View>
                            </>

                        })
                        )
                    }

                    {address.data == null &&
                        <>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
                                <Text style={styles.no_data} mt={10}>No address available.</Text>
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
    no_data: {
        fontSize: 14,
        fontWeight: 'bold',
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
    checkbox: {
        borderColor: 'grey',
        backgroundColor: 'white',
    },
    default: {
        fontSize: 14,
        color: 'grey'
    },
})
