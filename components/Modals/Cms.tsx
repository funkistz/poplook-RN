import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Button, Center, Flex, Text, VStack } from 'native-base';
import WebView from 'react-native-webview';

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
                <View style={{flex: 1}}>
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
                <View style={{flex: 32}} >
                    <VStack alignContent="flex-start" mb={'auto'} justifyContent= 'center'>
                        <Text style={styles.bold} marginBottom={5} marginLeft={3}>{data.meta_title}</Text>
                    </VStack>
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: '<style>h1,h2,h3,h4,p,span {font-size: 35px !important} </style><div style="padding: 0 30px">'  +data.content+'</>' }}
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