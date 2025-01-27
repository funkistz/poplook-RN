import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Box, HStack, IconButton, Icon, FlatList, ScrollView, Text, Button, Badge } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addToCart, clearCart, getCart } from '../Redux/Slices/Cart';
import CartList from '../components/Cart/CartList';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

export default function CartPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const cart = useSelector((storeState: any) => storeState.cart);
    const user = useSelector((storeState: any) => storeState.session.user);
    const session = useSelector((storeState: any) => storeState.session);
    const isFocused = useIsFocused();

    useEffect(() => {

        if (isFocused) {
            // persistor.purge().then(() => {
            dispatch(getCart());
            // });

            console.log('cart cart', cart);
        }

    }, [isFocused])


    const checkoutPage = () => {
        user ? navigation.navigate('CheckoutExPage', { screen: 'CheckoutExPage' }) : navigation.navigate('LoginPage', { screen: 'LoginPage' });
    }


    return (
        <>
            <Flex flex={1} flexDirection="column" backgroundColor='white' margin={0} >

                {cart && cart.data && cart.data.cart_messages &&
                    <>
                        {cart.data.cart_messages.map((message: any, index: any) => {
                            return <Badge colorScheme="success" variant={'subtle'} bgColor={'green.100'} padding={2} marginX={3} marginY={1} key={index}>{message}</Badge>
                        })
                        }
                    </>
                }

                {cart && cart.data && cart.data.totalItemInCart == 0 ? <Text style={styles.bold} mt={10}>Your shopping bag is empty.</Text> : null}
                {cart && !cart.id_cart ? <Text style={styles.bold} mt={10}>Your shopping bag is empty.</Text> : null}
                {cart && cart.data && cart.data.product_list && cart.data.product_list.length > 0 &&
                    <>
                        {cart.data.product_list.length > 0 && <>
                            <ScrollView flex={1}>
                                {cart.data.product_list.map((product: any, index: any) => {
                                    return <CartList key={index} product={product}></CartList>
                                })
                                }
                            </ScrollView>
                            <HStack px="1" py="2" bg={'gray.100'} justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
                                <HStack alignItems="center" w="40%">
                                    <Text fontSize="15" color="black" pl={2} bold> SubTotal</Text>
                                </HStack>
                                <HStack justifyContent="flex-end" w="30%" alignItems={'center'} mr={3}>
                                    <Text color='black' bold>{session.country.currency_sign} {cart.data.totalProductsWt}</Text>
                                </HStack>
                            </HStack>
                            <HStack px="1" py="2" bg={'gray.100'} justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
                                <HStack alignItems="center" w="40%">
                                    <Text fontSize="15" color="black" pl={2} bold> Shipping</Text>
                                </HStack>
                                <HStack justifyContent="flex-end" w="30%" alignItems={'center'} mr={3}>
                                    <Text color='black' bold>{Number(cart.data.shipping_price) == 0 ? 'Free Shipping' : session.country.currency_sign + ' ' + cart.data.shipping_price}</Text>
                                </HStack>
                            </HStack>
                            <HStack px="1" py="2" bg={'gray.100'} justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
                                <HStack alignItems="center" w="40%">
                                    <Text fontSize="15" color="black" pl={2} bold> TOTAL PAYABLE</Text>
                                </HStack>
                                <HStack justifyContent="flex-end" w="30%" alignItems={'center'} mr={3}>
                                    <Text color='black' bold>{session.country.currency_sign} {(Number(cart.data.totalProductsWt) + Number(cart.data.shipping_price)).toFixed(2)}</Text>
                                </HStack>
                            </HStack>
                            <HStack style={{ height: 50, paddingVertical: 5, marginHorizontal: 20, marginVertical: 10 }}  >
                                <Button w={'100%'} style={styles.footer} onPress={() => checkoutPage()}>NEXT</Button>
                            </HStack>
                        </>
                        }

                    </>
                }
            </Flex>

        </>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    footer: {
        backgroundColor: '#1cad48'
    },
    bold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    }
})