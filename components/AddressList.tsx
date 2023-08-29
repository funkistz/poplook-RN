import React, { useEffect, useState } from 'react';
import { HStack, Text, VStack, Spacer, View, Box, Checkbox, Badge, Radio } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

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
});