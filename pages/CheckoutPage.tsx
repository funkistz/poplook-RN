import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, ImageBackground, Alert, ActivityIndicator, AppState } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, Box, AspectRatio, Radio, Input, Divider, Checkbox, Link, VStack, Select, CheckIcon, Flex, TextArea } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { assignOrderID, assignRefID, clearLeaveMessage, getCartStep1, getGiftMessage, leaveMessageCheckout } from '../Redux/Slices/Checkout';
import Address from '../components/Address';
import ShippingMethod from '../components/ShippingMethod';
import AddressModal from '../components/Modals/AddressList';
import CartService from '../Services/CartService';
import { handlePaymentURL } from 'react-native-atome-paylater';
import PaymentService from '../Services/PaymentService';
import GeneralService from '../Services/GeneralService';
import IonIcon from 'react-native-vector-icons/Ionicons';
import VoucherService from '../Services/VoucherService';
import CmsService from '../Services/CmsService';
import CmsModal from '../components/Modals/Cms';
import Ipay88Container from '../components/Payment/Ipay88Container';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'


export default function CheckoutPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [gift, setGift] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [paymentType, setPaymentType] = React.useState('');
    const [paymentChild, setPaymentChild] = React.useState('');
    const [isAddressModalVisible, setAdressModalVisible] = useState(false);
    const [isCmsModalVisible, setCmsModalVisible] = useState(false);
    const [data, setData] = useState({});
    const [orderId, setOrderId] = useState('');
    const [url, setUrl] = useState<any>('');
    const [appUrl, setAppUrl] = useState<any>('');
    const [result, setResult] = useState('');
    const [refId, setRefId] = useState<any>('');
    const [giftMessage, setGiftMessage] = useState('');
    const [leaveMessage, setLeaveMessage] = useState('');
    const [cms, setCms] = useState<any>({});
    const [termAgree, setTermAgree] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<any>('');
    const [amount, setAmount] = useState<any>('');
    const [transId, setTransId] = useState<any>('');
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [paymentState, setPaymentState] = React.useState('');

    const currency = useSelector((storeState: any) => storeState.session.country.currency_sign);
    const cartId = useSelector((storeState: any) => storeState.cart.id_cart);
    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);
    const country = useSelector((storeState: any) => storeState.session.country);
    const user = useSelector((storeState: any) => storeState.session.user);
    const address = useSelector((storeState: any) => storeState.checkout.address);
    const carrier = useSelector((storeState: any) => storeState.checkout.address ? storeState.checkout.carrier[0] : '');
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
    const reference_id = useSelector((storeState: any) => storeState.checkout.ref_id);
    const order_id = useSelector((storeState: any) => storeState.checkout.order_id);

    // Voucher
    const [voucher, setVoucher] = React.useState('');

    useEffect(() => {

        const param = {
            gift: gift,
            address_id: address ? address.id : ''
        }

        dispatch(getCartStep1(param))

        if (text_message) {
            setMessage('1')
            setLeaveMessage(text_message)
        }

        if (gift_option) {
            setGift('0')
            if (gift_message) {
                setGiftMessage(gift_message)
            }
        }

    }, [])

    useEffect(() => {

        if (text_message) {
            setMessage('1')
            setLeaveMessage(text_message)
        }

        if (gift_option) {
            setGift('0')
            if (gift_message) {
                setGiftMessage(gift_message)
            }
        }

        const timeOutId = setTimeout(() => {

            const param = {
                gift_message: giftMessage
            }

            dispatch(getGiftMessage(param));
            dispatch(leaveMessageCheckout(leaveMessage))

        }, 500);

        AppState.addEventListener('change', handleAppStateChange);

        return () => clearTimeout(timeOutId);


    }, [leaveMessage, giftMessage])

    const handleAppStateChange = async (nextAppState: any) => {

        if (nextAppState === 'background' || nextAppState === 'inactive') {
            console.log('back')
        } else if (nextAppState === 'active') {
            console.log('active', refId)
            getPaymentInfo(reference_id)
        }
    }

    // Voucher
    const validateVoucher = async () => {
        const params = {
            code: voucher,
            id_cart: cartId,
            id_shop: user.id_shop,
        }

        const response = await VoucherService.validateVoucher(params);
        const json = await response.json();

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

        const response = await VoucherService.delValidateVoucher(params);
        const json = await response.json();
        console.log('json: ', json)
        if (json.code == 200) {
            dispatch(getCartStep1({ gift: gift, address_id: address ? address.id : null }))
            GeneralService.toast({ description: json.message });
        }
    }

    const toggleAddressModal = () => {
        // setAdressModalVisible(!isAddressModalVisible);
        console.log('toggleAddressModal');

        navigation.navigate('AddressListExPage', { screen: 'AddressListExPage', isCheckout: true });
    };

    const toggleCmsModal = async (key: any) => {
        setCmsModalVisible(!isCmsModalVisible);
        const response = await CmsService.getCmsDetails(key);
        const json = await response.json();
        setCms(json.data[0]);
    };

    const cartStep4 = async () => {

        if (paymentType && termAgree) {

            if (paymentType == '2' || paymentType == '8') {
                if (paymentChild) {
                    const response = await CartService.cartStep4(cartId, paymentSelected(), leaveMessage);
                    const json = await response.json();

                    console.log('cartstep4baru', json.data)

                    setData(json.data);

                    if (json.code == 200 && json.data) {

                        if (shopId == '1') {
                            dispatch(clearLeaveMessage())
                            ipay(json.data)
                        }
                    }
                } else {
                    GeneralService.toast({ description: 'Please select payment type' });
                }
            } else {
                const response = await CartService.cartStep4(cartId, paymentSelected(), leaveMessage);
                const json = await response.json();

                console.log('cartstep4baru', json.data.id_order)

                // setOrderId(json.data.id_order);

                dispatch(assignOrderID(json.data.id_order))

                if (json.code == 200 && json.data) {

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
                            // paypal
                        } else {
                            ipayUsd(json.data)
                        }
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

        console.log('id order', orderId)
        console.log('status', status)
        console.log('paymenttyupe', paymentMethod)
        console.log('transid', transId)
        console.log('amount', amount)

        const response = await CartService.cartStep5(orderId, status, paymentMethod, transId, amount);
        const json = await response.json();

        console.log('cartstep5', json)

        if (json.status == 200 && json.data) {
            setPaymentState(json.data.payment_state)

            if (paymentState == '42' || paymentState == '18') {

                const param = {
                    id: orderId
                };

                navigation.navigate('OrderSuccessPage', { screen: 'OrderSuccessPage', param: param })
            } else {
                navigation.navigate('OrderHistoryListPage', { screen: 'OrderHistoryListPage' })
            }
        } else {
            navigation.navigate('OrderHistoryListPage', { screen: 'OrderHistoryListPage' })
        }
    }

    const paymentSelected = () => {

        if (shopId == 1) {
            if (paymentType == '16') {
                return 'atome';
            } else {
                return 'ipay88'
            }
        } else if (shopId == 2) {
            if (paymentType == '4') {
                return 'sgd_cc';
            } else if (paymentType == '5') {
                return 'enets'
            }
        } else if (shopId == 3) {
            if (paymentType == '1') {
                return 'paypal';
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
            dispatch(assignRefID(json.data.reference_id))

            await handlePaymentURL(json.data.redirect_url)
        }
    }

    const getPaymentInfo = async (refId: any) => {

        console.log('refid', refId)

        const response = await PaymentService.getPaymentInfo(refId);
        const json = await response.json();

        console.log('paymentinfo', json)

        setTransId(json.paymentTransaction);
        setAmount(json.amount);

        if (json.status == 'PAID') {
            await cartStep5(order_id, '1', 'atome', json.paymentTransaction, json.amount)
        } else {
            await cartStep5(order_id, '0', 'atome', json.paymentTransaction, json.amount)
        }
    }

    const ipay = async (data: any) => {

        console.log('data checkout', data);

        const response = await PaymentService.payIpay(data.id_cart, user.id_customer, paymentId());
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

    const ipayUsd = async (data: any) => {

        console.log('data checkout', data);

        const response = await PaymentService.payIpayUsd(data.id_cart, user.id_customer, paymentId());
        const json = await response.json();

        console.log('IpayUsd', json);

        if (json.code == '200') {
            // processIpay88Browser()
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


    const processIpay88 = (data: any) => {

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

            console.log('ipay', params)

            PaymentService.ProcessIpay88(params);

        } catch (e) {
            console.log(e);
        }
    };

    const eghl = async (data: any) => {

        const response = await PaymentService.eghl(cartId, data.id_order);
        const json = await response.json();

        console.log('redirectEghl', json.data.results);

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

        console.log('redirectEnets', json.data.results)
        console.log('dataEnets', data);

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

    return (
        <>
            <Flex flex={1} flexDirection="column" backgroundColor='white' margin={0} safeAreaBottom>
                <ScrollView>
                    <View style={styles.container}>
                        <Ipay88Container></Ipay88Container>

                        {!address &&
                            <><TouchableOpacity onPress={toggleAddressModal}>
                                <Text style={styles.bold} marginY={3}>Please Add Address</Text>
                            </TouchableOpacity>
                            </>
                        }
                        {address &&
                            <>
                                <TouchableOpacity onPress={toggleAddressModal}>
                                    <Address address={address} title='Shipping'></Address>
                                </TouchableOpacity>
                            </>
                        }
                        <AddressModal
                            visible={isAddressModalVisible}
                            onToggle={toggleAddressModal}
                            isCheckout={true}
                        />
                        <Divider />

                        {address &&
                            <>
                                <Text style={styles.bold} mt={2}>Shipping Method</Text>
                                <ShippingMethod carrier={carrier}></ShippingMethod>
                                <Divider />
                            </>
                        }

                        <Text style={styles.bold} py={2}>Payment Method</Text>
                        <Radio.Group name="paymentMethod" onChange={nextValue => {
                            setPaymentChild('')
                            setPaymentType(nextValue);
                        }}>
                            {payment && payment.map((item: any) => {
                                return <>
                                    <HStack>
                                        <Radio value={item.id} my="1" backgroundColor={'white'} marginBottom={2} marginLeft={3} _text={{ color: 'black' }} size="sm">{item.name}</Radio><Spacer /><Box width="2/4" maxWidth="200">

                                            {item.id == 2 || item.id == 8 ?
                                                <Select selectedValue={paymentChild} minWidth="190" placeholder="Select Payment Type" color={'black'} _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size={1} /> }} onValueChange={itemValue => setPaymentChild(itemValue)}>

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
                        {/* <Text color={'black'}>{paymentType} {paymentChild}</Text> */}
                        <Spacer />

                        <Checkbox value='terms' isChecked={termAgree} onChange={setTermAgree} style={styles.checkbox} marginY={2}>
                            <Text color={'black'} fontSize={14} pr={5}>I agree with the
                                <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('term')}> Terms of Service</Link> and
                                <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('privacypolicy')}> Privacy Policy</Link> and
                                I adhere to them unconditionally.</Text>
                        </Checkbox>
                        <Divider />

                        <CmsModal
                            visible={isCmsModalVisible}
                            onToggle={toggleCmsModal}
                            data={cms}
                        />

                        <Input
                            marginY={3}
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
                                            <Text color='black' mt={2} mr={3} bold>RM {res.reduction_amount}</Text>
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
                                            <Text color='black' mt={2} mr={3} bold>RM {res.reduction_amount}</Text>
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
                                <HStack py={1}>
                                    <Text style={styles.normal}>Gift Option</Text>
                                    <Spacer />
                                    <Radio.Group
                                        name="giftOption"
                                        value={gift}
                                        onChange={(nextValue) => {
                                            setGift(nextValue);

                                            const param = {
                                                gift: gift,
                                                gift_wrap_id: gift_wrap_id,
                                                gift_message: giftMessage,
                                                address_id: address ? address.id : null
                                            }

                                            dispatch(getCartStep1(param))
                                        }}
                                    >
                                        <HStack>
                                            <Radio value="1" backgroundColor={'white'} marginBottom={2} marginLeft={3} _text={{ color: 'black' }} size="sm">No</Radio>
                                            <Radio value="0" backgroundColor={'white'} marginBottom={2} marginLeft={3} _text={{ color: 'black' }} size="sm">Yes</Radio>
                                        </HStack>
                                    </Radio.Group>
                                </HStack>
                            </>
                        }

                        {gift && (gift == '0') ? <>
                            <VStack>
                                <Box borderRadius={10}>
                                    <HStack>
                                        {gift_wrap &&
                                            <>
                                                <AspectRatio w="40%" ratio={4 / 4}>
                                                    <Image resizeMode="cover" borderRadius={10} source={{ uri: gift_wrap.product_val[gift_wrap_id].image_url_tumb[0] }} />
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
                                    onChangeText={text => setGiftMessage(text)} maxW="330" autoCompleteType={undefined} placeholder="Message on card" color={'black'} />
                            </VStack>
                        </> : null}

                        <HStack py={1}>
                            <Text style={styles.normal}>Leave Message</Text>
                            <Spacer />
                            <Radio.Group
                                name="message"
                                value={message}
                                onChange={(nextValue) => {
                                    setMessage(nextValue);
                                }}
                            >
                                <HStack>
                                    <Radio value="0" backgroundColor={'white'} marginBottom={2} marginLeft={3} _text={{ color: 'black' }} size="sm">No</Radio>
                                    <Radio value="1" backgroundColor={'white'} marginBottom={2} marginLeft={3} _text={{ color: 'black' }} size="sm">Yes</Radio>
                                </HStack>
                            </Radio.Group>
                        </HStack>

                        {message && (message == '1') ? <>
                            <VStack>
                                <TextArea marginY={3}
                                    value={leaveMessage}
                                    onChangeText={text => { setLeaveMessage(text) }}
                                    maxW="330" autoCompleteType={undefined} placeholder={'Type something here'} color={'black'} />

                            </VStack>
                        </> : null}

                        <Divider />

                        <Text style={styles.bold} marginTop={3}>Shopping Bag</Text>
                        <ScrollView horizontal py={3}>
                            {product.map((item: any, index: any) => {
                                return <>
                                    <Box key={index} marginRight={2}>
                                        <AspectRatio w="100%" ratio={3 / 4} size={'130px'}>
                                            <ImageBackground
                                                source={{ uri: item.image_url }}
                                                style={{ flex: 1 }}
                                                borderRadius={10}
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
                        <Divider />


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
                        <HStack py={1}>
                            <Text style={styles.normal}>Shipping fee :</Text>
                            <Spacer />
                            <Text style={styles.normal}>{currency} {shipping_fee}</Text>
                        </HStack>
                    </View>
                </ScrollView>

                {isLoading ? <ActivityIndicator /> : null}

                <HStack style={{ marginHorizontal: 20 }}>
                    <Text style={styles.total}>Total :</Text>
                    <Spacer />
                    <Text style={styles.total}>{currency} {total_price}</Text>
                </HStack>

                <HStack style={{ height: 50, paddingVertical: 5, marginHorizontal: 20, marginVertical: 10 }}>
                    <Button w={'100%'} style={styles.footer} onPress={() => cartStep4()}>PLACE ORDER</Button>
                </HStack>
            </Flex>
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
    }
})

