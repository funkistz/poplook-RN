import React, { useEffect, useState } from 'react';
import { VStack, HStack, Text, Image, AspectRatio, Box} from 'native-base';
import { StyleSheet } from 'react-native';

export default function ProductDetail({ product } : { product: any }) {

    return (
        <Box borderRadius={10}>
            <HStack>
                <AspectRatio w="40%" ratio={3/4}>
                    <Image resizeMode="cover" borderRadius={10} source={{uri: product.image_url}} alt="image"/>
                </AspectRatio>
        
                <VStack m={3} flexShrink={1}>
                    <Text color='black' fontSize={13} fontWeight={'500'} pb={2}>{product.name}</Text>
                    <Text color='grey' fontSize={12}>Size: {product.attributes_small}</Text>
                    <Text color='grey' fontSize={12}>Ref No: {product.reference}</Text>
                    <Text color='grey' fontSize={12}>Unit Price: {product.price_wt}</Text>
                    <Text color='black' fontSize={12} fontWeight={'500'}>Quantity: {product.quantity}</Text>
                    <Text color='black' fontSize={12} fontWeight={'500'}>Total Price: {product.total_wt}</Text>
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