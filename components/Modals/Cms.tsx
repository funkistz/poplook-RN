import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Center, Flex, Text, VStack, HStack, Icon, ScrollView } from 'native-base';
import WebView from 'react-native-webview';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function CmsModal({ visible, onToggle, data }: { visible: boolean, onToggle:any, data: any }) {


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
                <View style={{ flex: 1, paddingVertical: 20 }}>
                    <HStack mb={4}>
                        <HStack w={'90%'}>
                            <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 18, paddingBottom: 5 }}>{data.meta_title}</Text>
                        </HStack>
                        <HStack w={'10%'}>
                            <TouchableOpacity onPress={onToggle}>
                                <Icon
                                    size="6"
                                    color="black"
                                    as={<IonIcon name="close-outline" />}
                                />
                            </TouchableOpacity>
                        </HStack>
                    </HStack>
                    <WebView
                            originWhitelist={['*']}
                            source={{ html: '<style>h1,h2,h3,h4,p,span {font-size: 35px !important} a { color: #1cad48 !important;} </style><div style="padding: 0 30px">'  +data.content+'</>' }}
                        />
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        alignItems: "center" 
    },
});