import { StyleSheet, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Flex, Center, Image, Box, VStack, IconButton, Icon, AspectRatio, Text, HStack, DeleteIcon, } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Wishlist from '../wishlist';
import { useSelector } from 'react-redux';
import GeneralService from '../../Services/GeneralService';

export default function ProductCard({ product, route, openWishlist, hideWishlist = false }: any) {

    const navigation:any = useNavigation();
    const wishlist = useSelector((storeState: any) => storeState.wishlist);
    const session = useSelector((storeState: any) => storeState.session);

    const goToProductPage = (product: any) => {

        const params = {
            product_id: product.id_product
        };

        // if (route) {
        //     route(product.id_product)
        // } else {
        //     navigate('ProductDetailPage', params);
        // }

        navigation.push('ProductDetailPage', params)
    }

    const clickedWishlist = () => {
        if (session.user == null) {
            return GeneralService.toast({ description: 'To use Wishlist function, please log in to your account.' });

        }
        openWishlist(null, product)
    }

    const price = () => {
        const oldPrice = parseFloat(product.price_without_reduction)
        const newPrice = parseFloat(product.price)
        if (oldPrice > newPrice) {
            return <>
                <View style={{ flexDirection: 'row' }}>
                    <Text color={'gray.400'} strikeThrough fontSize={12}>{session.country.currency_sign} {product.price_without_reduction}</Text>
                    <Text style={{ color: 'red' }} bold fontSize={12}> {session.country.currency_sign} {product.price}</Text>
                </View>
            </>
        } else {
            return <Text color='black' bold fontSize={12}>{session.country.currency_sign} {product.price}</Text>
        }
    }

    useEffect(() => {

    }, [])

    return (
        <TouchableOpacity onPress={() => goToProductPage(product)}>
            <Box p={3} borderRadius={10} >
                <AspectRatio w="100%" ratio={2/3}>
                    {product && product.image_url &&
                        <>
                            <ImageBackground
                                source={{ uri: Array.isArray(product.image_url) ? product.image_url[0] : product.image_url }}
                                style={{ flex: 1 }}
                                resizeMode="cover">
                                {product.discount_text != null && product.quantity > 0 &&
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                    }}>
                                        <Text py={1}
                                            style={{
                                                color: 'white',
                                                fontSize: 8,
                                                backgroundColor: '#000',
                                                width: '100%',
                                                textAlign: 'center',
                                            }}>{product.discount_text}</Text>
                                    </View>
                                }
                                {product.quantity == 0 &&
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                    }}>
                                        <Text py={1}
                                            style={{
                                                color: 'white',
                                                fontSize: 8,
                                                backgroundColor: '#000',
                                                // opacity: 0.8,
                                                width: '100%',
                                                textAlign: 'center',
                                                textTransform: 'uppercase'

                                            }}>out of stock</Text>
                                    </View>
                                }
                            </ImageBackground>
                        </>
                    }

                </AspectRatio>

                <Center>
                    <Flex direction='row'>
                        <Box style={{flexGrow: 1 }} width={'60%'} mt={3}>
                            {product.collection_name &&
                                <Text fontWeight={300} color='black' fontSize={11}>{product.collection_name}</Text>
                            }
                            <Text fontWeight={300} numberOfLines={2} color='black' fontSize={13}>{product.name}</Text>
                            {price()}
                        </Box>
                        {!hideWishlist && <Box width={'12%'} marginLeft={2}>
                            <IconButton aria-label="wishlist" onPress={() => clickedWishlist()} _pressed={{ backgroundColor: "white" }}>
                                <Wishlist like={wishlist.id_product.includes(product.id_product)} size={20}></Wishlist>
                            </IconButton>
                        </Box> }
                    </Flex>
                </Center>
            </Box>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

})