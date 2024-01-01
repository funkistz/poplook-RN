import { StyleSheet, Dimensions, useWindowDimensions, Platform, Alert, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { assignDeviceType } from '../Redux/Slices/Sessions';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { IOS_VERSION } from "@env"
import { customerDetails } from '../Redux/Slices/Sessions';
import BannerService from '../Services/BannerService';
import { Flex, ScrollView } from 'native-base';
import Children from '../components/Banner/Children';
import Sliders from '../components/Banner/Sliders';
import TextWithStyle from '../components/Banner/TextWithStyle';
import Blocks from '../components/Banner/Block';
import Grid from '../components/Banner/Grid';
import Carousels from '../components/Banner/Carousel';
import AuthService from '../Services/AuthService';
import { getWishList } from '../Redux/Slices/Wishlist';
import { getColors, getSizes } from '../Redux/Slices/Filter';

const win = Dimensions.get('window');

export default function HomePage({ navigation }: { navigation: any }) {

    const [banners, setBanners] = useState<any>([]);
    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);
    const session = useSelector((storeState: any) => storeState.session);
    const layout = useWindowDimensions();
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
        if (res > IOS_VERSION) {
            forceUpdate()
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

    const getChildWidth = (col: any) => {

        if (col.type == '%') {
            return (col.value / 100) * layout.width;
        } else if (col.type == 'px') {
            return layout.width * (col.value / 375);
        } else if (col.type == 'auto') {
            return layout.width;
        } else {
            return layout.width;
        }
    }

    const getChildHeight = (height: any) => {

        if (height != 'auto') {
            return layout.height * (height / 667);
        } else {
            return layout.height;
        }
    }

    return (
        <ScrollView w='100%'>
            {banners.map((data: any, index: any) => {

                return <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
                    paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left, 
                    height: data.height, width: '100%', backgroundColor: data.backgroundColor }} 
                    key={index}>

                        {data.children != null &&
                            <>
                                {data.children.map((item: any, index: any) => {

                                    return <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                                        height: item.height, width: getChildWidth(item.col) }} key={index}>

                                        {item.block.type == 'block' && 
                                            <Blocks item={item} type={'banner'}></Blocks> 
                                        }

                                        {item.block.type == 'grid' && 
                                            <Grid item={item} type={'banner'}></Grid>   
                                        }

                                        {item.block.type == 'text' && 
                                            <TextWithStyle data={item.block.resource.labelObj}></TextWithStyle>
                                        }

                                        {item.block.type == 'slider' && 
                                            <Sliders item={item} type={'banner'}></Sliders>
                                        }

                                        {item.block.type == 'carousel' && 
                                            <Carousels item={item} type={'banner'}></Carousels> 
                                        }

                                        {item.block.type == 'product_list' && 
                                            <Sliders item={item} type={'banner'}></Sliders>
                                        }

                                        {/* <Children item={item} index={index} navigation={navigation}></Children> */}

                                    </Flex>

                                })}
                            </>
                        }

                    </Flex>
            })}
    
        </ScrollView>
      );
}

const styles = StyleSheet.create({
});



