import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, ScrollView, View, HStack, Spacer, VStack, Divider, Button, Flex } from "native-base";
import { useSelector } from 'react-redux';
import OrderHistoryService from '../Services/OrderHistoryService';
import ProductDetail from '../components/ProductDetail';
import Address from '../components/Address';

export default function OrderSuccessPage({ route, navigation } : { route: any, navigation: any }) {

    const orderId = route.params.id;
    const currency = useSelector((storeState: any) => storeState.session.country.currency_sign);

    const [details, setDetails] = useState<any>({});
    const [shipping, setShipping] = useState<any>({});
    const [billing, setBilling] = useState<any>({})
    const [products, setProducts] = useState<any>([]);
    const [messages, setMessages] = useState<any>([]);
    const [giftMessages, setGiftMessages] = useState<any>([]);

    useEffect(() => {

        console.log('route.params' ,route.params.id)

        const orderHistoryDetails = async () => {
            const response = await OrderHistoryService.orderHistoryDetails(orderId);
            const json = await response.data;

            console.log('successpage' ,json)

            setDetails(json.data);
            setShipping(json.data.shipping_details);
            setBilling(json.data.billing_details);
            setProducts(json.data.product_details);
            setMessages(json.data.order_message? json.data.order_message[0] : json.data.order_message);
            setGiftMessages(json.data.order_details);
        }
        orderHistoryDetails().catch(console.error);

    }, [])

    const goToHomePage = () => {

        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'Main',
                    state: {
                        routes: [{
                            name: 'Home'
                        }],
                    },
                },
            ],
        });
    };

    return (
        <>
            <Flex flex={1} flexDirection="column" backgroundColor='white' margin={0} safeAreaBottom>
            <ScrollView>
                <View style={styles.container}>
                <Text style={styles.title}>Thank you for shopping at POPLOOK!</Text>
                <HStack py={3}>
                    <VStack paddingRight={8}>
                        <Text style={styles.normal}>Invoice No</Text>
                        <Text style={styles.normal}>Order No</Text>
                        <Text style={styles.normal}>Date</Text>
                        <Text style={styles.normal}>Carrier</Text>
                        <Text style={styles.normal}>Payment Method</Text>
                    </VStack>
                    <VStack>
                    <Text style={styles.normal}># { details.invoice_prefix }{ details.invoice_number }</Text>
                        <Text style={styles.normal}># {details.id_order}</Text>
                        <Text style={styles.normal}>{details.date_add}</Text>
                        <Text style={styles.normal}>{details.carrier}</Text>
                        <Text style={styles.normal}>{details.payment_method}</Text>
                    </VStack>
                </HStack>
                <Divider bg="#ccc"/>

                <HStack py={2}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold}>Shipping Address</Text>
                        <Address address={shipping}></Address>
                    </VStack>
                </HStack>
                <Divider bg="#ccc"/>

                <HStack py={2}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold}>Billing Address</Text>
                        <Address address={shipping}></Address>
                    </VStack>
                </HStack>
                <Divider bg="#ccc"/>

                <HStack py={2}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold}>Gift Message</Text>
                        <Text py={2} style={styles.normal}>{giftMessages.gift_message? giftMessages.gift_message : 'No messages available'}</Text>
                    </VStack>
                </HStack>
                <Divider bg="#ccc"/>

                <HStack py={2}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold}>Order Message</Text>
                        <Text py={2} style={styles.normal}>{messages.message ? messages.message : 'No message available'}</Text>
                    </VStack>
                </HStack>
                <Divider bg="#ccc"/>

                <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                    <Text paddingBottom={3} style={styles.bold}>Description</Text>
                    {products.map((item: any, index: any) => {
                        return <ProductDetail product={item} key={index}></ProductDetail>
                    })}
                </VStack>
                <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                    <HStack>
                    <Text style={styles.bold}>Shipping</Text>
                    <Spacer/>
                    <Text style={styles.bold}>{currency} {details.carrier_price}</Text>
                    </HStack>
                </VStack>
                <VStack _dark={{ borderColor: "grey" }} py={3}>
                    <HStack>
                    <Spacer/>
                    <Text style={styles.bold}>TOTAL {currency} { details.total_paid }</Text>
                    </HStack>
                </VStack>
            </View>
            </ScrollView>
            <HStack style={{ height: 50, paddingVertical: 5, marginHorizontal: 20, marginVertical: 10 }}>
                <Button w={'100%'} style={styles.footer} onPress={() => goToHomePage()}>CONTINUE SHOPPING</Button>
            </HStack>
            </Flex>
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
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 3
    },
    border: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingRight: 8
    },
    footer: {
        backgroundColor: '#1cad48'
    },
})


