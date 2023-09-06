import React, { useEffect } from 'react';
import { Box, HStack, IconButton, StatusBar, Text, Center, Flex, VStack, Image, AspectRatio, Button, Backdrop } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { delToCart, getCart } from '../../Redux/Slices/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/Feather';
import GeneralService from '../../Services/GeneralService';
import { addToWishlist, delWishlist } from '../../Redux/Slices/Wishlist';

const win = Dimensions.get('window');

export default function CartUpdate({ product, openUpdateCart }: any) {

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

        console.log('PRODUCT SHEET', product)

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

        Alert.alert('Remove product from  cart?', '', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => deleteCart(product)
            },
        ]);
    }

    const addtoWishlist = async (id_product: any, id_product_attribute: any, quantity: any) => {

        if (session.user == null) {
            return GeneralService.toast({ description: 'To use Wishlist function, please log in to your account.' });
        }

        const params = {
            id_product: id_product,
            id_product_attribute: id_product_attribute,
            quantity: quantity
        }

        await dispatch(addToWishlist(params));
        await dispatch(getCart())
    }

    const updateCart = () => {

        openUpdateCart()
    }

    return (
        <>
            <TouchableOpacity onPress={goToProductPage}>
                <Flex style={styles.container}>
                    <Box w={100}>
                        <AspectRatio ratio={2 / 3}>
                            <Image resizeMode="cover" source={{
                                uri: product.image_url
                            }} alt="image" />
                        </AspectRatio>
                    </Box>
                    <Box flexGrow={1} width={1} pl={4}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text color='black' bold fontSize={13} w={'88%'}>{product.name}</Text>
                        </View>

                        {product.price_wt > 0 && <Text color='black' bold fontSize={13}>{session.country.currency_sign} {product.price_wt}</Text>}

                    
                    </Box>
                </Flex>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: win.width,
    },
    delete: {
        backgroundColor: 'white',
    }
});