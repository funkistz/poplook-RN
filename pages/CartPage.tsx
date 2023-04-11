import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Box, HStack, IconButton, Icon, FlatList, ScrollView, Text, Button } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addToCart, clearCart, getCart } from '../Redux/Slices/Cart';
import CartList from '../components/Cart/CartList';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { background, position } from 'native-base/lib/typescript/theme/styled-system';
import AuthService from '../Services/AuthService';
import { persistor } from '../Redux/app';

export default function CartPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const cart = useSelector((storeState: any) => storeState.cart);
    const user = useSelector((storeState: any) => storeState.session.user);
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
        user ? navigation.navigate('CheckoutPage', { screen: 'CheckoutPage' }) : navigation.navigate('Login', { screen: 'LoginPage' });
    }


    return (
        <>
            <Center backgroundColor="white">
                <ScrollView height="100%" mt={10}>
                    {cart && cart.data && cart.data.product_list &&
                        (
                            (cart.data.product_list.map((product: any, index: any) => {
                                return <CartList key={index} product={product}></CartList>
                            })
                            )
                        )
                    }
                    {cart && cart.data && cart.data.totalItemInCart == 0 ? <Text style={styles.bold}>Your shopping bag is empty.</Text> : null}
                    {cart && !cart.id_cart ? <Text style={styles.bold}>Your shopping bag is empty.</Text> : null}

                    {cart && cart.data && cart.data.totalItemInCart != 0 &&
                        <View style={styles.container}>
                            <Button style={styles.footer} onPress={() => checkoutPage()}>NEXT</Button>
                        </View>
                    }
                </ScrollView>
            </Center>

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