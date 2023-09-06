import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Flex, HStack, ScrollView, Text, Button, Badge, Backdrop } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCart } from '../Redux/Slices/Cart';
import CartList from '../components/Cart/CartList';
import { useIsFocused } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import CartUpdate from '../components/Cart/CartUpdate';

export default function CartPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const isFocused = useIsFocused();

    const cart = useSelector((storeState: any) => storeState.cart);
    const user = useSelector((storeState: any) => storeState.session.user);
    const session = useSelector((storeState: any) => storeState.session);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        if (index == -1) {
            setBackdropVisible(false)
        }
    }, []);
    const [backdropVisible, setBackdropVisible] = useState(false);
    
    useEffect(() => {

        if (isFocused) {
            dispatch(getCart());
        }

    }, [isFocused])


    const checkoutPage = () => {
        user ? navigation.navigate('CheckoutExPage', { screen: 'CheckoutExPage' }) : navigation.navigate('LoginPage', { screen: 'LoginPage' });
    }

    const updateCart = async () => {

        bottomSheetRef.current?.snapToIndex(0);
        setBackdropVisible(true);
        
    }


    return (
        <>
            <Flex flex={1} flexDirection="column" backgroundColor='white'>

                {cart && cart.data && cart.data.cart_messages &&
                    <>
                        {cart.data.cart_messages.map((message: any, index: any) => {
                            return <Badge colorScheme="success" variant={'subtle'} bgColor={'green.100'} padding={2} marginX={3} marginY={1} key={index}>{message}</Badge>
                        })
                        }
                    </>
                }

                {cart && cart.data && cart.data.totalItemInCart == 0 ? <Text style={styles.bold} mt={10}>Your shopping bag is empty.</Text> : null}
                {cart && !cart.id_cart ? <Text style={styles.bold} mt={10}>Your shopping bag is empty.</Text> : null}
                {cart && cart.data && cart.data.product_list && cart.data.product_list.length > 0 &&
                    <>
                        {cart.data.product_list.length > 0 && <>
                            <ScrollView flex={1}>
                                {cart.data.product_list.map((product: any, index: any) => {
                                    return <CartList key={index} product={product} openUpdateCart={updateCart}></CartList>
                                })
                                }
                            </ScrollView>
                            <HStack px="1" py="1" bg={'gray.100'} justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
                                <HStack alignItems="center" w="40%">
                                    <Text fontSize="14" color="black" pl={2} bold> SubTotal</Text>
                                </HStack>
                                <HStack justifyContent="flex-end" w="30%" alignItems={'center'} mr={3}>
                                    <Text color='black' bold>{session.country.currency_sign} {cart.data.totalProductsWt}</Text>
                                </HStack>
                            </HStack>
                            <HStack px="1" py="2" bg={'gray.100'} justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
                                <HStack alignItems="center" w="40%">
                                    <Text fontSize="14" color="black" pl={2} bold> Shipping</Text>
                                </HStack>
                                <HStack justifyContent="flex-end" w="30%" alignItems={'center'} mr={3}>
                                    <Text color='black' bold>{Number(cart.data.shipping_price) == 0 ? 'Free Shipping' : session.country.currency_sign + ' ' + cart.data.shipping_price}</Text>
                                </HStack>
                            </HStack>
                            <HStack px="1" py="2" bg={'gray.100'} justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
                                <HStack alignItems="center" w="40%">
                                    <Text fontSize="14" color="black" pl={2} bold> TOTAL PAYABLE</Text>
                                </HStack>
                                <HStack justifyContent="flex-end" w="30%" alignItems={'center'} mr={3}>
                                    <Text color='black' bold>{session.country.currency_sign} {(Number(cart.data.totalProductsWt) + Number(cart.data.shipping_price)).toFixed(2)}</Text>
                                </HStack>
                            </HStack>
                            <HStack style={{ height: 50, paddingVertical: 5, marginHorizontal: 20, marginVertical: 10 }}  >
                                <Button w={'100%'} style={styles.footer} onPress={() => checkoutPage()}>NEXT</Button>
                            </HStack>
                        </>
                        }

                    </>
                }
            </Flex>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose
                backdropComponent={() => (
                    <>
                        {backdropVisible && <Backdrop
                            onPress={() => {
                                setBackdropVisible(false);
                                bottomSheetRef.current?.close();
                            }}
                            opacity={0.5} 
                        />}
                    </>
                )}
                >
                <View style={styles.contentContainer}>
                    {cart.data.product_list.map((product: any, index: any) => {
                        return <CartUpdate key={index} product={product} openUpdateCart={updateCart}></CartUpdate>
                    })
                    }
                </View>
            </BottomSheet>

        </> 

    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#1cad48'
    },
    bold: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    contentContainer: {
        flex: 1,
        // alignItems: 'center',
        padding: 15
    },
})