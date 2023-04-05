import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Button, Flex, Text } from 'native-base';
import AddressDetailPage from '../../pages/AddressDetailPage';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';


export default function AddressEditModal({ visible, onToggle, isCheckout, id }: { visible: boolean, onToggle:any, isCheckout:boolean, id: any}) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const param = {
        id: id,
        is_update: true  
    }

    const params = {
        param  
    }

    // onToggle = () => {
    //     dispatch(clearAddress())
    // }

    useEffect(() => {
    }, [])


    return (
        <>
            <Modal
                presentationStyle='pageSheet'
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={onToggle}
            >
                <View style={{flex: 1}} >
                    <Flex direction="row-reverse">
                        <Button 
                            variant="unstyled"
                            onPress={onToggle}
                            mr={3}
                            mt={1}
                            size="16" 
                            bg="transparent" 
                            _text={{
                                color: "coolGray.800"
                            }}
                        >
                        Cancel
                        </Button>
                    </Flex>
                </View>
                <AddressDetailPage route={{ screen: 'AddressDetailPage', params: params }}></AddressDetailPage>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        backgroundColor: 'pink',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    button: {
        borderRadius: 10,
        padding: 6,
        sizes: 'md'
    },
    bold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    normal: {
        fontSize: 14,
        color: 'black'
    }
});