import { StyleSheet, Dimensions, useWindowDimensions, Platform, Alert, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { assignDeviceType } from '../Redux/Slices/Sessions';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { IOS_VERSION, ANDROID_VERSION } from "@env"
import { customerDetails } from '../Redux/Slices/Sessions';
import BannerService from '../Services/BannerService';
import { ScrollView } from 'native-base';
import BlockCreator from '../components/Banner/BlockCreator';
import AuthService from '../Services/AuthService';
import { getWishList } from '../Redux/Slices/Wishlist';
import { getColors, getSizes } from '../Redux/Slices/Filter';

const win = Dimensions.get('window');

export default function HomePage({ navigation }: { navigation: any }) {

    const [banners, setBanners] = useState<any>([]);

    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);
    const session = useSelector((storeState: any) => storeState.session);
    const dispatch = useDispatch()

    useEffect(() => {

        if (Platform.OS === "ios") {
            dispatch(assignDeviceType('ios'));
        } else {
            dispatch(assignDeviceType('android'));
        }

        const unsubscribe = navigation.addListener('focus', () => {

            dispatch(getWishList())
            dispatch(getColors())
            dispatch(getSizes())
            if (session.intro == false || session.intro == undefined) {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'IntroPage',
                    }]
                });
            }


            const getBanners = async () => {
                const response = await BannerService.getMobileBanners(shopId);
                let json = await response.data

                setBanners(json.data.data);
            }

            getBanners().catch(console.error);


        });

        return unsubscribe;

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            // getCurrentIdCart()
            getVersion().catch(console.error);
        }, [])
    );

    const getCurrentIdCart = async () => {
        if (session.user != null) {
            dispatch(customerDetails())
        }

    }

    const getVersion = async () => {
        const response = await AuthService.getVersion();
        const json = await response.json();
        const version = Platform.OS == 'ios' ? json.data.ios_version : json.data.android_version;
        checkVersion(version)
    }

    const checkVersion = (res: any) => {
        if (Platform.OS == 'ios') {
            if (res > IOS_VERSION) {
                forceUpdate()
            }
        } else {
            if (res > ANDROID_VERSION) {
                forceUpdate()
            }
        }
        
    }

    const forceUpdate = () => {
        Alert.alert('New update, better app!', 'Please continue to update the app to enjoy the latest and greatest.', [
            {
                text: 'Update',
                onPress: () => submit()
            },
        ]);
    }

    const submit = () => {
        if (Platform.OS == 'ios') {
            Linking.openURL('https://apps.apple.com/us/app/poplook/id1081245738?platform=iphone')
        } else {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.tiseno.poplook&hl=en&gl=US')
        }
    }

    return (
        <ScrollView w='100%'>

            {banners.map((data: any, index: any) => {

                return <BlockCreator data={data} key={index} />

            })}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
});



