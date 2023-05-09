import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, Box, AspectRatio, Radio, Input, Divider, Checkbox, Link, VStack, Select, CheckIcon, Flex, TextArea } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCartStep1 } from '../Redux/Slices/Checkout';
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
// import { assignUser } from '../Redux/Slices/Sessions';
import { assignCartId, clearCart } from '../Redux/Slices/Cart';

export default function CheckoutPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [gift, setGift] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [paymentType, setPaymentType] = React.useState('');
    const [paymentChild, setPaymentChild] = React.useState('');
    const [isAddressModalVisible, setAdressModalVisible] = useState(false);
    const [isCmsModalVisible, setCmsModalVisible] = useState(false);
    const [data, setData] = useState({});
    const [url, setUrl] = useState<any>('');
    const [appUrl, setAppUrl] = useState<any>('');
    const [result, setResult] = useState('');
    const [refId, setRefId] = useState<any>('');
    const [giftMessage, setGiftMessage] = useState('');
    const [leaveMessage, setLeaveMessage] = useState('');
    const [cms, setCms] = useState<any>({});
    const [termAgree, setTermAgree] = useState(false)

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
    const shipping_fee = useSelector((storeState: any) => storeState.checkout.shipping_fee);
    const checkout = useSelector((storeState: any) => storeState.checkout);
    const total = useSelector((storeState: any) => storeState.checkout.total);
    const voucher_list = useSelector((storeState: any) => storeState.checkout.voucher);
    const credit_store_list = useSelector((storeState: any) => storeState.checkout.storeCredit);

    // Voucher
    const [voucher, setVoucher] = React.useState('');

    useEffect(() => {

        const param = {
            gift: gift,
            address_id: address ? address.id : ''
        }

        console.log('param hantar' , param)

        dispatch(getCartStep1(param))


    }, [])

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
            dispatch(getCartStep1({ gift: gift, address_id: address ? address.id : null}))
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
        setAdressModalVisible(!isAddressModalVisible);
    };

    const toggleCmsModal = async (key: any) => {
        setCmsModalVisible(!isCmsModalVisible);
        const response = await CmsService.getCmsDetails(key);
        const json = await response.json();
        setCms(json.data[0]);
    };

    const cartStep4 = async () => {

        console.log('param', cartId, paymentSelected(), leaveMessage)

        if (paymentType && termAgree) {

            const response = await CartService.cartStep4(cartId, paymentSelected(), leaveMessage);
            const json = await response.json();

            console.log('cartstep4baru', json.data)

            setData(json.data);

            if (json.code == 200 && json.data) {

                dispatch(clearCart())
                // dispatch(assignCartId())

                if (shopId == '1') {
                    if (paymentType == '16') {
                        atome()
                    } else if (paymentType == '2' || paymentType == '3' || paymentType == '8') {
                        processIpay88(json.data)
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

        
    }

    const atome = async () => {

        const response = await PaymentService.atome(cartId);
        const json = await response.json();

        console.log('atome' ,json)

        setUrl(json.data.redirect_url);
        setAppUrl(json.data.app_payment_url);
        setRefId(json.data.referenceId);

        handlePaymentURL(result == 'No' ? appUrl : url)
    }

    const paymentSelected = () => {

        if (shopId == 1) {

        } else if (shopId == 2) {
            if (paymentType == '4') {
                return 'sgd_cc';
            } else if (paymentType == '5') {
                return 'enets'
            }
        } else if (shopId == 3) {

            
        }

        return paymentType;

    };

    const paymentId = () => {

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

    const eghl = async (data: any) => {

        console.log('dataEghl', data);

        const response = await PaymentService.eghl(cartId);
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
            routes: [{name: 'EghlPaymentPage', params: param }]
        });

    }

    const enets = async (data: any) => {

        const response = await PaymentService.enets(cartId);
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
            routes: [{name: 'EghlPaymentPage', params: param }]
        });
    }


    const processIpay88 = (data: any) => {

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


    return (
        <>
            <Flex flex={1} flexDirection="column" backgroundColor='white' margin={0}>
                <ScrollView>
                    <View style={styles.container}>
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
                            {payment.map((item: any) => {
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

                        <Checkbox isChecked={termAgree} onChange={setTermAgree} value="terms" style={styles.checkbox} marginY={3}>
                            <Text color={'black'} fontSize={12}>I agree with the <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('term')}>Terms of Service</Link> and
                                <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('privacypolicy')}> Privacy Policy</Link> and I adhere to them unconditionally.</Text>
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
                                    <Radio value="0" backgroundColor={'white'} marginBottom={2} marginLeft={3} _text={{ color: 'black' }} size="sm">No</Radio>
                                    <Radio value="1" backgroundColor={'white'} marginBottom={2} marginLeft={3} _text={{ color: 'black' }} size="sm">Yes</Radio>
                                </HStack>
                            </Radio.Group>
                        </HStack>

                        {gift && (gift == '1') ? <>
                            <VStack>
                                <Box borderRadius={10}>
                                    <HStack>
                                        <AspectRatio w="40%" ratio={4 / 4}>
                                            <Image resizeMode="cover" borderRadius={10} source={{ uri: gift_wrap.product_val[gift_wrap_id].image_url_tumb[0] }} />
                                        </AspectRatio>

                                        <VStack m={3} flexShrink={1}>
                                            <Text color='black' fontSize={13}>{gift_wrap.product_val[gift_wrap_id].name}</Text>
                                            <Text color='black' fontSize={13}>{currency} {Number(gift_wrap.product_val[gift_wrap_id].base_price).toFixed(2)}</Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                                <TextArea marginY={3} value={giftMessage} onChangeText={text => setGiftMessage(text)} maxW="330" autoCompleteType={undefined} placeholder="Message on card" color={'black'} />
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
                                <TextArea marginY={3} value={leaveMessage} onChangeText={text => setLeaveMessage(text)} maxW="330" autoCompleteType={undefined} placeholder="Type something here" color={'black'} />
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
                            <Text style={styles.normal}>{currency} {total}</Text>
                        </HStack>
                        <HStack py={1}>
                            <Text style={styles.normal}>Discount :</Text>
                            <Spacer />
                            <Text style={styles.normal}>-</Text>
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

                <HStack style={{ marginHorizontal: 20 }}>
                    <Text style={styles.total}>Total :</Text>
                    <Spacer />
                    <Text style={styles.total}>{currency} {total}</Text>
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

