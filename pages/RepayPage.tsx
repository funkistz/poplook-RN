import React, { useEffect, useState, useRef } from 'react';
import { Alert, StyleSheet, AppState, ActivityIndicator } from 'react-native';
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
import Ipay88Container from '../components/Payment/Ipay88Container';
import GeneralService from '../Services/GeneralService';
import SkeletonRepay from '../components/SkeletonRepay';
import CmsModal from '../components/Modals/Cms';
import CmsService from '../Services/CmsService';
import { assignRefID } from '../Redux/Slices/Checkout';

export default function RepayPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const cartId = route.params.params.id;
    const country = useSelector((storeState: any) => storeState.session.country);
    const currency = useSelector((storeState: any) => storeState.session.currencySign);
    const user = useSelector((storeState: any) => storeState.session.user);
    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);
    const [address, setAddress] = useState<any>({});
    const [carrier, setCarrier] = useState<any>({});
    const [payment, setPayment] = useState<any>([]);
    const [product, setProduct] = useState<any>([]);
    const [vouchers, setVouchers] = useState<any>([]);
    const [url, setUrl] = useState<any>('');
    const [appUrl, setAppUrl] = useState<any>('');
    const [refId, setRefId] = useState<any>('');
    const [data, setData] = useState<any>();
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [paymentState, setPaymentState] = React.useState('');
    const [paymentType, setPaymentType] = React.useState('');
    const [paymentChild, setPaymentChild] = React.useState('');
    const [result, setResult] = useState('');
    const [status, setStatus] = useState<any>('');
    const [amount, setAmount] = useState<any>('');
    const [transId, setTransId] = useState<any>('');
    const [termAgree, setTermAgree] = useState(false)
    const [isCmsModalVisible, setCmsModalVisible] = useState(false);
    const [cms, setCms] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

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
        }
        repay().catch(console.error);

        AppState.addEventListener('change', handleAppStateChange);

    }, [])

    const handleAppStateChange = async (nextAppState: any) => {

        if (nextAppState === 'background' || nextAppState === 'inactive') {
            console.log('back')
        } else if (nextAppState === 'active') {
            console.log('active', refId)
            await getPaymentInfo()
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
            dispatch(assignRefID(json.data.reference_id))

            await handlePaymentURL(json.data.redirect_url)
        }

        // handlePaymentURL(result == 'No' ? appUrl : url)
    }

    const getPaymentInfo = async () => {

        console.log('refid', refId)

        const response = await PaymentService.getPaymentInfo(refId);
        const json = await response.json();

        console.log('paymentinfo', json)

        setTransId(json.paymentTransaction);
        setAmount(json.amount);

        if (json.status == 'PAID') {
            setStatus(1);
        } else {
            setStatus(0);
        }

        await cartStep5()

    }

    const ipay = async (data: any) => {

        const response = await PaymentService.repayIpay(data.id_order, user.id_customer, paymentId());
        const json = await response.json();

        console.log('repayIpay', json);

        if (json.code == '200') {
            // processIpay88Browser()
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

    const processIpay88 = () => {

        try {
            const params: any = {
                paymentId: paymentId(),
                referenceNo: cartId,
                amount: data.totalPriceWt,
                currency: country.currency_iso_code,
                productDescription: "Reference No: " + data.id_order,
                userName: user.name,
                userEmail: user.email,
                userContact: "0123456789",
                remark: "Test",
                utfLang: "UTF-8",
                country: country.country_iso_code,
            };

            PaymentService.ProcessIpay88(params);

        } catch (e) {
            console.log(e);
        }
    };

    const processIpay88Browser = async () => {

        try {

            const params: any = {
                paymentId: paymentId(),
                referenceNo: cartId,
                amount: data.totalPriceWt,
                currency: country.currency_iso_code,
                productDescription: "Reference No: " + data.id_order,
                userName: user.name,
                userEmail: user.email,
                userContact: "0123456789",
                remark: "Test",
                utfLang: "UTF-8",
                country: country.country_iso_code,
            };

            navigation.reset({
                index: 0,
                routes: [{ name: 'Ipay88PaymentPage', params: params }]
            });

        } catch (e) {
            console.log(e);
        }
    };

    const eghl = async (data: any) => {

        const response = await PaymentService.repayEghl(data.id_order, user.id_customer);
        const json = await response.json();

        console.log('repayEghl', json.data.results);

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

        console.log('repayEnets', json.data.results)

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

    const redirectPayment = () => {
        if (paymentType && termAgree) {
            if (shopId == '1') {
                if (paymentType == '16') {
                    atome()
                } else if (paymentType == '2' || paymentType == '3' || paymentType == '8') {
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
                    // paypal
                } else {
                    // pay(data) // ipay88
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

    const cartStep5 = async () => {

        console.log('id order', data.id_order)
        console.log('status', status)
        console.log('paymenttyupe', paymentType)
        console.log('transid', transId)
        console.log('amount', amount)

        if (paymentType == '16') {
            setPaymentMethod('atome')
        }

        const response = await CartService.cartStep5(data.id_order, status, paymentMethod, transId, amount);
        const json = await response.json();

        console.log('cartstep5', json)

        if (json.status == 200 && json.data) {
            setPaymentState(json.data.payment_state)

            if (paymentState == '42' || paymentState == '18') {

                const param = {
                    id: data.id_order
                };

                navigation.navigate('OrderSuccessPage', { screen: 'OrderSuccessPage', param: param })
            } else {
                navigation.navigate('OrderHistoryListPage', { screen: 'OrderHistoryListPage' })
            }
        } else {
            navigation.navigate('OrderHistoryListPage', { screen: 'OrderHistoryListPage' })
        }
    }

    return (
        <>
            {!data && <SkeletonRepay></SkeletonRepay>}
            {data &&
                <>
                    <ScrollView>
                        <View style={styles.container}>
                            <Ipay88Container></Ipay88Container>

                            <Address address={address} title='Shipping'></Address>
                            <Divider />

                            {/* <Address address={address} title='Billing'></Address>
                            <Divider /> */}

                            <Text style={styles.bold} mt={2}>Shipping Method</Text>
                            <ShippingMethod carrier={carrier}></ShippingMethod>
                            <Divider />

                            <Text style={styles.bold} py={2}>Choose your payment</Text>
                            <Radio.Group name="paymentMethod" onChange={nextValue => {
                                setPaymentChild('')
                                setPaymentType(nextValue);
                            }}>
                                {payment.map((item: any, index: any) => {
                                    return <>
                                        <HStack>
                                            <Radio key={index} value={item.id} my="1" backgroundColor={'white'} marginBottom={2} marginLeft={3} _text={{ color: 'black' }} size="sm">{item.name}</Radio><Spacer /><Box width="2/4" maxWidth="200">

                                                {item.id == 2 || item.id == 8 ?
                                                    <Select safeArea selectedValue={paymentChild} minWidth="190" placeholder="Select Payment Type" color={'black'} _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size={1} /> }} onValueChange={itemValue => setPaymentChild(itemValue)}>

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

                            <Checkbox value='terms' isChecked={termAgree} onChange={setTermAgree} style={styles.checkbox} marginY={2}>
                                <Text color={'black'} fontSize={14} pr={5}>I agree with the
                                    <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('term')}> Terms of Service</Link> and
                                    <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('privacypolicy')}> Privacy Policy</Link> and I adhere to them unconditionally.</Text>
                            </Checkbox>
                            <Divider />

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
        borderColor: 'muted.100',
        paddingRight: 8
    },
    checkbox: {
        borderColor: 'black',
        backgroundColor: 'white',
    }
})


