import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Image, Linking } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, VStack, Box, AspectRatio, Divider } from "native-base";
import OrderHistoryService from '../Services/OrderHistoryService';
import { useSelector } from 'react-redux';
import ProductDetail from '../components/ProductDetail';
import Address from '../components/Address';

export default function OrderHistoryDetailPage({ route} : { route: any }) {

    const customerId = useSelector((storeState: any) => storeState.session.user.id_customer);
    const currency = useSelector((storeState: any) => storeState.session.country.currency_sign);
    const orderId = route.params.params.id;
    const url = 'https://poplook.com/application/download/POPLOOK_generic_returnform.pdf';
    const [details, setDetails] = useState<any>({});
    const [shipping, setShipping] = useState<any>({});
    const [billing, setBilling] = useState<any>({});
    const [products, setProducts] = useState<any>([]);
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {

        const orderHistoryDetails = async () => {
            const response = await OrderHistoryService.orderHistoryDetails(orderId);
            const json = await response.json();

            setDetails(json.data);
            setShipping(json.data.shipping_details);
            setBilling(json.data.billing_details);
            setProducts(json.data.product_details);
            setMessages(json.data.order_message == '' ? json.data.order_message : json.data.order_message[0]);
        }
        orderHistoryDetails().catch(console.error);

    }, [])

    const downloadReturnForm = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
          await Linking.openURL(url);
        } 
      }, [url]);

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                <HStack py={3}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold}>Invoice No</Text>
                        <Text style={styles.bold}>Order No</Text>
                        <Text style={styles.normal}>Date</Text>
                        <Text style={styles.normal}>Carrier</Text>
                        <Text style={styles.normal}>Payment Method</Text>
                    </VStack>
                    <VStack>
                    <Text style={styles.bold}># { details.invoice_prefix }{ details.invoice_number }</Text>
                        <Text style={styles.bold}># {details.id_order}</Text>
                        <Text style={styles.normal}>{details.date_add}</Text>
                        <Text style={styles.normal}>{details.carrier}</Text>
                        <Text style={styles.normal}>{details.payment_method}</Text>
                    </VStack>
                </HStack>
                <Button
                    bg={'#1cad48'}
                    style={styles.button}
                    _text={{ fontSize: 14, fontWeight: 600 }}
                    onPress={() => downloadReturnForm()}>DOWNLOAD RETURN FORM
                </Button>

                <HStack py={3}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold}>Shipping Address</Text>
                        <Address address={shipping}></Address>
                    </VStack>
                </HStack>
                <Divider/>

                <HStack py={3}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold}>Billing Address</Text>
                        <Address address={shipping}></Address>
                    </VStack>
                </HStack>
                <Divider/>

                <HStack py={3}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold} mb={2}>Notes on Order</Text>
                        <Text style={styles.normal}>{messages.message ? messages.message : 'No message available'}</Text>
                    </VStack>
                </HStack>
                <Divider/>

                <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                    <Text paddingBottom={3} style={styles.bold}>Description</Text>
                    {products.map((item: any, index: any) => {
                        return <ProductDetail product={item}></ProductDetail>
                    })}
                </VStack>
                <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                    <HStack>
                    <Text style={styles.bold}>Shipping</Text>
                    <Spacer/>
                    <Text style={styles.bold}>{currency} {details.carrier_price}</Text>
                    </HStack>
                </VStack>
                <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                    <HStack>
                    <Spacer/>
                    <Text style={styles.bold}>TOTAL {currency} {details.total_paid}</Text>
                    </HStack>
                </VStack>
            </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
       paddingStart: 30,
       paddingEnd: 30,
       backgroundColor: 'white'
    },
    button: {
        borderRadius: 10,
        padding: 3,
        sizes: 'md'
    },
    bold: {
        fontSize: 14,
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
    }
})


