import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Button, Flex, HStack, Text, Checkbox, VStack, Badge, Spacer } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useIsFocused } from '@react-navigation/native';
import { getAddressList, setDefaultAddress } from '../Redux/Slices/Address';
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
    const [selectedOption, setSelectedOption] = useState('');

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
            const response = await CartService.cartStep2(id_cart, address.id_address);
            const json = await response.data;
            navigation.goBack();
        }
        fetchData().catch(console.error);

    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSelectOption = (id: any) => {

        const params = {
            id_address: id,
            value: 1
        }
        dispatch(setDefaultAddress(params))
    };

    const editAddressPage = (addressId: any) => {

        const param = {
            id: addressId,
            is_update: true,
            isCheckout: isCheckout
        }

        navigation.navigate('AddressDetailPage', { screen: 'AddressDetailPage', param: param });
    }

    const editAddressExPage = (addressId: any) => {

        const param = {
            id: addressId,
            is_update: true,
            isCheckout: isCheckout
        }

        navigation.navigate('AddressDetailExPage', { screen: 'AddressDetailExPage', param: param, isCheckout: true });
    }

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
                                    
                                    <HStack justifyContent={'space-between'} width={'88%'}>
                                    <Checkbox
                                        value='1'
                                        key={item.id_address}
                                        isChecked={item.id_address === selectedOption}
                                        onChange={() => handleSelectOption(item.id_address)}
                                        style={styles.checkbox}
                                        accessibilityLabel="Default Address"
                                    ><Text style={styles.default}>Default Address</Text>
                                    </Checkbox>
                                    <TouchableOpacity onPress={() => isCheckout ? editAddressExPage(item.id_address) : editAddressPage(item.id_address)}>
                                        <Text color={'#1cad48'} fontSize={14} fontWeight={'600'}>EDIT</Text>
                                    </TouchableOpacity>
                                    </HStack>

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
