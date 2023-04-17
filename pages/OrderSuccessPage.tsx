import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, ScrollView, View, HStack, Spacer, VStack, Divider } from "native-base";
import OrderHistoryService from '../Services/OrderHistoryService';
import ProductDetail from '../components/ProductDetail';
import Address from '../components/Address';

export default function OrderSuccessPage({ route } : { route: any }) {

    const orderId = route.params.param.id;
    const [details, setDetails] = useState<any>({});
    const [shipping, setShipping] = useState<any>({});
    const [billing, setBilling] = useState<any>({});
    const [products, setProducts] = useState<any>([]);
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {

        console.log('hai' ,route.params)

        const orderHistoryDetails = async () => {
            const response = await OrderHistoryService.orderHistoryDetails(orderId);
            const json = await response.json();

            console.log('successpage' ,json)

            setDetails(json.data);
            setShipping(json.data.shipping_details);
            setBilling(json.data.billing_details);
            setProducts(json.data.product_details);
            setMessages(json.data.order_message);
        }
        orderHistoryDetails().catch(console.error);

    }, [])

    return (
        <>
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
                <Divider/>

                <Address address={shipping} title='Shipping'></Address>
                <Divider/>

                <Address address={shipping} title='Billing'></Address> 
                <Divider/>

                <HStack py={3}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold}>Gift Message</Text>
                        <Text style={styles.normal}>No messsage available</Text>
                    </VStack>
                </HStack>
                <Divider/>

                <HStack py={3}>
                    <VStack paddingRight={8}>
                        <Text style={styles.bold}>Order Message</Text>
                        <Text style={styles.normal}>No messsage available</Text>
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
                    <Text style={styles.bold}>Free Shipping</Text>
                    </HStack>
                </VStack>
                <VStack style={styles.border} _dark={{ borderColor: "grey" }} py={3}>
                    <HStack>
                    <Spacer/>
                    <Text style={styles.bold}>TOTAL { details.total_paid }</Text>
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 8
    },
    border: {
        borderBottomWidth: 1,
        borderColor: 'muted.100',
        paddingRight: 8
    }
})


