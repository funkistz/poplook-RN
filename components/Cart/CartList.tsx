import React, { useEffect, useState } from 'react';
import { Box, HStack, IconButton, Icon, StatusBar, Text, Center, Flex, VStack, Image, AspectRatio, View } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { delToCart, getCart } from '../../Redux/Slices/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import IonIcon from 'react-native-vector-icons/Ionicons';

const win = Dimensions.get('window');

export default function CartList({ product }: any) {

    // console.log('CartList', product);
    const { navigate } = useNavigation<any>();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const cart = useSelector((storeState: any) => storeState.cart);
    const session = useSelector((storeState: any) => storeState.session);

    const goToProductPage = () => {

        const params = {
            product_id: product.id_product
        };

        navigate('ProductDetailPage', params);
    }

    useEffect(() => {

    }, [])

    const deleteCart = async (product: any) => {

        const params = {
            id_cart: cart.id_cart,
            id_product: product.id_product,
            id_product_attribute: product.id_product_attribute,
        }


        await dispatch(delToCart(params))
        await dispatch(getCart())
    }


    const alertDelete = (product: any) => {
        console.log('Alert Delete.......t', product)
        Alert.alert('Remove product from  cart?', '', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {   text: 'OK', 
            onPress: () => deleteCart(product)},
        ]);
    }


    return (
        <>
            <TouchableOpacity onPress={goToProductPage}>
                <Flex style={styles.container}>
                    <Box w={100}>
                        <AspectRatio ratio={2/3}>
                            <Image resizeMode="cover" borderRadius={10} source={{
                                uri: product.image_url
                            }} alt="image" />
                        </AspectRatio>
                    </Box>
                    <Box flexGrow={1} width={1} pl={4}>
                        <Text color='black' bold fontSize={15}>{product.name}</Text>
                        {product.price_wt > 0 && <Text color='black' bold fontSize={14}>{session.country.currency_sign} {product.price_wt}</Text>}
                        {product.price_wt <= 0 && <Text color='black' bold fontSize={14}>Free</Text>}
                        
                        <HStack mt={2}>
                            <Box w={'70%'}>
                                {product.attributes_small && (
                                    <Text color='black' >Size: {product.attributes_small}</Text>
                                )}
                                <Text color='black'>Ref No: {product.reference}</Text>
                                <Text color='black'>Quantity: {product.quantity}</Text>
                            </Box>
                            <Box w={'30%'} style={{flex: 1, justifyContent: 'flex-end',alignItems: 'center',}}>
                                <IconButton 
                                    size={'sm'}
                                    onPress={() => alertDelete(product)} 
                                    style={styles.delete}
                                    icon={<IonIcon name="trash-outline" size={22} color="black" />}
                                />
                            </Box>
                        </HStack>
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
    delete : {
        backgroundColor: 'white',
    }
});