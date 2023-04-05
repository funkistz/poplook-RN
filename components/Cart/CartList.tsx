import React, { useEffect, useState } from 'react';
import { Box, HStack, IconButton, Icon, StatusBar, Text, Center, Flex, VStack, Image, AspectRatio, View } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const win = Dimensions.get('window');

export default function CartList({ product }: any) {

    // console.log('CartList', product);
    const { navigate } = useNavigation<any>();

    const goToProductPage = () => {

        const params = {
            product_id: product.id_product
        };

        navigate('ProductDetailPage', params);
    }

    return (
        <>
            <TouchableOpacity onPress={goToProductPage}>
                <Flex style={styles.container}>
                    <Box w={100}>
                        <AspectRatio ratio={3 / 4}>
                            <Image resizeMode="cover" borderRadius={10} source={{
                                uri: product.image_url
                            }} alt="image" />
                        </AspectRatio>
                    </Box>
                    <Box flexGrow={1} width={1} pl={4}>
                        <Text color='black' bold fontSize={15}>{product.name}</Text>
                        {product.price_wt > 0 && <Text color='black' bold fontSize={14}>RM {product.price_wt}</Text>}
                        {product.price_wt <= 0 && <Text color='black' bold fontSize={14}>Free</Text>}

                        <View mt={2} width={100}></View>
                        {product.attributes_small && (
                            <Text color='black' >Size: {product.attributes_small}</Text>
                        )}
                        <Text color='black'>Ref No: {product.reference}</Text>
                        <Text color='black'>Quantity: {product.quantity}</Text>
                        <Text color='black'>Total: {product.total_wt}</Text>
                    </Box>
                </Flex>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: win.width,
        padding: 10
    },
});