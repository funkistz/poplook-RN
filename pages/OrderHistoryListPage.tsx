import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, ScrollView, View, HStack, Button, VStack, Center, Spacer, Flex } from "native-base";
import OrderHistoryService from '../Services/OrderHistoryService';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import GeneralService from '../Services/GeneralService';

export default function OrderHistoryListPage() {

    const customerId = useSelector((storeState: any) => storeState.session.user.id_customer);
    const navigation: any = useNavigation();
    const [orders, setOrders] = useState<any>([]);

    useEffect(() => {

        const getOrderHistoryList = async () => {
            const response = await OrderHistoryService.orderHistoryList(customerId);
            const json = await response.json();

            console.log('order' ,json)

            setOrders(json.data.order_histories);
        }
        getOrderHistoryList().catch(console.error);

    }, [])

    const orderHistoryDetailsPage = (id_order: any) => {

        const params = {
            id: id_order
        };

        navigation.navigate('OrderHistoryDetailPage', { screen: 'OrderHistoryDetailPage', params: params });
    }

    const repayPage = (id_cart: any) => {

        const params = {
            id: id_cart
        };

        navigation.navigate('RepayPage', { screen: 'RepayPage', params: params });
    }

    const cancelOrder = (orderId: any) =>
        Alert.alert('Message', 'Confirm to cancel order?', [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {   text: 'OK', 
            onPress: () => cancelOrderHistory(orderId)
        },
    ]);

    const cancelOrderHistory = async (orderId : any) => {
        const response = await OrderHistoryService.cancelOrderHistory(orderId);
        const json = await response.json();

        if (json.code == 200) {
            GeneralService.toast({ description: json.message, type: json.status });
        } else {
            GeneralService.toast({ description: json.message, type: json.status });
        }
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                        {orders && orders.map((item: any, index: any) => {
                            return <><TouchableOpacity key={index} onPress={() => orderHistoryDetailsPage(item.id_order)}>
                                <HStack py={3}>
                                    <VStack paddingRight={8}>
                                        <Text style={styles.normal}>Order No</Text>
                                        <Text style={styles.normal}>Date</Text>
                                        <Text style={styles.normal}>Status</Text>
                                        <Text style={styles.normal}>Tracking No</Text>
                                        <Text style={styles.normal}>Delivery No</Text>
                                    </VStack>
                                    <VStack>
                                    <Text style={styles.bold}># {item.id_order}</Text>
                                        <Text style={styles.normal}>{item.date_add}</Text>
                                        <Text style={styles.normal}>{item.order_state}</Text>
                                        <Text style={styles.normal}>{item.tracking_number}</Text>
                                        <Text style={styles.normal}>{item.carrier}</Text>
                                    </VStack>
                                </HStack>
                                { item.valid && item.valid == '0' ? ( 
                                <HStack borderBottomWidth="1" _dark={{ borderColor: "grey" }} borderColor="muted.100" paddingX={65}>
                                <Button
                                        mb={5}
                                        style={styles.button}
                                        marginRight={5}
                                        _text={{ fontSize: 13, fontWeight: 600 }}
                                        onPress={() => repayPage(item.id_cart)}>PAY NOW
                                    </Button>
                                    <Button
                                        mb={5}
                                        style={styles.button}
                                        _text={{ fontSize: 13, fontWeight: 600 }}
                                        onPress={() => cancelOrder(item.id_order)}>CANCEL
                                    </Button>
                                </HStack> ) : <HStack borderBottomWidth="1" _dark={{ borderColor: "grey" }} borderColor="muted.100" paddingX={65}></HStack> }
                            </TouchableOpacity></>
                        })}
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
        sizes: 'md',
        backgroundColor: 'black',
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
})

