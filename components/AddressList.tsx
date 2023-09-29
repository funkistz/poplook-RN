import React, { useState } from 'react';
import { HStack, Text, VStack, Checkbox, Badge, Radio } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddressEditModal from './Modals/AddressEdit';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getAddressList, setDefaultAddress } from '../Redux/Slices/Address';

const win = Dimensions.get('window');

export default function AddressList({ address, isCheckout }: { address: any, isCheckout: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleCheckBoxPress = async (id: any) => {

        setIsChecked(!isChecked);

        const params = {
            id_address: id,
            value: 1
        }
        await dispatch(setDefaultAddress(params))
        dispatch(getAddressList())
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
            <VStack marginY={2}>
                <Text style={styles.bold}>{address.firstname} {address.lastname} | {address.phone}</Text>
                <Text style={styles.normal}>{address.address1} {address.address2}</Text>
                <Text style={styles.normal}>{address.postcode} {address.city}</Text>
                {address && address.state &&
                    <Text style={styles.normal}>{address.state}</Text>
                }
                <Text style={styles.normal}>{address.country}</Text>
            </VStack>

            <HStack justifyContent={'space-between'} width={'88%'}>
                <Checkbox
                    size="md"
                    value='1'
                    isChecked={address.is_default === "1"}
                    onChange={() => handleCheckBoxPress(address.id_address)}
                    style={styles.checkbox}
                    accessibilityLabel="Default Address"
                    isDisabled={address.is_default === "1"}
                ><Text style={styles.default}>Default Address</Text>
                </Checkbox>

                <TouchableOpacity onPress={() => isCheckout ? editAddressExPage(address.id_address) : editAddressPage(address.id_address)}>
                    <Text color={'#1cad48'} fontSize={14} fontWeight={'600'}>EDIT</Text>
                </TouchableOpacity>
            </HStack>
                
            <AddressEditModal
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
    default: {
        fontSize: 14,
        color: 'grey'
    }
});