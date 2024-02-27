import { Box, HStack, Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import WebView from 'react-native-webview';
import CartService from '../Services/CartService';
import { MODULE_API } from '@env';
import { useSelector } from 'react-redux';

export default function EghlPaymentPage({ route, navigation }: { route: any, navigation: any }) {

    const form = route.params.form;
    const orderId = route.params.order_id;
    const paymentType = route.params.payment_type;
    const transId = route.params.trans_id;
    const amount = route.params.amount;

    const cartId = useSelector((storeState: any) => storeState.cart.id_cart);

    const data = {
        form: form
    };

    const [status, setSatus] = React.useState('');

    const handleNavigationStateChange = (navState: any) => {

        const _url = navState.url

        if (_url.includes('ipay88_mobile_response')) {
            getSearchParamFromURLEnets(_url)
        }

        if (_url.includes('callback_mobile.php')) {
            getSearchParamFromURLEghl(_url)
        }

        if (_url == 'https://poplook.com/modules/sgcreditcard/callback_mobile.php?return_url=1') {
            confirmSuccess()
        }

    };

    const getSearchParamFromURLEnets = (url: any) => {

        var regex = /[?&]([^=#]+)=([^&#]*)/g, params: any = {}, match;

        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        }

        if (params.status) {

            setSatus(params.status);
            cartStep5(params.status)
        }

    }

    const getSearchParamFromURLEghl = (url: any) => {

        var regex = /[?&]([^=#]+)=([^&#]*)/g, params: any = {}, match;

        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        }

        if (params.TxnStatus) {

            setSatus(params.TxnStatus);
            cartStep5(params.TxnStatus)
        }

    }

    const confirmSuccess = () => {
        Alert.alert('Thank you. Your payment is successful', '', [
            {
                text: 'OK',
                onPress: () => cartStep5(0)
            },
        ]);
    }

    const cartStep5 = async (data: any) => {

        let newStatus = ''

        if (data == '1') {
            newStatus = '0';
        } else {
            newStatus = '1';
        }

        const response = await CartService.cartStep5(cartId, orderId, newStatus, paymentType, transId, amount);
        const json = await response.data;

        if (json.code == 200 && json.data) {

            if (json.data.payment_state == '31' || json.data.payment_state == '28') {

                const param = {
                    id: orderId
                };

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'OrderSuccessPage', params: param }]
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Main',
                            state: {
                                routes: [{
                                    name: 'My Account',
                                    state: {
                                        routes: [{
                                            name: 'SettingPage',
                                            params: { redirect: 'order-history' },
                                        }],
                                    },
                                }],
                            },
                        },
                    ],
                });
            }
        } else {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'Main',
                        state: {
                            routes: [{
                                name: 'My Account',
                                state: {
                                    routes: [{
                                        name: 'SettingPage',
                                        params: { redirect: 'order-history' },
                                    }],
                                },
                            }],
                        },
                    },
                ],
            });
        }
    }

    return (
        <>
            <Box safeAreaTop />
            <HStack px="1" py="1" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
                <HStack alignItems="center">
                    {/* <Button variant={'ghost'} onPress={() => alertCancelOrder()}>Close</Button> */}
                </HStack>
                <HStack>
                </HStack>
            </HStack>
            <WebView
                originWhitelist={['*']}
                source={{ uri: MODULE_API + 'enets/eghl_pay.php?' + new URLSearchParams(data) }}
                onNavigationStateChange={handleNavigationStateChange}
            />
        </>

    );
}
