import React, { useEffect, useState } from 'react';
import { VStack, HStack, Text, Image, AspectRatio, Box } from 'native-base';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function ProductDetail({ product }: { product: any }) {

    const currency = useSelector((storeState: any) => storeState.session.currencySign);

    return (
        <Box borderRadius={10}>
            <HStack>
                <AspectRatio w="30%" ratio={3 / 4}>
                    <Image resizeMode="cover" borderRadius={10} source={{ uri: product.image_url }} alt="image" />
                </AspectRatio>

                <VStack mx={3} mt={1} flexShrink={1}>
                    <Text color='black' fontSize={13} fontWeight={'500'} pb={2}>{product.name}</Text>
                    {product.attributes_small && <Text color='grey' fontSize={12}>Size: {product.attributes_small}</Text>}
                    <Text color='grey' fontSize={12}>Ref No: {product.reference}</Text>
                    <Text color='grey' fontSize={12}>Unit Price: {currency} {product.price_wt}</Text>
                    <Text color='black' fontSize={12} fontWeight={'500'}>Quantity: {product.quantity}</Text>
                    <Text color='black' fontSize={12} fontWeight={'500'}>Total Price: {currency} {product.total_wt}</Text>
                </VStack>
            </HStack>
        </Box>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    border: {
        borderBottomWidth: 1,
        borderColor: 'muted.100',
        paddingRight: 8
    },
})