import React, { useEffect, useState } from 'react';
import { HStack, VStack, Text } from 'native-base';
import { StyleSheet } from 'react-native';

export default function Address({ address, title }: { address: any, title: String }) {

    return (
        <HStack py={3}>
            <VStack paddingRight={8}>
                <Text style={styles.bold} mb={2}>{title} Address</Text>
                <Text style={styles.normal}>{address.firstname} {address.lastname}</Text>
                {address && address.company &&
                    <Text style={styles.normal}>{address.company}</Text>
                }
                <Text style={styles.normal}>{address.address1} {address.address2}</Text>
                <Text style={styles.normal}>{address.postcode} {address.city}</Text>
                {address && address.state &&
                    <Text style={styles.normal}>{address.state}</Text>
                }

                <Text style={styles.normal}>{address.country}</Text>
                <Text style={styles.normal}>{address.phone}</Text>
            </VStack>
        </HStack>
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
})