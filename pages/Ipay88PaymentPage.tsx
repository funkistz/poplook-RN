import { Box, HStack, Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import WebView from 'react-native-webview';
import CartService from '../Services/CartService';
import { MODULE_API } from '@env';

export default function Ipay88PaymentPage({ route, navigation }: { route: any, navigation: any }) {

    const form = route.params.form;
    const orderId = route.params.order_id;
    const paymentType = route.params.payment_type;
    const transId = route.params.trans_id;
    const amount = route.params.amount;

    const data = {
        form: form
    };

    const [currentUrl, setCurrentUrl] = useState('');
    const [paymentState, setPaymentState] = React.useState('');
    const [status, setSatus] = React.useState('');

    const handleNavigationStateChange = (navState: any) => {
        console.log('changeurl', navState)

        const _url = navState.url

        if (_url.includes('ipay88_mobile_response')) {
            getSearchParamFromURL(_url)
        }

    };

    const getSearchParamFromURL = (url: any) => {

        var regex = /[?&]([^=#]+)=([^&#]*)/g, params: any = {}, match;

        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        }

        if (params.status) {
            console.log('status', params.status)

            setSatus(params.status);
            cartStep5(params.status)
        }

    }

    const alertCancelOrder = () => {
        Alert.alert('Are you sure to close the payment screen?', '', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
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
                                                state: {
                                                    routes: [{
                                                        name: 'OrderHistoryListPage'
                                                    }],
                                                },
                                            }],
                                        },
                                    }],
                                },
                            },
                        ],
                    });
                }
            },
        ]);
    }

    const cartStep5 = async (status: any) => {

        console.log('txnstatus', status)

        const response = await CartService.cartStep5(orderId, status, paymentType, transId, amount);
        const json = await response.json();

        console.log('cartstep5', json)

        if (json.status == 200 && json.data) {
            setPaymentState(json.data.payment_state)

            if (paymentState == '18') {

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
                                            state: {
                                                routes: [{
                                                    name: 'OrderHistoryListPage'
                                                }],
                                            },
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
                                        state: {
                                            routes: [{
                                                name: 'OrderHistoryListPage'
                                            }],
                                        },
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
