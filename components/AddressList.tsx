import React, { useEffect, useState } from 'react';
import { HStack, Text, VStack, Spacer, View, Box, Checkbox, Badge, Radio } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddressEditModal from './Modals/AddressEdit';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { persistor } from '../Redux/app';
import { clearAddress } from '../Redux/Slices/AdressSelected';

const win = Dimensions.get('window');

export default function AddressList({ address, isCheckout }: { address: any, isCheckout: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState('');

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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
            <View style={{ backgroundColor: 'white' }}>
                <HStack width={'100%'} style={styles.border} _dark={{ borderColor: "grey" }}>

                    <VStack justifyContent={'center'} marginX={3}>
                        <Checkbox value='defaultAddress' size='sm' style={styles.checkbox}></Checkbox>
                    </VStack>

                    <VStack marginY={2}>
                    
                        <Text style={styles.bold}>{address.firstname} {address.lastname} | {address.phone}</Text>
                        <Text style={styles.normal}>{address.address1} {address.address2}</Text>
                        <Text style={styles.normal}>{address.postcode} {address.city}</Text>
                        {address && address.state &&
                            <Text style={styles.normal}>{address.state}</Text>
                        }
                        <Text style={styles.normal} marginBottom={2}>{address.country}</Text>
                        <HStack justifyContent={'space-between'} width={'80%'}>
                            <Badge variant={'outline'} alignSelf="center" colorScheme="green" _text={{ fontSize : 11 , color: '#1cad48'}}>
                                DEFAULT
                            </Badge>
                            <TouchableOpacity onPress={() => isCheckout ? editAddressExPage(address.id_address) : editAddressPage(address.id_address)}>
                                <Text color={'#1cad48'} fontSize={14} paddingRight={3} fontWeight={'600'}>EDIT</Text>
                            </TouchableOpacity>
                        </HStack>
                        <HStack>
                       
                        </HStack>

                    </VStack>
                </HStack>
                
            
                <AddressEditModal
                    visible={isModalVisible}
                    onToggle={toggleModal}
                    isCheckout={true}
                    id={address.id_address}
                />
            </View>


        </>

    );
}

const styles = StyleSheet.create({
    bold: {
        fontSize: 14,
        color: 'black'
    },
    normal: {
        fontSize: 14,
        color: 'grey'
    },
    border: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    checkbox: {
        borderColor: 'black',
        backgroundColor: 'white'
    },
});