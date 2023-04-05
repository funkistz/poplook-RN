import React, { useEffect, useState } from 'react';
import { HStack, Text, VStack, Spacer , View} from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddressEditModal from './Modals/AddressEdit';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { persistor } from '../Redux/app';
import { clearAddress } from '../Redux/Slices/AdressSelected';

const win = Dimensions.get('window'); 

export default function AddressList({ address, isCheckout }: {address: any, isCheckout: any}) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const editAddressPage = (addressId: any) => {

        console.log('masuk')

        const param = {
            id: addressId,
            is_update: false
        }

        navigation.navigate('AddressDetailPage', { screen: 'AddressDetailPage', param: param });
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
        <View style={{ backgroundColor: 'white'}}>
        <VStack style={styles.border} _dark={{ borderColor: "grey" }} marginX={3} marginTop={2}>
            <Text style={styles.bold}>{address.firstname} {address.lastname} | {address.phone}</Text>
            <Text style={styles.normal}>{address.address1} {address.address2}</Text>
            <Text style={styles.normal}>{address.postcode} {address.city}</Text>
            <Text style={styles.normal}>{address.state}</Text>
            <HStack>
                <Text style={styles.normal} marginBottom={2}>{address.country}</Text>
                <Spacer/>
                <TouchableOpacity onPress={() => isCheckout ? toggleModal() : editAddressPage(address.id_address)}>
                <Text color={'#1cad48'} fontSize={14} paddingRight={3} fontWeight={'600'}>EDIT</Text>
                </TouchableOpacity>
            </HStack>
        </VStack>
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
        fontSize: 13,
        color: 'black'
    },
    normal: {
        fontSize: 13,
        color: 'grey'
    },
    border: {
        borderBottomWidth: 1,
    }
});