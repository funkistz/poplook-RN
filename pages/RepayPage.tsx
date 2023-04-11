import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, VStack, Divider, Checkbox, Link, Radio, Select, Box, CheckIcon } from "native-base";
import OrderHistoryService from '../Services/OrderHistoryService';
import { useSelector } from 'react-redux';
import Address from '../components/Address';
import ShippingMethod from '../components/ShippingMethod';
import PaymentMethod from '../components/PaymentMethod';
import ProductDetail from '../components/ProductDetail';
import {isAtomeAppInstalled} from 'react-native-atome-paylater';
import {handlePaymentURL} from 'react-native-atome-paylater';
import PaymentService from '../Services/PaymentService';
// import { Pay } from 'react-native-ipay88-integration';

export default function RepayPage({ route, navigation }: { route: any, navigation: any }) {

    const cartId = route.params.params.id;
    const session = useSelector((storeState: any) => storeState.session);
    const currency = useSelector((storeState: any) => storeState.session.currencySign);
    const user = useSelector((storeState: any) => storeState.session.user);
    const shopId = useSelector((storeState: any) => storeState.session.user.id_shop);
    const [address, setAddress] = useState<any>({});
    const [carrier, setCarrier] = useState<any>({});
    const [payment, setPayment] = useState<any>([]);
    const [product, setProduct] = useState<any>([]);
    const [url, setUrl] = useState<any>('');
    const [data, setData] = useState<any>({});
    const [paymentType, setPaymentType] = React.useState('');
    const [paymentChild, setPaymentChild] = React.useState('');
    const [result, setResult] = useState('No');

    useEffect(() => {

        const repay = async () => {
            const response = await OrderHistoryService.repay(cartId);
            const json = await response.json();

            console.log('repay', json.data)

            setAddress(json.data.address_delivery);
            setCarrier(json.data.carrier_list[0]);
            setPayment(json.data.payment_list);
            setProduct(json.data.product_list);
            setData(json.data);
        }
        repay().catch(console.error);

    }, [])

    const atome = async () => {

        const response = await PaymentService.atome(cartId);
        const json = await response.json();

        console.log('url', json.data)

        setUrl(json.data.redirect_url);
        handlePaymentURL(url)
    }

    const init = async () => {
        const installed = await isAtomeAppInstalled();
        console.log(installed);
        setResult(actualResult => installed ? 'Yes' : 'No')
    };
    

    const redirectPayment = () => {
        if (shopId == '1') {
            if (paymentType == '16') {
                atome()
            } else {
                // pay(data) // ipay
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

    }

    // const pay = (data: any) => {
    //     try {
    //         console.log('masuk pay', data)
    //         const merchantCode = 'M01333'
    //         const merchantKey = '4DlpdFR8uP'

    //         const info: any = {
    //             paymentId: "2", // refer to ipay88 docs
    //             merchantKey: merchantKey,
    //             merchantCode: merchantCode,
    //             referenceNo: data.id_order,
    //             amount: data.totalPriceWt,
    //             currency: "MYR",
    //             productDescription: "Reference No: " +data.id_order,
    //             userName: session.user.name,
    //             userEmail: session.user.email,
    //             userContact: "0123456789",
    //             remark: "Test",
    //             utfLang: "UTF-8",
    //             country: "MY",
    //             backendUrl: "https://poplook.com/modules/ipay88induxive/backend_response.php",
    //           };
    //           console.log(info)
    //           const errs = Pay(info);
    //             //   if (errs.length > 0) {
    //             //     console.log('kenapa' ,info);
    //         //   }
    //         } catch (e) {
    //         console.log(e);
    //         }
    //   };

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <Address address={address} title='Shipping'></Address>
                    <Divider />

                    <Address address={address} title='Billing'></Address>
                    <Divider />

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
                                            <Select selectedValue={paymentChild} minWidth="190" placeholder="Select Payment Type" color={'black'} _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size={1} /> }} onValueChange={itemValue => setPaymentChild(itemValue)}>

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
                    <Text color={'black'}>{paymentType} {paymentChild}</Text>
                    <Spacer />

                    <Checkbox value="terms" style={styles.checkbox} marginY={3}>
                        <Text color={'black'} fontSize={12}>I agree with the <Link _text={{ color: '#1cad48', fontSize: 12 }}>Terms of Service</Link> and
                            <Link _text={{ color: '#1cad48', fontSize: 12 }}> Privacy Policy</Link> and I adhere to them unconditionally.</Text>
                    </Checkbox>
                    <Divider />


                    <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                        <Text paddingBottom={3} style={styles.bold}>Order Summary</Text>
                        {product.map((item: any, index: any) => {
                            return <ProductDetail product={item} key={index}></ProductDetail>
                        })}
                    </VStack>

                    <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                        <HStack>
                            <Text style={styles.bold}>Subtotal</Text>
                            <Spacer />
                            <Text style={styles.bold}>{currency} {data.totalProductsWt}</Text>
                        </HStack>
                    </VStack>
                    <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                        <HStack>
                            <Text style={styles.bold}>Shipping</Text>
                            <Spacer />
                            {data.shipping_price && data.shipping_price == 0 ?
                                <Text style={styles.bold}>Free Shipping</Text>
                                : <Text style={styles.bold}>{currency} {data.shipping_price}</Text>}
                        </HStack>
                    </VStack>
                    <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                        <HStack>
                            <Text style={styles.bold}>TOTAL PAYABLE</Text>
                            <Spacer />
                            <Text style={styles.bold}>{currency} {(+data.totalProductsWt) + (+data.shipping_price)}</Text>
                        </HStack>
                    </VStack>
                </View>
                <Button style={styles.button} onPress={() => redirectPayment()}>NEXT</Button>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 25,
        paddingEnd: 25
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
        backgroundColor: 'white'
    }
})


