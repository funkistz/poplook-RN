import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Flex, Center, Image, Box, VStack, IconButton, Icon, AspectRatio, Text, HStack, DeleteIcon, } from 'native-base';
import ProductService from '../../Services/ProductService';
import { useNavigation } from '@react-navigation/native';
import Wishlist from '../wishlist';
import { useSelector } from 'react-redux';
import { addToCart } from '../../Redux/Slices/Wishlist';

export default function ProductCard({ product, route }: any) {

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

    const price = () => {
        const oldPrice = parseFloat(product.price_without_reduction)
        const newPrice = parseFloat(product.price)
        if (oldPrice > newPrice) {
            return <>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'gray' }} bold strikeThrough fontSize={12}>RM {product.price_without_reduction}</Text>
                    <Text style={{ color: 'red' }} bold fontSize={12}> RM {product.price}</Text>
                </View>
            </>
        } else {
            return <Text color='black' bold fontSize={12}>RM {product.price}</Text>
        }
    }

    const checkAttribute = () => {
        console.log(product)
    }


    return (
        <TouchableOpacity onPress={() => goToProductPage(product)}>
            <Box p={3} borderRadius={10} >
                <AspectRatio w="100%" ratio={3 / 4}>
                    {product && product.image_url && <Image resizeMode="cover" borderRadius={10} source={{
                        uri: Array.isArray(product.image_url) ? product.image_url[0] : product.image_url
                    }} alt="image" />}
                </AspectRatio>

                <Center>
                    <HStack mt={2} py={0} mb={4}>
                        <VStack style={{ width: 140, height: 30 }}>
                            {product.collection_name &&
                                <Text fontWeight={300} color='black' fontSize={11} >{product.collection_name}</Text>
                            }
                            <Text fontWeight={300} numberOfLines={2} color='black' fontSize={13}>{product.name}</Text>
                            {price()}
                        </VStack>

                        <Box alignItems="center" style={{ width: 40, height: 30 }} >
                            <IconButton aria-label="wishlist" onPress={() =>  product}>
                                <Wishlist like={wishlist.id_product.includes(product.id_product)} size={20}></Wishlist>
                            </IconButton>
                        </Box>
                    </HStack>
                </Center>
            </Box>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

})