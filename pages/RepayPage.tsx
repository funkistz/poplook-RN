import React, { useEffect, useState, useRef } from 'react';
import { Alert, StyleSheet, AppState, ActivityIndicator, Dimensions } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, VStack, Divider, Checkbox, Link, Radio, Select, Box, CheckIcon } from "native-base";
import OrderHistoryService from '../Services/OrderHistoryService';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import Address from '../components/Address';
import ShippingMethod from '../components/ShippingMethod';
import ProductDetail from '../components/ProductDetail';
import { isAtomeAppInstalled } from 'react-native-atome-paylater';
import { handlePaymentURL } from 'react-native-atome-paylater';
import PaymentService from '../Services/PaymentService';
import CartService from '../Services/CartService';
import GeneralService from '../Services/GeneralService';
import SkeletonRepay from '../components/SkeletonRepay';
import CmsModal from '../components/Modals/Cms';
import CmsService from '../Services/CmsService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RepayPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const cartId = route.params.params.id;
    const currency = useSelector((storeState: any) => storeState.session.country.currency_sign);
    const user = useSelector((storeState: any) => storeState.session.user);
    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);

    const [address, setAddress] = useState<any>({});
    const [carrier, setCarrier] = useState<any>({});
    const [payment, setPayment] = useState<any>([]);
    const [product, setProduct] = useState<any>([]);
    const [vouchers, setVouchers] = useState<any>([]);
    const [url, setUrl] = useState<any>('');
    const [appUrl, setAppUrl] = useState<any>('');
    const [data, setData] = useState<any>();
    const [paymentType, setPaymentType] = React.useState('');
    const [paymentChild, setPaymentChild] = React.useState('');
    const [result, setResult] = useState('');
    const [amount, setAmount] = useState<any>('');
    const [transId, setTransId] = useState<any>('');
    const [termAgree, setTermAgree] = useState(false)
    const [isCmsModalVisible, setCmsModalVisible] = useState(false);
    const [cms, setCms] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [referenceId, setReferenceId] = useState('');
    const [paymentChoose, setPaymentChoose] = useState('');
    const [orderId, setOrderId] = useState('');

    const win = Dimensions.get('window');

    useEffect(() => {

        const init = async () => {
            const installed = await isAtomeAppInstalled();
            setResult(installed ? 'Yes' : 'No')
            console.log('install ke tak', installed);
        };
        init().catch(console.error);

        const repay = async () => {
            const response = await OrderHistoryService.repay(cartId);
            const json = await response.json();

            console.log('repay', json.data)

            setAddress(json.data.address_delivery);
            setCarrier(json.data.carrier_list[0]);
            setPayment(json.data.payment_list);
            setProduct(json.data.product_list);
            setData(json.data);
            if (json.data.voucher_list) {
                setVouchers(json.data.voucher_list);
            }

            setOrderId(json.data.id_order);
            await AsyncStorage.setItem('orderId', json.data.id_order.toString());

        }
        repay().catch(console.error);

        const appState = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            appState.remove()
        };

    }, [])

    const handleAppStateChange = async (nextAppState: any) => {

        if (nextAppState === 'background' || nextAppState === 'inactive') {
            console.log('back')
        } else if (nextAppState === 'active') {

            const refId = await AsyncStorage.getItem('referenceId');
            const paymentChoose = await AsyncStorage.getItem('paymentChoose');

            if (paymentChoose == '16') {
                getPaymentInfo(refId)
            }
        }
    }

    const toggleCmsModal = async (key: any) => {
        setCmsModalVisible(!isCmsModalVisible);
        const response = await CmsService.getCmsDetails(key);
        const json = await response.json();
        setCms(json.data[0]);
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

        console.log('atome', json.data)

        if (json.code == '200' && json.data) {
            setIsLoading(false)
            setUrl(json.data.redirect_url);
            setAppUrl(json.data.app_payment_url);

            setReferenceId(json.data.reference_id);
            await AsyncStorage.setItem('referenceId', json.data.reference_id);

            handlePaymentURL(result ? json.data.app_payment_url : json.data.redirect_url)
        }

    }

    const getPaymentInfo = async (refId: any) => {

        const response = await PaymentService.getPaymentInfo(refId);
        const json = await response.json();

        console.log('paymentinfo', json.status)

        setTransId(json.paymentTransaction);
        setAmount(json.amount);

        const order_id = await AsyncStorage.getItem('orderId')

        if (json.status == 'PAID') {
            cartStep5(order_id, '1', 'atome', json.paymentTransaction, json.amount)
        } else {
            cartStep5(order_id, '0', 'atome', json.paymentTransaction, json.amount)
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

        const response = await PaymentService.repayIpay(data.id_order, user.id_customer, paymentId(), payment);
        const json = await response.json();

        console.log('repayIpay', json);

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

    const eghl = async (data: any) => {

        const response = await PaymentService.repayEghl(data.id_order, user.id_customer);
        const json = await response.json();

        console.log('repayEghl', json.data);

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

        const response = await PaymentService.repayEnets(data.id_order, user.id_customer);
        const json = await response.json();

        console.log('repayEnets', json.data)

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

    const ipayUSD = async (data: any) => {

        const response = await PaymentService.repayIpayUsd(data.id_order, user.id_customer, paymentId());
        const json = await response.json();

        console.log('repayIpayUSD', json.data);

        const param = {
            form: json.data.results,
            order_id: data.id_order,
            payment_type: 'usd_cc',
            trans_id: null,
            amount: data.totalPriceWt * 100
        };

        navigation.reset({
            index: 0,
            routes: [{ name: 'Ipay88PaymentPage', params: param }]
        });

    }

    const paypal = async (data: any) => {

        const response = await PaymentService.repayPaypal(data.id_order, user.id_customer, paymentId());
        const json = await response.json();

        console.log('repayPaypal', json.data);

        const param = {
            form: json.data.results,
            order_id: data.id_order,
            payment_type: 'usd_paypal',
            trans_id: null,
            amount: data.totalPriceWt * 100
        };

        navigation.reset({
            index: 0,
            routes: [{ name: 'Ipay88PaymentPage', params: param }]
        });

    }

    const redirectPayment = async () => {


        if (paymentType && termAgree) {

            setPaymentChoose(paymentType);
            await AsyncStorage.setItem('paymentChoose', paymentType.toString());

            if (paymentType == '2' || paymentType == '8') {
                if (paymentChild) {
                    if (shopId == '1') {
                        ipay(data)
                    }
                } else {
                    GeneralService.toast({ description: 'Please select payment type' });
                }
            } else {
                if (shopId == '1') {
                    if (paymentType == '16') {
                        atome()
                    } else if (paymentType == '3') {
                        ipay(data)
                    }
                } else if (shopId == '2') {
                    if (paymentType == '4') {
                        eghl(data)
                    } else {
                        enets(data)
                    }
                } else {
                    if (paymentType == '1') {
                        paypal(data)
                    } else {
                        ipayUSD(data)
                    }
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

        const response = await CartService.cartStep5(orderId, status, paymentMethod, transId, amount);
        const json = await response.json();

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

    return (
        <>
            {!data && <SkeletonRepay></SkeletonRepay>}
            {data &&
                <>
                    <ScrollView backgroundColor='white'>
                        <View style={styles.container} pt={4}>

                            <Text style={styles.bold}>Shipping Address</Text>
                            <Address address={address}></Address>
                            <Divider bg="#ccc" />

                            {/* <Address address={address} title='Billing'></Address>
                            <Divider /> */}

                            <Text style={styles.bold} mt={4}>Shipping Method</Text>
                            <ShippingMethod carrier={carrier}></ShippingMethod>
                            <Divider bg="#ccc" mt={4} />

                            <Text style={styles.bold} py={3} pt={4}>Payment Method</Text>
                            <Radio.Group name="paymentMethod" onChange={nextValue => {
                                setPaymentChild('')
                                setPaymentType(nextValue);
                            }}>
                                {payment.map((item: any, index: any) => {
                                    return <>
                                        <HStack>
                                            <Radio key={index} value={item.id} my="2" backgroundColor={'white'} _text={{ color: 'black', fontSize: 14 }} size="md">{item.name}</Radio><Spacer /><Box width="2/4" maxWidth="200">

                                                {(paymentType == '2' && item.id == 2)  || (paymentType == '8' && item.id == 8)?
                                                    <Select safeArea selectedValue={paymentChild} mt={1} minWidth={win.width/3} placeholder="Select Payment Type" color={'black'} _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size={1} /> }} onValueChange={itemValue => setPaymentChild(itemValue)}>

                                                        {item.options.map((option: any, index: any) => {
                                                            return (
                                                                <Select.Item value={option.value} label={option.name} key={index} />

                                                            );
                                                        })}
                                                    </Select>

                                                    : ''}

                                            </Box>
                                        </HStack>

                                    </>
                                })}
                            </Radio.Group>
                            {/* <Text color={'black'}>{paymentType} {paymentChild}</Text> */}

                            <Box bg="#fff" mt={4} mb={4}>
                            <Checkbox value='terms' isChecked={termAgree} onChange={setTermAgree} style={styles.checkbox} mr={2} size='lg'>
                                <Text color={'black'} fontSize={12} pr={6} ml={2}>I agree with the
                                    <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('term')}> Terms of Service</Link> and
                                    <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('privacypolicy')}> Privacy Policy</Link> and
                                    I adhere to them unconditionally.</Text>
                            </Checkbox>
                        </Box>

                            <Divider bg="#ccc" mb={4} />

                            <CmsModal
                                visible={isCmsModalVisible}
                                onToggle={toggleCmsModal}
                                data={cms}
                            />

                            <VStack style={styles.border} py={3}>
                                <Text paddingBottom={3} style={styles.bold}>Order Summary</Text>
                                {product.map((item: any, index: any) => {
                                    return <>
                                        <ProductDetail product={item} key={index}></ProductDetail>
                                        <Box mb={4}></Box>
                                    </>
                                })}
                            </VStack>

                            <VStack style={styles.border} py={3}>
                                <HStack>
                                    <Text style={styles.bold}>Subtotal</Text>
                                    <Spacer />
                                    <Text style={styles.bold}>{currency} {data.totalProductsWt}</Text>
                                </HStack>
                            </VStack>
                            <VStack style={styles.border} py={3}>
                                <HStack>
                                    <Text style={styles.bold}>Shipping</Text>
                                    <Spacer />
                                    {data.shipping_price && data.shipping_price == 0 ?
                                        <Text style={styles.bold}>Free Shipping</Text>
                                        : <Text style={styles.bold}>{currency} {data.shipping_price}</Text>}
                                </HStack>
                            </VStack>
                            <VStack style={styles.border} py={3}>
                                <Text style={styles.bold} mb={2}>Discount</Text>
                                <Spacer />
                                {vouchers.map((voucher: any, index: any) => {
                                    return <>
                                        <HStack pl={2}>
                                            <Text color='black'>{voucher.code}</Text>
                                            <Spacer />
                                            <Text color='black'>{currency} {voucher.value_real}</Text>
                                        </HStack>
                                    </>
                                })}
                            </VStack>
                            <VStack style={styles.border} py={3}>
                                <HStack>
                                    <Text style={styles.bold}>TOTAL PAYABLE</Text>
                                    <Spacer />
                                    <Text style={styles.bold}>{currency} {(data.totalPriceWt)}</Text>
                                </HStack>
                            </VStack>
                        </View>
                    </ScrollView>



                    <Box backgroundColor='#ffffff'>
                        {isLoading ? <ActivityIndicator /> : null}
                        <Button style={styles.button} onPress={() => redirectPayment()}>NEXT</Button>
                    </Box>
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 25,
        paddingEnd: 25,
        backgroundColor: '#ffffff'
    },
    button: {
        borderRadius: 10,
        margin: 15,
        backgroundColor: '#1cad48'
    },
    bold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    normal: {
        fontSize: 14,
        color: 'black'
    },
    border: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingRight: 8
    },
    checkbox: {
        borderColor: 'black',
        backgroundColor: 'white',
    }
})


