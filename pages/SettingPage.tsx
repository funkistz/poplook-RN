import { StyleSheet, TouchableOpacity, Dimensions, Alert, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, HStack, Box, Spacer, Icon, Select, Button, Flex, Center } from "native-base";
import { logout } from '../Redux/Slices/Sessions';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../Redux/app';
import { clearCart } from '../Redux/Slices/Cart';
import { clearCheckout } from '../Redux/Slices/Checkout';
import { clearAddress } from '../Redux/Slices/Address';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import { userSelector } from '../Redux/Slices/Sessions';
import ShippingTo from '../components/ShippingTo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { getWishList } from '../Redux/Slices/Wishlist';
import { IOS_VERSION, ANDROID_VERSION } from "@env"
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingPage({ route }: { route: any }) {

    const dispatch = useDispatch()
    const session = useSelector((storeState: any) => storeState.session);
    const { user } = useSelector(userSelector);
    const params = route.params;
    const navigation: any = useNavigation();

    const accounts = [
        { id: 0, key: "personal", title: "Personal Information", icon: "person-outline" },
        { id: 1, key: "address", title: "My Addresses", icon: "navigate-outline" },
        { id: 2, key: "order", title: "Order History", icon: "reorder-four-outline" },
        // { id: 3, key: "voucher", title: "My Vouchers", icon: "gift-outline" },
        { id: 4, key: "credit", title: "Store Credit", icon: "wallet-outline" },
        { id: 5, key: "loyalty", title: "Loyalty", icon: "card-outline" },
        // { id: 6, key: "about", title: "About Us", icon: "information-circle-outline" },
        { id: 7, key: "customerservice", title: "Customer Service", icon: "people-outline" },
        // { id: 8, key: "shipping", title: "Shipping Information", icon: "cube-outline" },
        // { id: 9, key: "term", title: "Terms and Conditions", icon: "reader-outline" },
        // { id: 10, key: "privacypolicy", title: "Privacy Policy", icon: "shield-checkmark-outline" },
        // { id: 11, key: "visitourstore", title: "Visit Our Stores", icon: "storefront-outline" }
    ];

    const supports = [
        { id: 6, key: "about", title: "About Us", icon: "information-circle-outline" },
        // { id: 7, key: "customerservice", title: "Customer Service", icon: "people-outline" },
        { id: 8, key: "shipping", title: "Shipping Information", icon: "cube-outline" },
        { id: 9, key: "term", title: "Terms and Conditions", icon: "reader-outline" },
        { id: 10, key: "privacypolicy", title: "Privacy Policy", icon: "shield-checkmark-outline" },
        { id: 11, key: "visitourstore", title: "Visit Our Stores", icon: "storefront-outline" }
    ];

    const goToDetailsPage = (id: any, key: any, title: any) => {

        const params = {
            key: key,
            id: id,
            title: title
        };

        if (id == 6 || id == 8 || id == 9 || id == 10) {
            navigation.navigate('CmsPage', { screen: 'CmsPage', params: params });
        } else if (id == 0) {
            navigation.navigate('PersonalInfoPage', { screen: 'PersonalInfoPage', params: params });
        } else if (id == 1) {
            navigation.navigate('AddressListPage', { screen: 'AddressListPage', params: params });
        } else if (id == 2) {
            navigation.navigate('OrderHistoryListPage', { screen: 'OrderHistoryListPage', params: params });
        } else if (id == 7) {
            navigation.navigate('CustomerServicePage', { screen: 'CustomerServicePage', params: params });
        } else if (id == 4) {
            navigation.navigate('StoreCreditPage', { screen: 'StoreCreditPage', params: params });
        } else if (id == 5) {
            navigation.navigate('LoyaltyPage', { screen: 'LoyaltyPage', params: params });
        } else if (id == 11) {
            navigation.navigate('VisitStorePage', { screen: 'VisitStorePage', params: params });
        } else {
            //
        }
    }

    const logoutUser = () => {

        persistor.purge().then(() => {
            dispatch(logout())
            dispatch(getWishList())
            dispatch(clearCart())
            dispatch(clearCheckout())
            dispatch(clearAddress())
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: session.user != null ? 'Main' : 'My Account' }],
                })
            );
        });
    }

    const alertLogout = () => {
        Alert.alert('Are you sure want to logout?', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => logoutUser()
            },
        ]);
    }

    if (params && params.redirect == 'order-history') {
        navigation.navigate('My Account', {
            screen: 'OrderHistoryListPage',
        });
    }

    const goToLoginPage = () => {

        navigation.navigate('LoginPage', { screen: 'LoginPage' });
    }

    return (
        <Flex flex={1} backgroundColor='white'>
            <ScrollView>
                {user &&
                <>
                    <Box p={5} >
                        <HStack space={3} >
                            <IonIcon name="person-circle-outline" size={24} color="black" />
                            <Text color='#000' fontSize={20} mb={3}>Welcome back {user.name}</Text>
                        </HStack>

                        <Box alignItems="center" shadow={1} borderRadius={8} pb={6} pt={6} backgroundColor='white'>

                            <Text color='#32CD32' fontSize={12} mb={2} >Please scan your membership barcode at checkout</Text>
                            {user.id_entity &&
                                <>
                                    <Barcode
                                        format="CODE128B"
                                        value={user.id_entity}
                                        style={{ marginBottom: 0 }}
                                        width={Dimensions.get('window').width / (1.3)}
                                        maxWidth={Dimensions.get('window').width / (1.3)}
                                        height={60}
                                    />
                                    <Text color='#000' fontSize={16} mt={1} >{user.id_entity}</Text>
                                </>
                            }
                        </Box>
                    </Box>
                
                    <Box px={6} mb={6} >
                        <ShippingTo></ShippingTo>
                    </Box>
                </>
                }  

                {!user && 
                    <>
                    <Box p={5} >
                    <Box alignItems="center" shadow={1} borderRadius={8} pb={6} pt={6} backgroundColor='white'>
                        <Text color='#1cad48' fontSize={16} marginX={5} marginTop={4} marginBottom={2}>Get the most out of Poplook app by creating or signing in to your account now.</Text>
                        <HStack style={{ paddingVertical: 5, marginHorizontal: 30, marginVertical: 5}}>
                            <Button bg={'#1cad48'} w={'100%'} _text={{ fontSize: 14, fontWeight: 600 }} _pressed={{ backgroundColor: '#1cad48' }} onPress={() => goToLoginPage()}>LOG IN / SIGN UP</Button>
                        </HStack>     
                    </Box>
                    </Box>
                    </>
                }  
                      
                <View style={styles.container}>
                    {user && <>
                        {accounts.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={() => goToDetailsPage(item.id, item.key, item.title)}>
                                <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" alignItems="center">
                                    { item.id != 11 ? <Icon as={IonIcon} name={item.icon} size="6" color='black'/> : <Icons name={item.icon} size={24} color="black"/>}
                                    <Text pl={3} color="black" fontSize={16}>{item.title}</Text>
                                    <Spacer />
                                    <IonIcon name="chevron-forward-outline" size={20} color="#777" />
                                </HStack>
                            </TouchableOpacity>
                        })}
                        <TouchableOpacity onPress={() => alertLogout()}>
                            <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" alignItems="center">
                                <Icon as={IonIcon} name="log-out-outline" size="6" color='#FF0000' />
                                <Text pl={3} color="#FF0000" fontSize={16}>
                                    Logout
                                </Text>
                                <Spacer />
                            </HStack>
                        </TouchableOpacity>
                        </>
                    }
                    {!user && <>
                        {supports.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={() => goToDetailsPage(item.id, item.key, item.title)}>
                                <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" alignItems="center">
                                    { item.id != 11 ? <Icon as={IonIcon} name={item.icon} size="6" color='black'/> : <Icons name={item.icon} size={24} color="black"/>}
                                    <Text pl={3} color="black" fontSize={16}>{item.title}</Text>
                                    <Spacer />
                                    <IonIcon name="chevron-forward-outline" size={20} color="#777" />
                                </HStack>
                            </TouchableOpacity>
                        })}
                        </>
                    }
                    <Text style={styles.version}>App Version {Platform.OS == 'ios' ? IOS_VERSION : ANDROID_VERSION}</Text>
                </View>
            </ScrollView>
        </Flex>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingTop: 0
    },
    left_section: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
        paddingBottom: 15
    },
    version: {
        color: 'black',
        marginTop: 10,
    },
    title: {
        color: '#1cad48',
        paddingTop: 50,
        fontSize: 16,
        fontWeight: '600'
    }
})