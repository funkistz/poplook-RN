import React, { useEffect, useState } from 'react';
import { HStack, Text, VStack, Spacer, View } from 'native-base';
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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
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
            <View style={{ backgroundColor: 'white' }}>
                <VStack style={styles.border} _dark={{ borderColor: "grey" }} marginX={3} marginTop={2}>
                    <Text style={styles.bold}>{address.firstname} {address.lastname} | {address.phone}</Text>
                    <Text style={styles.normal}>{address.address1} {address.address2}</Text>
                    <Text style={styles.normal}>{address.postcode} {address.city}</Text>
                    {address && address.state &&
                        <Text style={styles.normal}>{address.state}</Text>
                    }
                    <HStack>
                        <Text style={styles.normal} marginBottom={2}>{address.country}</Text>
                        <Spacer />
                        <TouchableOpacity onPress={() => isCheckout ? editAddressExPage(address.id_address) : editAddressPage(address.id_address)}>
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


            <HStack justifyContent={'space-between'} width={'85%'}>
                {/* <Checkbox
                    value='1'
                    key={item.id_address}
                    isChecked={item.id_address === selectedOption}
                    onChange={() => handleSelectOption(item.id_address)}
                    style={styles.checkbox}
                    accessibilityLabel="Default Address"
                ><Text style={styles.default}>Default Address</Text>
                </Checkbox> */}
                <Text style={styles.normal}>{address.country}</Text>
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
    }
});