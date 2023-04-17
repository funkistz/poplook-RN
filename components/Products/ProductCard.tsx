import { StyleSheet, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Flex, Center, Image, Box, VStack, IconButton, Icon, AspectRatio, Text, HStack, DeleteIcon, } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Wishlist from '../wishlist';
import { useSelector } from 'react-redux';

export default function ProductCard({ product, route, openWishlist, hideWishlist = false }: any) {

    const { navigate } = useNavigation<any>();
    const wishlist = useSelector((storeState: any) => storeState.wishlist);

    const goToProductPage = (product: any) => {

        const params = {
            product_id: product.id_product
        };

        if(route) {
            route(product.id_product)
        } else {
            navigate('ProductDetailPage', params);
        }
        
        
    }

    const clickedWishlist = () => {
        openWishlist(null, product)
    }

    const price = () => {
        const oldPrice = parseFloat(product.price_without_reduction)
        const newPrice = parseFloat(product.price)
        if (oldPrice > newPrice) {
            return <>
                <View style={{ flexDirection: 'row' }}>
                    <Text color={'gray.500'} bold strikeThrough fontSize={12}>RM {product.price_without_reduction}</Text>
                    <Text style={{ color: 'red' }} bold fontSize={12}> RM {product.price}</Text>
                </View>
            </>
        } else {
            return <Text color='black' bold fontSize={12}>RM {product.price}</Text>
        }
    }

    useEffect(() => {
        console.log('product......', product)

    }, [])

    return (
        <TouchableOpacity onPress={() => goToProductPage(product)}>
            <Box p={3} borderRadius={10} >
                <AspectRatio w="100%" ratio={3 / 4}>
                    {product && product.image_url && 
                        <>
                            <ImageBackground
                                source={{  uri: Array.isArray(product.image_url) ? product.image_url[0] : product.image_url }}
                                style={{ flex: 1 }}
                                borderRadius={10}
                                resizeMode="cover">
                                {product.discount_text != null && 
                                    <View style={{ 
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                    }}>
                                        <Text py={1} 
                                            style={{ 
                                                color: 'white',
                                                fontSize: 10,
                                                backgroundColor: 'black',
                                                width: '100%',
                                                textAlign: 'center',
                                            }}>{product.discount_text}</Text>
                                    </View>
                                }
                                
                            </ImageBackground>
                        </>
                    }
                    
                </AspectRatio>

                <Center>
                    <HStack mt={2} py={0} mb={4}>
                        <VStack style={{ width: hideWishlist ? 160 : 140, height: 30 }}>
                            {product.collection_name &&
                                <Text fontWeight={300} color='black' fontSize={11} >{product.collection_name}</Text>
                            }
                            <Text fontWeight={300} numberOfLines={2} color='black' fontSize={13}>{product.name}</Text>
                            {price()}
                        </VStack>

                        {!hideWishlist && <>
                            <Box alignItems="center" style={{ width: 40, height: 30 }} >
                                <IconButton aria-label="wishlist" onPress={() =>  clickedWishlist()}>
                                    <Wishlist like={wishlist.id_product.includes(product.id_product)} size={20}></Wishlist>
                                </IconButton>
                            </Box>
                        </>}
                    </HStack>
                </Center>
            </Box>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

})