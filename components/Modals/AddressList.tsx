import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, VStack, Flex, Button } from 'native-base';
import AddressList from '../AddressList';
import AddressListPage from '../../pages/AddressListPage';
import { useNavigation } from '@react-navigation/native';


export default function AddressModal({ visible, onToggle, isCheckout }: { visible: boolean, onToggle:any, isCheckout:boolean}) {

    const navigation: any = useNavigation();
   
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
                <View style={{flex: 32}} >
                    <VStack alignContent="flex-start" mb={'auto'} justifyContent= 'center'>
                        <Text style={styles.bold} marginY={4} marginLeft={3}>Select Address</Text>
                        <AddressListPage isCheckout={isCheckout} onToggle={onToggle}></AddressListPage>
                    </VStack>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
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