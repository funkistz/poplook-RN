import React, { useEffect, useState } from 'react';
import { HStack , Checkbox, Text , Spacer} from 'native-base';
import { StyleSheet } from 'react-native';

export default function ShippingMethod({ carrier }: any) {

    return (
        <HStack py={3}>
            <Checkbox value="newsletter" marginLeft={3} style={styles.checkbox} _text={{ color: 'black', fontSize: 12 }}><Text style={styles.normal}>{carrier.name}</Text></Checkbox>
            <Spacer/>
            <Text style={styles.normal}>{carrier.price}</Text>
        </HStack>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        borderColor: 'black',
        backgroundColor: 'white'
    },
    normal: {
        fontSize: 14,
        color: 'black'
    },
})