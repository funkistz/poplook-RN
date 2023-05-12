import { StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, HStack, Box, Spacer, Icon, Select } from "native-base";
import { logout } from '../Redux/Slices/Sessions';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../Redux/app';
import { clearCart } from '../Redux/Slices/Cart';
import { clearCheckout } from '../Redux/Slices/Checkout';
import { clearAddress } from '../Redux/Slices/Address';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import { userSelector } from '../Redux/Slices/Sessions';
import { getCountries } from '../Redux/Slices/Infos';
import ShippingTo from '../components/ShippingTo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { getWishList } from '../Redux/Slices/Wishlist';
import { VERSION } from "@env"

export default function SettingPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch()
    const { user } = useSelector(
        userSelector
    );

    const categories = [
        { id: 0, key: "personal", title: "Personal Information", icon: "person-outline" },
        { id: 1, key: "address", title: "My Addresses", icon: "navigate-outline" },
        { id: 2, key: "order", title: "Order History", icon: "reorder-four-outline" },
        // { id: 3, key: "voucher", title: "My Vouchers", icon: "gift-outline" },
        { id: 4, key: "credit", title: "Store Credit", icon: "wallet-outline" },
        { id: 5, key: "loyalty", title: "Loyalty", icon: "card-outline" },
        { id: 6, key: "about", title: "About Us", icon: "information-circle-outline" },
        { id: 7, key: "customerservice", title: "Customer Service", icon: "people-outline" },
        { id: 8, key: "shipping", title: "Shipping Information", icon: "cube-outline" },
        { id: 9, key: "term", title: "Terms and Conditions", icon: "reader-outline" },
        { id: 10, key: "privacypolicy", title: "Privacy Policy", icon: "shield-checkmark-outline" }
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

    return (
        <View backgroundColor='white'>
            <ScrollView>
                {user &&
                    <Box p={5} >
                        <HStack space={3} >
                            <IonIcon name="person-circle-outline" size={24} color="black" />
                            <Text color='#000' fontSize={20} mb={3}>Welcome back {user.name}</Text>
                        </HStack>

                        <Box alignItems="center" shadow={1} borderRadius={8} pb={6} pt={6} backgroundColor='white'>

                            <Text color='#32CD32' fontSize={12} mb={2} >Please scan your membership barcode at checkout</Text>
                            <Barcode
                                format="CODE128B"
                                value={user.id_customer.toString()}
                                style={{ marginBottom: 0 }}
                                width={3}
                                maxWidth={Dimensions.get('window').width / 2 * 3}
                                height={50}
                            />
                            <Text color='#000' fontSize={16} mt={1} >{user.id_customer}</Text>
                        </Box>
                    </Box>
                }
                <Box px={6} mb={6} >
                    <ShippingTo></ShippingTo>
                </Box>
                <View style={styles.container}>
                    {categories.map((item, index) => {
                        return <TouchableOpacity key={index} onPress={() => goToDetailsPage(item.id, item.key, item.title)}>
                            <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" alignItems="center">
                                <Icon as={IonIcon} name={item.icon} size="6" color='black' />
                                <Text pl={3} color="black" fontSize={16}>{item.title}</Text>
                                <Spacer />
                                <IonIcon name="chevron-forward-outline" size={20} color="#777" />
                            </HStack>
                        </TouchableOpacity>
                    })}
                    <TouchableOpacity onPress={() => alertLogout()}>
                        <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" alignItems="center">
                            <Icon as={IonIcon} name="log-out-outline" size="6" color='#000000' />
                            <Text pl={3} color="#FF0000" fontSize={16}>
                                Logout
                            </Text>
                            <Spacer />
                        </HStack>
                    </TouchableOpacity>
                    <Text style={styles.version}>App Version {VERSION}</Text>
                </View>
            </ScrollView>
        </View>
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
    }
})