import { StyleSheet, Dimensions, Linking, TouchableOpacity, Alert, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex } from 'native-base';
import { ScrollView } from 'native-base';
import Children from '../components/Banner/Children';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../Services/AuthService';
import { customerDetails } from '../Redux/Slices/Sessions';
import { getCart } from '../Redux/Slices/Cart';
import { assignDeviceType } from '../Redux/Slices/Sessions';
import ProductService from '../Services/ProductService';
import { getColors, getSizes } from '../Redux/Slices/Filter';
import { getWishList } from '../Redux/Slices/Wishlist';
import { WEB_URL, API_KEY, IOS_VERSION } from "@env"

const win = Dimensions.get('window');

export default function BannerPage({ navigation, route }: { navigation: any, route: any }) {

    const dispatch = useDispatch()
    const session = useSelector((storeState: any) => storeState.session);
    const [banners, setBanners] = useState<any>([]);

    useEffect(() => {

        if (Platform.OS === "ios") {
            dispatch(assignDeviceType('ios'));
        } else {
            dispatch(assignDeviceType('android'));
        }

        const unsubscribe = navigation.addListener('focus', () => {

            const getBanners = async () => {
                const response = await BannerService.getMobileBanners();
                let json = await response.data
    
                setBanners(json.data.data);
            }
    
            getBanners().catch(console.error);

            
        });

        return unsubscribe;

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getCurrentIdCart()
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
        if (res > IOS_VERSION) {
            // forceUpdate()
            // navigation.reset({
            //     index: 0,
            //     routes: [{
            //         name: 'ForceUpdatePage',
            //     }]
            // });
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
        if(Platform.OS == 'ios') {
            Linking.openURL('https://apps.apple.com/us/app/poplook/id1081245738?platform=iphone')
        } else {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.tiseno.poplook&hl=en&gl=US')
        }
    }

    const goToCategory = (banner: any) => {

        console.log('banner', banner.link);
        console.log('banner true', banner.link.includes("process_redirect_url.php"));

        if (banner.link.includes("process_redirect_url.php")) {
            Linking.openURL(WEB_URL + banner.link);
        } else {

            const params = {
                category_id: banner.category_id,
                category_name: banner.category_name
            };

            console.log('title', banner.category_name);

            navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: banner.category_name });

        }

    }

    return (
        <ScrollView>
            {banners.map((data: any, index: any) => {

                return <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
                            paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left }} 
                            key={index}>
                    

                            {data.children.map((item: any, index: any) => {

                                const columnNumber = win.width / (item.block.columnNo)

                                return <><TouchableOpacity onPress={() => goToCategory(data)}>

                                <Children item={item} index={index} navigation={navigation}></Children>

                                </TouchableOpacity></>
                            })}
                        </Flex>
            })}
            
    
        </ScrollView>
        
      );
}

const styles = StyleSheet.create({
});