import React, { useEffect, useState } from 'react';
import { Box, HStack, Text, Flex, VStack, Image, AspectRatio, Button, Backdrop, ScrollView } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity, View, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import SizeList from '../Products/SizeList';

const win = Dimensions.get('window');

export default function CartUpdate({ product }: any) {

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

    const price = () => {
        const oldPrice = parseFloat(product.price_without_reduction)
        const newPrice = parseFloat(product.price)
        if (oldPrice > newPrice) {
            return <>
                <View style={{ flexDirection: 'row' }}>
                    <Text color={'gray.400'} strikeThrough fontSize={14}>{session.country.currency_sign} {product.price_without_reduction}</Text><Text style={{ color: 'red' }} bold fontSize={13}> {session.country.currency_sign} {product.price}</Text>
                </View>
            </>
        } else {
            return <Text color='black' bold fontSize={14}>{session.country.currency_sign} {product.price}</Text>
        }
    }

    const getTextColor = (id_product_attribute: any) => {

        return ('' != id_product_attribute) ? '#000' : '#fff';
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <TouchableOpacity onPress={goToProductPage}>
                <Flex style={styles.container}>
                    <Box w={100}>
                        {product && product.image_url &&
                            <AspectRatio ratio={2 / 3}>
                                <Image resizeMode="cover" source={{
                                    uri: product.image_url[0]
                                }} alt="image" />
                            </AspectRatio>
                        }

                        <View>
                        {/* <ScrollView> */}
                            <Text color={'black'} bold mt={5} mb={2}>Select Size: </Text>
                            
                            {/* <SizeList attribute={product.attribute_list} setSizeSelected={''} sizeSelected={''}></SizeList> */}
                            
                                <Flex direction="row">
                                {product.attribute_list && product.attribute_list.length > 0 && product.attribute_list.map((res: any, index: any) => {
                                    return <Button key={index} style={styles.chip} variant="outline" size='sm'
                                        backgroundColor={('' == res.id_product_attribute) ? '#000' : '#fff'}
                                        borderColor={('' == res.id_product_attribute) ? '#000' : '#ccc'}
                                        width={Platform.OS == "ios" ? res.attribute_name.includes("Year") ? (win.width / 5) : (win.width/ 6 - 2.5) :  res.attribute_name.includes("Year") ? (win.width / 5) + 2: (win.width/ 6 - 2.5)}
                                        _text={{ color: getTextColor(res.id_product_attribute), fontSize: 13 }}
                                        isDisabled={res.quantity <= 0 ? true : false}
                                        >
                                        {res.attribute_name}
                                    </Button>
                                })}
                                </Flex>
                                {/* </ScrollView> */}
                        </View>
                    </Box>

                    
                    <Box flexGrow={1} width={1} pl={4}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text color='black' bold fontSize={14} w={'88%'}>{product.name}</Text>
                            
                            {price()}

                            <Text color={'black'} fontSize={13} mt={3}>Colours</Text>
                            <ScrollView horizontal={true}>
                                <HStack mb={2} mt={2}>
                                    {product.color_related && product.color_related.map((res: any) => {
                                        return <TouchableOpacity>
                                            <Image style={styles.tinyLogo} source={{ uri: res.image_color_url }} />
                                        </TouchableOpacity>
                                    })}
                                </HStack>
                            </ScrollView>
                        </View> 
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
    },
    tinyLogo: {
        width: 38,
        height: 38,
        borderRadius: 40,
        marginHorizontal: 2,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    chip: {
        marginRight: 8,
        color: '#000',
        // width: (win.width / 5) + 2,
        // borderColor: '#ccc',
        borderRadius: 8,
        // height: 30,
        // padding: 0,
        marginBottom: 8,
    },
});