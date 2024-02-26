import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, ImageBackground, Alert, ActivityIndicator, AppState, Dimensions, Platform } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, Box, AspectRatio, Radio, Input, Divider, Checkbox, Link, VStack, Select, CheckIcon, Flex, TextArea } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { clearLeaveMessage, getCartStep1, getGiftMessage, leaveMessageCheckout } from '../Redux/Slices/Checkout';
import Address from '../components/Address';
import ShippingMethod from '../components/ShippingMethod';
import AddressModal from '../components/Modals/AddressList';
import CartService from '../Services/CartService';
import { handlePaymentURL } from 'react-native-atome-paylater';
import { isAtomeAppInstalled } from 'react-native-atome-paylater';
import PaymentService from '../Services/PaymentService';
import GeneralService from '../Services/GeneralService';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CmsService from '../Services/CmsService';
import CmsModal from '../components/Modals/Cms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearCart, delToCart } from '../Redux/Slices/Cart';

export default function CheckoutPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const currency = useSelector((storeState: any) => storeState.session.country.currency_sign);
    const cartId = useSelector((storeState: any) => storeState.cart.id_cart);
    const giftWrap = useSelector((storeState: any) => storeState.cart.gift_wrap);
    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);
    const country = useSelector((storeState: any) => storeState.session.country);
    const user = useSelector((storeState: any) => storeState.session.user);
    const address = useSelector((storeState: any) => storeState.checkout.address);
    // const carrier = useSelector((storeState: any) => storeState.checkout.address ? storeState.checkout.carrier[0] : '');
    const carrier = useSelector((storeState: any) => storeState.checkout.carrier[0]);
    const payment = useSelector((storeState: any) => storeState.checkout.payment);
    const product = useSelector((storeState: any) => storeState.checkout.product);
    const gift_wrap_id = useSelector((storeState: any) => storeState.checkout.id_gift);
    const gift_wrap = useSelector((storeState: any) => storeState.checkout.gift_wrap);
    const gift_wrap_exist = useSelector((storeState: any) => storeState.checkout.gift_wrap_exist);
    const gift_option = useSelector((storeState: any) => storeState.checkout.gift_option);
    const gift_message = useSelector((storeState: any) => storeState.checkout.gift_message);
    const shipping_fee = useSelector((storeState: any) => storeState.checkout.shipping_fee);
    const total_price = useSelector((storeState: any) => storeState.checkout.total_price);
    const total_product = useSelector((storeState: any) => storeState.checkout.total_product);
    const discount = useSelector((storeState: any) => storeState.checkout.discount);
    const voucher_list = useSelector((storeState: any) => storeState.checkout.voucher);
    const credit_store_list = useSelector((storeState: any) => storeState.checkout.storeCredit);
    const text_message = useSelector((storeState: any) => storeState.checkout.message);
    const free_order = useSelector((storeState: any) => storeState.checkout.free_order);

    const [gift, setGift] = React.useState(giftWrap ? '1' : '0');
    const [message, setMessage] = React.useState('');
    const [paymentType, setPaymentType] = React.useState('');
    const [paymentChild, setPaymentChild] = React.useState('');
    const [isAddressModalVisible, setAdressModalVisible] = useState(false);
    const [isCmsModalVisible, setCmsModalVisible] = useState(false);
    const [url, setUrl] = useState<any>('');
    const [appUrl, setAppUrl] = useState<any>('');
    const [giftMessage, setGiftMessage] = useState(gift_message);
    const [leaveMessage, setLeaveMessage] = useState('');
    const [cms, setCms] = useState<any>({});
    const [termAgree, setTermAgree] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState<any>('');
    const [transId, setTransId] = useState<any>('');
    const [result, setResult] = useState('');

    const [referenceId, setReferenceId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [paymentChoose, setPaymentChoose] = useState('');

    // Voucher
    const [voucher, setVoucher] = React.useState('');
    
    const win = Dimensions.get('window');

    useEffect(() => {
        console.log('from navigation text_message', text_message);

        const unsubscribe = navigation.addListener('focus', () => {

            if (text_message) {
                setMessage('1')
                setLeaveMessage(text_message)
            }
            
            if (gift_option) {
                // setGift('1')
                if (gift_message) {
                    // setGiftMessage(gift_message)
                }
            }

            const param = {
                gift: giftWrap ? '1' : '0',
                gift_wrap_id: gift_wrap_id ? gift_wrap_id[0] : '',
                gift_message: gift_message,
                address_id: address ? address.id : ''
            }

            dispatch(getCartStep1(param))
        });

        return unsubscribe;

        // Return the function to unsubscribe from the event so it gets removed on unmount

    }, [navigation]);

    useEffect(() => {

        if (giftMessage != gift_message) {

            const timeOutId = setTimeout(() => {
                const param = {
                    gift_message: giftMessage
                }

                dispatch(getGiftMessage(param));

            }, 500);

            return () => clearTimeout(timeOutId);
        }

    }, [giftMessage])

    useEffect(() => {

        const timeOutId = setTimeout(() => {
            dispatch(leaveMessageCheckout(leaveMessage))
        }, 500);

        const appState = AppState.addEventListener('change', handleAppStateChange);

        const init = async () => {
            const installed = await isAtomeAppInstalled();
            setResult(installed ? 'Yes' : 'No')
            console.log('install ke tak', installed);
        };
        init().catch(console.error);

        return () => {
            clearTimeout(timeOutId)
            appState.remove()
        };


    }, [leaveMessage])

    useEffect(() => {
        if (gift != gift_option) {
            console.log('from gift', gift);
            const param = {
                gift: gift,
                gift_wrap_id: gift_wrap_id ? gift_wrap_id[0] : '',
                gift_message: giftMessage,
                address_id: address ? address.id : null
            }
            
            dispatch(getCartStep1(param))
        }

    }, [gift])


    const handleAppStateChange = async (nextAppState: any) => {

        if (nextAppState === 'background' || nextAppState === 'inactive') {
            console.log('back')
        } else if (nextAppState === 'active') {

            const refId = await AsyncStorage.getItem('referenceId');
            const orderId = await AsyncStorage.getItem('orderId');
            const paymentChoose = await AsyncStorage.getItem('paymentChoose');

            if (paymentChoose == 'atome') {
                getPaymentInfo(refId, orderId)
            }
        }
    }

    const toggleAddressModal = () => {

        navigation.navigate('AddressListExPage', { screen: 'AddressListExPage', isCheckout: true });
    };

    const toggleCmsModal = async (key: any) => {
        setCmsModalVisible(!isCmsModalVisible);
        const response = await CmsService.getCmsDetails(key);
        const json = await response.json();
        setCms(json.data[0]);
    };

    const validateVoucher = async () => {

        const params = {
            code: voucher,
            id_cart: cartId,
            id_shop: user.id_shop,
        }

        const response = await CartService.addVoucher(cartId, params);
        const json = await response.data;

        if (json.code == 200) {
            setVoucher('');
            dispatch(getCartStep1({ gift: gift, address_id: address ? address.id : null }))
            GeneralService.toast({ description: json.message });
        } else {
            GeneralService.toast({ description: json.message });
        }
    }
    const alertDeleteVoucher = (id_cart_rule: any) => {
        Alert.alert('Remove voucher?', '', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => delVoucher(id_cart_rule)
            },
        ]);
    }
    const delVoucher = async (id_cart_rule: any) => {

        const params = {
            id_cart: cartId,
            id_cart_rule: id_cart_rule,
        }

        const response = await CartService.deleteVoucher(cartId, params);
        const json = await response.data;

        if (json.code == 200) {
            dispatch(getCartStep1({ gift: gift, address_id: address ? address.id : null }))
            GeneralService.toast({ description: json.message });
        }
    }

    const outStock = async (message: any) => {
        for (let i = 0; i < product.length; i++) {
    
            if (product[i].active == 0 || product[i].quantity_available <= 0) {

                const id_product = product[i].id_product
                const id_product_attribute = product[i].id_product_attribute
    
                Alert.alert('Item out of stock', message + ' and will be remove from your cart.', [
                    {
                        text: 'Proceed',
                        onPress: async () => {
                            const params = {
                                id_cart: cartId,
                                id_product: id_product,
                                id_product_attribute: id_product_attribute,
                            }
    
                            dispatch(delToCart(params))
    
                            const param = {
                                gift: gift_option,
                                gift_wrap_id: gift_wrap_id ? gift_wrap_id[0] : '',
                                gift_message: gift_message,
                                address_id: address ? address.id : ''
                            }

                            await dispatch(getCartStep1(param))
                        }
                    },
                ]);
    
            }
        }
    }
    
    const cartStep4 = async () => {

        if (paymentType && termAgree) {

            setIsLoading(true)

            if (paymentType == '2' || paymentType == '8') {
                if (paymentChild) {
                    const response = await CartService.cartStep4(cartId, paymentSelected(), leaveMessage);
                    const json = await response.data;

                    if (json.code == 200 && json.data) {

                        setIsLoading(false)

                        dispatch(clearCart())
                        dispatch(clearLeaveMessage())

                        setPaymentChoose(json.data.payment_selected.payment_method);
                        await AsyncStorage.setItem('paymentChoose', json.data.payment_selected.payment_method);

                        if (shopId == '1') {
                            ipay(json.data)
                        }
                    } else {
                        outStock(json.message)
                    }
                } else {
                    setIsLoading(false)
                    GeneralService.toast({ description: 'Please select payment type' });
                }
            } else if (paymentType == '0') {
                const response = await CartService.cartStep4(cartId, paymentSelected(), leaveMessage);
                const json = await response.data;

                if (json.code == 200 && json.data) {

                    setIsLoading(false)

                    dispatch(clearCart())
                    dispatch(clearLeaveMessage())

                    const param = {
                        id: json.data.id_order
                    };
    
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'OrderSuccessPage', params: param }]
                    });
                }

            } else if (paymentType == '17') {
                const response = await CartService.cartStep4(cartId, paymentSelected(), leaveMessage);
                const json = await response.data;

                if (json.code == 200 && json.data) {

                    setIsLoading(false)

                    dispatch(clearCart())
                    dispatch(clearLeaveMessage())

                    const param = {
                        id: json.data.id_order
                    };
    
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'OrderSuccessPage', params: param }]
                    });
                }

            } else if (paymentType == '7') {
                const response = await CartService.cartStep4(cartId, paymentSelected(), leaveMessage);
                const json = await response.data;

                if (json.code == 200 && json.data) {

                    setIsLoading(false)

                    dispatch(clearCart())
                    dispatch(clearLeaveMessage())

                    const param = {
                        id: json.data.id_order
                    };
    
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'OrderSuccessPage', params: param }]
                    });
                }
            
            } else {
                const response = await CartService.cartStep4(cartId, paymentSelected(), leaveMessage);
                const json = await response.data;

                if (json.code == 200 && json.data) {

                    setIsLoading(false)

                    dispatch(clearCart())
                    dispatch(clearLeaveMessage())

                    setPaymentChoose(json.data.payment_selected.payment_method);
                    await AsyncStorage.setItem('paymentChoose', json.data.payment_selected.payment_method);

                    setOrderId(json.data.id_order);
                    await AsyncStorage.setItem('orderId', json.data.id_order.toString());

                    if (shopId == '1') {
                        if (paymentType == '16') {
                            atome()
                        } else if (paymentType == '3') {
                            ipay(json.data)
                        }
                    } else if (shopId == '2') {
                        if (paymentType == '4') {
                            eghl(json.data)
                        } else {
                            enets(json.data)
                        }
                    } else {
                        if (paymentType == '1') {
                            paypal(json.data)
                        } else {
                            ipayUsd(json.data)
                        }
                    }
                } else {
                    outStock(json.message)
                }
            }
        } else {
            if (!paymentType) {
                GeneralService.toast({ description: 'Please choose payment type' });
            } else {
                GeneralService.toast({ description: 'You must agree to Term of Service and Privacy Policy before continuing.' });
            }
        }
    }

    const cartStep5 = async (orderId: any, status: any, paymentMethod: any, transId: any, amount: any) => {

        const response = await CartService.cartStep5(cartId, orderId, status, paymentMethod, transId, amount);
        const json = await response.data;

        console.log('cartstep5', json)

        if (json.code == 200 && json.data) {

            if (json.data.payment_state == '42' || json.data.payment_state == '18') {

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

    const paymentSelected = () => {

        if (shopId == 1) {
            if (paymentType == '16') {
                return 'atome';
            } else if (paymentType == '0') {
                return 'free_order';
            } else if (paymentType == '17') {
                return 'staff_purchase';
            } else if (paymentType == '7') {
                return 'payment_to_store';
            } else if (paymentType == '8') {
                if (paymentChild == '538') {
                    return 'tng'
                } else if (paymentChild == '210') {
                    return 'boost'
                } else if (paymentChild == '912') {
                    return 'setel'
                } else if (paymentChild == '523') {
                    return 'GrabPay'
                } else if (paymentChild == '801') {
                    return 'Shopee Pay'
                }
            } else {
                return 'ipay88'
            }
        } else if (shopId == 2) {
            if (paymentType == '4') {
                return 'sgd_cc';
            } else if (paymentType == '5') {
                return 'enets'
            } else if (paymentType == '0') {
                return 'free_order';
            }
        } else if (shopId == 3) {
            if (paymentType == '1') {
                return 'usd_paypal';
            } else if (paymentType == '0') {
                return 'free_order';
            } else {
                return 'usd_cc'
            } 
        }

        return paymentType;

    };

    const paymentId = () => {

        if (shopId == 1) {
            if (paymentType == '2') {
                return paymentChild;
            } else if (paymentType == '8') {
                return paymentChild;
            } else if (paymentType == '3') { // Credit Card (MYR)
                return 2;
            }
        } else if (shopId == 2) {

        } else if (shopId == 3) {
            if (paymentType == '6') { //Credit Card (USD)
                return 25;
            }
        }

        return paymentType;

    };

    const atome = async () => {

        setIsLoading(true)

        const response = await PaymentService.atome(cartId);
        const json = await response.json();

        console.log('atome', json)


        if (json.code == '200' && json.data) {
            setIsLoading(false)
            setUrl(json.data.redirect_url);
            setAppUrl(json.data.app_payment_url);

            setReferenceId(json.data.reference_id);
            await AsyncStorage.setItem('referenceId', json.data.reference_id);

            handlePaymentURL(result ? json.data.app_payment_url : json.data.redirect_url)
        }
    }

    const getPaymentInfo = async (refId: any, orderId: any) => {

        const response = await PaymentService.getPaymentInfo(refId);
        const json = await response.json();

        console.log('paymentinfo', json)

        setTransId(json.paymentTransaction);
        setAmount(json.amount);

        if (json.status == 'PAID') {
            await cartStep5(orderId, '1', 'atome', json.paymentTransaction, json.amount)
        } else {
            await cartStep5(orderId, '0', 'atome', json.paymentTransaction, json.amount)
        }
    }

    const ipay = async (data: any) => {

        let payment = ''
        
        if (paymentType == '8') {
            if (paymentChild == '538') {
                payment = 'tng'
            } else if (paymentChild == '210') {
                payment = 'boost'
            } else if (paymentChild == '912') {
                payment = 'setel'
            } else if (paymentChild == '523') {
                payment = 'GrabPay'
            } else if (paymentChild == '801') {
                payment = 'Shopee Pay'
            }
        }

        const response = await PaymentService.payIpay(data.id_cart, user.id_customer, paymentId(), payment);
        const json = await response.json();

        console.log('payIpay', json);

        if (json.code == '200') {
            const params = {
                form: json.data.results,
                order_id: data.id_order,
                payment_type: 'ipay88',
                trans_id: null,
                amount: data.totalPriceWt * 100
            };

            navigation.reset({
                index: 0,
                routes: [{
                    name: 'Ipay88PaymentPage',
                    params: params
                }]
            });
        } else {

        }
    }

    const ipayUsd = async (data: any) => {

        const response = await PaymentService.payIpayUsd(data.id_cart, user.id_customer, paymentId());
        const json = await response.json();

        console.log('IpayUsd', json);

        if (json.code == '200') {
            const params = {
                form: json.data.results,
                order_id: data.id_order,
                payment_type: 'usd_cc',
                trans_id: null,
                amount: data.totalPriceWt * 100
            };

            navigation.reset({
                index: 0,
                routes: [{
                    name: 'Ipay88PaymentPage',
                    params: params
                }]
            });
        } else {

        }
    }

    const eghl = async (data: any) => {

        const response = await PaymentService.eghl(cartId, data.id_order);
        const json = await response.json();

        console.log('redirectEghl', json.data);

        const param = {
            form: json.data.results,
            order_id: data.id_order,
            payment_type: 'sgd_cc',
            trans_id: null,
            amount: data.totalPriceWt * 100
        };

        navigation.reset({
            index: 0,
            routes: [{ name: 'EghlPaymentPage', params: param }]
        });

    }

    const enets = async (data: any) => {

        const response = await PaymentService.enets(cartId, data.id_order);
        const json = await response.json();

        console.log('redirectEnets', json.data)

        const param = {
            form: json.data.results,
            order_id: data.id_order,
            payment_type: 'enets',
            trans_id: null,
            amount: data.totalPriceWt * 100
        };

        navigation.reset({
            index: 0,
            routes: [{ name: 'EghlPaymentPage', params: param }]
        });
    }

    const paypal = async (data: any) => {

        const response = await PaymentService.paypal(data.id_cart, user.id_customer, paymentId());
        const json = await response.json();

        console.log('paypal', json);

        if (json.code == '200') {
            const params = {
                form: json.data.results,
                order_id: data.id_order,
                payment_type: 'usd_paypal',
                trans_id: null,
                amount: data.totalPriceWt * 100
            };

            navigation.reset({
                index: 0,
                routes: [{
                    name: 'Ipay88PaymentPage',
                    params: params
                }]
            });
        } else {

        }
    }

    return (
        <>
            <Flex flex={1} flexDirection="column" backgroundColor='white' margin={0} safeAreaBottom>
                <ScrollView>
                    <View style={styles.container} pt={4}>

                        {!address &&
                            <><TouchableOpacity onPress={toggleAddressModal}>
                                <Text style={styles.bold}>Shipping Address</Text>
                                <Text style={styles.red} marginY={3} color={'red.600'}>Please Add Address</Text>
                            </TouchableOpacity>
                            </>
                        }
                        {address &&
                            <>
                                <TouchableOpacity onPress={toggleAddressModal}>
                                    <Text style={styles.bold}>Shipping Address</Text>
                                    <Address address={address}></Address>
                                </TouchableOpacity>
                            </>
                        }
                        <AddressModal
                            visible={isAddressModalVisible}
                            onToggle={toggleAddressModal}
                            isCheckout={true}
                        />
                        <Divider bg="#ccc" />

                        {address &&
                            <>
                                <Text style={styles.bold} mt={4}>Shipping Method</Text>
                                <ShippingMethod carrier={carrier}></ShippingMethod>
                                <Divider bg="#ccc" mt={4} />
                            </>
                        }

                        <CmsModal
                            visible={isCmsModalVisible}
                            onToggle={toggleCmsModal}
                            data={cms}
                        />

                        <Text style={styles.bold} mt={4} mb={4}>Voucher</Text>
                        <Input
                            mb={4}
                            color='black'
                            placeholder="Enter code"
                            value={voucher}
                            onChangeText={(props) => setVoucher(props)}
                            borderColor={'#ccc'}
                            InputRightElement={
                                <Button
                                    size="sm"
                                    rounded="none"
                                    w="2/6"
                                    h="full"
                                    onPress={validateVoucher}
                                    isDisabled={voucher.length === 0 ? true : false}
                                    backgroundColor={'#1cad48'}>
                                    APPLY
                                </Button>
                            }
                        />

                        {(voucher_list || credit_store_list) && <View mb={2}>
                            <View mt={1} bg={'gray.100'}>
                                {voucher_list && voucher_list.map((res: any, index: any) => {
                                    return <HStack key={index} py={2} px={3} borderRadius={2}>
                                        <Text color='black' mt={2}>{res.code}</Text>
                                        <Spacer />

                                        <HStack>
                                            <Text color='black' mt={2} mr={3} bold>{currency} {res.reduction_amount}</Text>
                                            <TouchableOpacity style={{ paddingHorizontal: 8, paddingVertical: 5, }} onPress={() => alertDeleteVoucher(res.id_cart_rule)}>
                                                <IonIcon name="trash-outline" size={26} color="black" />
                                            </TouchableOpacity>
                                        </HStack>
                                    </HStack>
                                })}

                                {credit_store_list && credit_store_list.map((res: any, index: any) => {
                                    return <HStack key={index} py={2} px={3} borderRadius={2}>
                                        <Text color='black' mt={2}>{res.code}</Text>
                                        <Spacer />

                                        <HStack>
                                            <Text color='black' mt={2} mr={3} bold>{currency} {res.value_real}</Text>
                                            <TouchableOpacity style={{ paddingHorizontal: 8, paddingVertical: 5, }} onPress={() => alertDeleteVoucher(res.id_cart_rule)}>
                                                <IonIcon name="trash-outline" size={26} color="black" />
                                            </TouchableOpacity>
                                        </HStack>
                                    </HStack>
                                })}

                            </View>

                        </View>}

                        {gift_wrap_exist == '1' &&
                            <>
                                <HStack py={3}>
                                    <Text style={styles.normal}>Gift Option</Text>
                                    <Spacer />
                                    <Radio.Group
                                        name="giftOption"
                                        value={gift}
                                        onChange={(nextValue) => {
                                            setGift(nextValue);

                                            if (nextValue == '0') {
                                                setGiftMessage('');
                                            }

                                        }}
                                    >
                                        <HStack>
                                            <Radio value="0" backgroundColor={'white'} marginLeft={3} _text={{ color: 'black', fontSize: 14 }} size="md">No</Radio>
                                            <Radio value="1" backgroundColor={'white'} marginLeft={3} _text={{ color: 'black', fontSize: 14 }} size="md">Yes</Radio>
                                        </HStack>
                                    </Radio.Group>
                                </HStack>
                            </>
                        }

                        {gift && (gift == '1') ? <>
                            <VStack>
                                <Box borderRadius={10}>
                                    <HStack>
                                        {gift_wrap &&
                                            <>
                                                <AspectRatio w="40%" ratio={2/3}>
                                                    <Image resizeMode="cover" source={{ uri: gift_wrap.product_val[gift_wrap_id].image_url_tumb[0] }} />
                                                </AspectRatio>

                                                <VStack m={3} flexShrink={1}>
                                                    <Text color='black' fontSize={13}>{gift_wrap.product_val[gift_wrap_id].name}</Text>
                                                    <Text color='black' fontSize={13}>{currency} {Number(gift_wrap.product_val[gift_wrap_id].price).toFixed(2)}</Text>
                                                </VStack>
                                            </>
                                        }

                                    </HStack>
                                </Box>
                                <TextArea marginY={3} value={giftMessage}
                                    onChangeText={text => setGiftMessage(text)} 
                                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                    autoCompleteType={undefined} 
                                    placeholder="Message on card" 
                                    color={'black'} />
                            </VStack>
                        </> : null}

                        <HStack pt={2} pb={4}>
                            <Text style={styles.normal}>Leave Message</Text>
                            <Spacer />
                            <Radio.Group
                                name="message"
                                value={message}
                                onChange={(nextValue) => {
                                    setMessage(nextValue)
                                }}
                            >
                                <HStack>
                                    <Radio value="0" backgroundColor={'white'} marginLeft={3} _text={{ color: 'black', fontSize: 14 }} size="md">No</Radio>
                                    <Radio value="1" backgroundColor={'white'} marginLeft={3} _text={{ color: 'black', fontSize: 14 }} size="md">Yes</Radio>
                                </HStack>
                            </Radio.Group>
                        </HStack>

                        {message && (message == '1') ? <>
                            <VStack>
                                <TextArea marginY={3}
                                    value={leaveMessage}
                                    onChangeText={text => { setLeaveMessage(text) }}
                                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                    autoCompleteType={undefined} placeholder={'Type something here'} color={'black'} 
                                />
                            </VStack>
                        </> : null}

                        <Divider bg="#ccc" />

                        <Text style={styles.bold} py={3} pt={4}>Payment Method</Text>

                        {payment && 
                            <Radio.Group name="paymentMethod" onChange={nextValue => {
                                setPaymentChild('')
                                setPaymentType(nextValue);
                            }}>
                                {payment && payment.map((item: any) => {
                                    return <>
                                        <HStack>
                                            <Radio value={item.id} my="2" backgroundColor={'white'} _text={{ color: 'black', fontSize: 14 }} size="md">{item.name}</Radio><Spacer /><Box width="2/4" maxWidth="200">

                                                {(paymentType == '2' && item.id == 2)  || (paymentType == '8' && item.id == 8) ?
                                                    <Select selectedValue={paymentChild} minWidth={win.width/3} placeholder="Select Payment Type" color={'black'} _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size={1} /> }} onValueChange={itemValue => setPaymentChild(itemValue)}>

                                                        {item.options.map((option: any) => {
                                                            return (
                                                                <Select.Item value={option.value} label={option.name} />

                                                            );
                                                        })}
                                                    </Select>

                                                    : ''}
                                            </Box>
                                        </HStack>

                                    </>
                                })}
                            </Radio.Group>
                        }

                        {!payment && (free_order == 1) &&
                            <HStack>
                                <Radio.Group name="paymentMethod" onChange={nextValue => {
                                    setPaymentChild('')
                                    setPaymentType(nextValue);
                                    }}>
                                    <Radio value="0" my="2" backgroundColor={'white'} _text={{ color: 'black', fontSize: 14 }} size="md">Free Order</Radio><Spacer />
                                    <Box width="2/4" maxWidth="200">
                                    </Box>
                                </Radio.Group>
                            </HStack>
                        }

                        {/* <Text color={'black'}>{paymentType} {paymentChild}</Text> */}
                        <Spacer />

                        {/* <Divider bg="#ccc" mt={2} /> */}

                        <Box bg="#fff" mt={4} mb={4}>
                            <Checkbox value='terms' isChecked={termAgree} onChange={setTermAgree} style={styles.checkbox} mr={2} size='lg'>
                                <Text color={'black'} fontSize={12} pr={6} ml={2}>I agree with the
                                    <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('term')}> Terms of Service</Link> and
                                    <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('privacypolicy')}> Privacy Policy</Link> and
                                    I adhere to them unconditionally.</Text>
                            </Checkbox>
                        </Box>

                        <Divider bg="#ccc" mb={4} />

                        <Text style={styles.bold} marginTop={0}>Shopping Bag</Text>

                        <ScrollView horizontal py={3}>
                            {product.map((item: any, index: any) => {
                                return <>
                                    <Box key={index} marginRight={2}>
                                        <AspectRatio w="100%" ratio={2/3} size={'130px'}>
                                            <ImageBackground
                                                source={{ uri: item.image_url }}
                                                style={{ flex: 1 }}
                                                resizeMode="cover">
                                                <View style={styles.quantity_view}>
                                                    <Button size='sm'
                                                        style={styles.quantity_chip}>
                                                        <Text
                                                            style={styles.bold}>{'x' + item.quantity}</Text>
                                                    </Button>
                                                </View>
                                            </ImageBackground>
                                        </AspectRatio>
                                    </Box>
                                    <Spacer />
                                </>;
                            })}
                        </ScrollView>

                        <Divider bg="#ccc" mt={2} mb={2} />

                        <HStack py={1}>
                            <Text style={styles.normal}>Retail Price :</Text>
                            <Spacer />
                            <Text style={styles.normal}>{currency} {total_product}</Text>
                        </HStack>
                        <HStack py={1}>
                            <Text style={styles.normal}>Discount :</Text>
                            <Spacer />
                            <Text style={styles.normal}>{currency} {discount}</Text>
                        </HStack>
                        <HStack py={1}>
                            <Text style={styles.normal}>Store Credit :</Text>
                            <Spacer />
                            <Text style={styles.normal}>-</Text>
                        </HStack>
                        <HStack py={1} mb={4}>
                            <Text style={styles.normal}>Shipping fee :</Text>
                            <Spacer />
                            <Text style={styles.normal}>{currency} {shipping_fee}</Text>
                        </HStack>
                    </View>
                </ScrollView>

                {/* {isLoading ? <ActivityIndicator /> : null} */}

                <HStack style={{ marginHorizontal: 20 }}>
                    <Text style={styles.total}>Total :</Text>
                    <Spacer />
                    <Text style={styles.total}>{currency} {total_price}</Text>
                </HStack>

                <HStack style={{ height: 50, paddingVertical: 5, marginHorizontal: 20, marginVertical: 10 }}>
                    <Button w={'100%'} style={styles.footer} onPress={() => cartStep4()} isLoading={isLoading} isLoadingText="PLACE ORDER">PLACE ORDER</Button>
                </HStack>
            </Flex >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 25,
        paddingEnd: 25,
        backgroundColor: 'white'
    },
    button: {
        borderRadius: 10,
        padding: 3,
        sizes: 'md',
        backgroundColor: '#1cad48',
        marginTop: 8,
        marginBottom: 20
    },
    bold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    red: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    normal: {
        fontSize: 14,
        color: 'black'
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10
    },
    border: {
        borderBottomWidth: 1,
        borderColor: 'muted.100',
        paddingRight: 8
    },
    checkbox: {
        borderColor: 'black',
        backgroundColor: 'white'
    },
    footer: {
        backgroundColor: '#1cad48'
    },
    quantity_chip: {
        marginVertical: 3,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    quantity_view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    button_delete: {
        borderRadius: 10,
        sizes: 'md',
    },
})


