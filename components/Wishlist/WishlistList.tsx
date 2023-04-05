import React, { useEffect, useState } from 'react';
import { Box, HStack, IconButton, Icon, StatusBar, Text, Center, Flex, VStack, Image, AspectRatio, View, Button } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getWishList, delWishlist, addToCart } from '../../Redux/Slices/Wishlist';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import IonIcon from 'react-native-ionicons'

const win = Dimensions.get('window');

export default function WishlistList({ product, currency }: any) {

    const { navigate } = useNavigation<any>();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const wishlist = useSelector((storeState: any) => storeState.wishlist);

    const goToProductPage = () => {

        const params = {
            product_id: product.id_product
        };

        navigate('ProductDetailPage', params);
    }

    const addtoCart = async (product: any) => {
        // console.log('addtocart.....')
        const params = {
            id_product: product.id_product,
            id_product_attribute: product.id_product_attribute,
            quantity: product.quantity
        }
        await dispatch(addToCart(params))
        await dispatch(getWishList())
    }

    const deleteWishlist = async (product: any) => {
        const params = {
            id_product: product.id_product,
            id_product_attribute: product.id_product_attribute,
        }

        await dispatch(delWishlist(params))
        await dispatch(getWishList())
    }

    const alertDelete = (product: any) => {
        Alert.alert('Remove product from  wishlist?', '', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => deleteWishlist(product)
            },
        ]);
    }

    const alertAddtoCart = (product: any) => {
        Alert.alert('Add Product to cart?', '', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => addtoCart(product)
            },
        ]);
    }
    return <>
        <TouchableOpacity onPress={goToProductPage}>
            <Flex style={styles.container}>
                <Box w={100}>
                    <AspectRatio ratio={3 / 5}>
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
                    <Text color='black'>Total: {currency.prefix}{product.price}</Text>
                    <HStack mt={2}>
                        <Box w={'80%'}>
                            <Button
                                leftIcon={<Icon as={IonIcon} name="cart-outline" size="sm" color="white" />} size={'sm'}
                                style={styles.btnAddtoCart}
                                _text={{ fontSize: 12, fontWeight: 600 }}
                                onPress={() => alertAddtoCart(product)}>
                                Add to Bag
                            </Button>
                        </Box>
                        <Box w={'20%'} px={2}>
                            <IconButton
                                size={'sm'}
                                onPress={() => alertDelete(product)}
                                style={styles.delete}
                                icon={<IonIcon name="trash-outline" size={22} color="black" />
                                }
                            />
                        </Box>
                    </HStack>

                </Box>
            </Flex>
        </TouchableOpacity>
    </>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: win.width,
        padding: 10
    },
    btnAddtoCart: {
        // height: 20,
        backgroundColor: '#1cad48',
        width: '50%',
        flexDirection: 'row'
    },
    delete: {
        backgroundColor: 'white'
    }
});