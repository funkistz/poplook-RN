import { Box, HStack, Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import WebView from 'react-native-webview';
import CartService from '../Services/CartService';
import { MODULE_API } from '@env';

export default function EghlPaymentPage({ route,  navigation } : { route: any, navigation: any}) {

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
        console.log('changeurl' ,navState)

        const _url = navState.url
      
        getSearchParamFromURL(_url, 'TxnStatus')
        
    };

    const getSearchParamFromURL = (url: any, param: any) => {
        const include = url.includes(param)
      
        if (!include) return null
      
        const params = url.split(/([&,?,=])/)
        const index = params.indexOf(param)
        const value = params[index + 2]
        setSatus(value);
        cartStep5(status)
    }
      

    React.useEffect(
        () => 
          navigation.addListener('beforeRemove', (e: any) => {
            e.preventDefault();
    
            Alert.alert(
              'Discard changes?',
              'You have unsaved changes. Are you sure to discard them and leave the screen?',
              [
                { text: "Don't leave", style: 'cancel', onPress: () => {} },
                {
                  text: 'Discard',
                  style: 'destructive',
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ]
            );
          }),
        [navigation]
    );

    const alertCancelOrder = () => {
        Alert.alert('Are you sure to close the payment screen?', '', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => cartStep5(0)
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

            if (paymentState == '31') {

                const param = {
                    id: orderId
                };

                navigation.navigate('Main', {
                    screen: 'My Account', params: {
                        screen: 'OrderSuccessPage'
                    }
                });

                // navigation.navigate('OrderSuccessPage', { screen: 'OrderSuccessPage', param: param })
            } else {
                navigation.navigate('Main', {
                    screen: 'My Account', params: {
                        screen: 'OrderHistoryListPage'
                    }
                });
            }
        } else {
            navigation.navigate('Main', {
                screen: 'My Account', params: {
                    screen: 'OrderHistoryListPage'
                }
            });
        }
    }

    return (
        <>
            <Box safeAreaTop/>
            <HStack px="1" py="1" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
                <HStack alignItems="center">
                <Button variant={'ghost'} onPress={() => alertCancelOrder()}>Close</Button> 
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
