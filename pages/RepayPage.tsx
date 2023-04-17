import React, { useEffect, useState, useRef } from 'react';
import { Alert, StyleSheet, AppState } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, VStack, Divider, Checkbox, Link, Radio, Select, Box, CheckIcon } from "native-base";
import OrderHistoryService from '../Services/OrderHistoryService';
import { useSelector } from 'react-redux';
import Address from '../components/Address';
import ShippingMethod from '../components/ShippingMethod';
import PaymentMethod from '../components/PaymentMethod';
import ProductDetail from '../components/ProductDetail';
import { isAtomeAppInstalled } from 'react-native-atome-paylater';
import { handlePaymentURL } from 'react-native-atome-paylater';
import PaymentService from '../Services/PaymentService';
import { execute } from 'react-native-eghl';
import CartService from '../Services/CartService';
import Ipay88Container from '../components/Payment/Ipay88Container';
import GeneralService from '../Services/GeneralService';
import SkeletonRepay from '../components/SkeletonRepay';

export default function RepayPage({ route, navigation }: { route: any, navigation: any }) {

    const cartId = route.params.params.id;
    const country = useSelector((storeState: any) => storeState.session.country);
    const currency = useSelector((storeState: any) => storeState.session.currencySign);
    const user = useSelector((storeState: any) => storeState.session.user);
    const shopId = useSelector((storeState: any) => storeState.session.user.id_shop);
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
            console.log('voucher', json.data.voucher_list)

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

    const atome = async () => {

        const response = await PaymentService.atome(cartId);
        const json = await response.json();

        console.log('paymentprocessor', json)

        setUrl(json.data.redirect_url);
        setAppUrl(json.data.app_payment_url);
        setRefId(json.data.referenceId);

        handlePaymentURL(result == 'No' ? appUrl : url)
    }

    const handleAppStateChange = async (nextAppState: any) => {

        if (nextAppState === 'background' || nextAppState === 'inactive') {
            console.log('back')
        } else if (nextAppState === 'active') {
            console.log('active', refId)
            await getPaymentInfo()
        }
    }

    const paymentId = () => {

        console.log('parent: ', paymentType)
        console.log('child: ', paymentChild)

        if (shopId == 1) {
            if (paymentType == '2') {
                return paymentChild;
            }

            if (paymentType == '8') {
                return paymentChild;
            }

            if (paymentType == '3') { // Credit Card (MYR)
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


    const processIpay88 = () => {

        try {
            const params: any = {
                paymentId: paymentId(),
                referenceNo: data.id_order,
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


    const eghl = (data: any) => {
        console.log('eghl')

        try {
            const request: any = {
                TransactionType: 'SALE',
                Amount: data.totalPriceWt,
                CurrencyCode: country.currency_iso_code,
                PaymentID: cartId,
                OrderNumber: data.id_order,
                PaymentDesc: 'Reference No: ' + data.id_order,
                PymtMethod: 'ANY',

                CustEmail: user.email,
                CustName: user.name,
                CustPhone: '0123456789',

                MerchantName: 'Poplook',
                MerchantReturnURL: 'https://pay.e-ghl.com/IPGSG/Payment.aspx ',

                ServiceID: 'POP',
                Password: 'Po1kM5L7',

                LanguageCode: 'EN',
                PageTimeout: '600',

                Prod: false,
            }
            console.log('start', request)
            const response = execute(request)
            console.log('response', response)

        } catch (e) {
            console.log('error', e)
        }
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

    const redirectPayment = () => {

        if (paymentType && termAgree) {
            if (shopId == '1') {
                if (paymentType == '16') {
                    atome()
                } if (paymentType == '14') {
                    eghl(data)
                } else if (paymentType == '2' || paymentType == '3' || paymentType == '8') {
                    processIpay88() // ipay
                }
            } else if (shopId == '2') {
                if (paymentType == '4') {
                    // eghl
                } else {
                    //enets
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

    return (
        <>
            {!data && <SkeletonRepay></SkeletonRepay>}
            {data &&
                <>
                    <ScrollView>
                        <View style={styles.container}>
                            <Ipay88Container></Ipay88Container>
                            {/* <Text color={'black'}>Is Atome App Installed? {result}</Text> */}

                            <Address address={address} title='Shipping'></Address>
                            <Divider />

                            {/* <Address address={address} title='Billing'></Address>
                    <Divider /> */}

                            <Text style={styles.bold} mt={2}>Shipping Method</Text>
                            <ShippingMethod carrier={carrier}></ShippingMethod>
                            <Divider />

                            <Text style={styles.bold} py={2}>Choose your payment</Text>
                            {/* <PaymentMethod payment={payment}></PaymentMethod> */}
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
                            {/* <Text color={'black'}>{paymentType} {paymentChild}</Text>
                    <Spacer /> */}

                            <Checkbox value='terms' isChecked={termAgree} onChange={setTermAgree} style={styles.checkbox} marginY={2}>
                                <Text color={'black'} fontSize={14} pr={5}>I agree with the
                                    <Link _text={{ color: '#1cad48', fontSize: 12 }}>Terms of Service</Link> and
                                    <Link _text={{ color: '#1cad48', fontSize: 12 }}> Privacy Policy</Link> and
                                    {"\n"}
                                    I adhere to them unconditionally.</Text>
                            </Checkbox>
                            <Divider />

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


