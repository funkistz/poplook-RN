import React, { useEffect, useState } from 'react';
import { Flex, Button, View, Text, HStack, } from 'native-base';
import { StyleSheet, Platform, Linking} from 'react-native';

export default function ProductCard() {

    useEffect(() => {

    }, [])

    const submit = () => {
        if(Platform.OS == 'ios') {
            Linking.openURL('https://apps.apple.com/us/app/poplook/id1081245738?platform=iphone')
        } else {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.tiseno.poplook&hl=en&gl=US')
        }
    }

    return (
        <>
            <Flex flex={1} backgroundColor={'#fff'}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text color='black' bold fontSize={20}>POPLOOK needs an update </Text>
                    </View>
                    <Text color='black' fontSize={13} mb={4}>To use this app, download the latest version</Text>
                    <Button
                        bg={'#1cad48'}
                        style={styles.search}
                        _text={{ fontSize: 14, fontWeight: 600 }}
                        onPress={submit}
                    >Update
                    </Button>
                </View>
            </Flex>

        </>
    );
}

const styles = StyleSheet.create({
    search: {
        borderRadius: 10,
        padding: 6,
        sizes: 'md',
        width: '70%',
        height: 45,
    },
});