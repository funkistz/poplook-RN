import { StyleSheet, View, Dimensions, Platform, Alert, Linking} from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Link, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'native-base';
import { WEB_URL, API_KEY, VERSION } from "@env"
import { useDispatch, useSelector } from 'react-redux';
import { getWishList } from '../Redux/Slices/Wishlist';
import { useFocusEffect } from '@react-navigation/native';
import AuthService from '../Services/AuthService';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
    image: {
        width: '200',
        height: win.height,
    },
});

export default function HomePage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch()
    const [banners, setBanners] = useState<any[]>([]);
    
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            const fetchData2 = async () => {
                const response = await BannerService.getBanners();
                const json = await response.json();
                setBanners(json.data);
            }
            fetchData2().catch(console.error);
            dispatch(getWishList())
        });

        return unsubscribe;

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const getVersion = async () => {
                const response = await AuthService.getVersion();
                const json = await response.json();
                checkVersion(json.data)
            }
            getVersion().catch(console.error);
        }, [])
    );

    const checkVersion = (res:any) => {
        let platform = '';
        if(Platform.OS == 'ios') {
            platform = res.ios_version
        } else {
            platform = res.android_version
        }

        if(platform > VERSION) {
            Alert.alert('Please update to continue using the app.', '', [
                {
                    text: 'OK',
                    onPress: () => update(platform)
                },
            ]);
        }
    }

    const update = (res:any) => {
        if(Platform.OS == 'ios') {
            Linking.openURL('https://apps.apple.com/us/app/poplook/id1081245738?platform=iphone')
        } else {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.tiseno.poplook&hl=en&gl=US')
        }
    }

    const goToCategory = (banner: any) => {

        const params = {
            category_id: banner.category_id,
            category_name: banner.category_name
        };

        console.log('title', banner.category_name);

        navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: banner.category_name });
    }

    return (
        <Center>
            <ScrollView w='100%'>
                {banners &&
                    <Flex direction="column">
                        {Object.keys(banners).map((key: any) => {

                            return banners[key].data.map((banner: any, key2: any) => {

                                const href: string = banner.href;

                                const height = Number(banner.height) * (win.width / Number(banner.width));

                                return <Center key={key2} >
                                    {!banner.new_window.includes("_blank") &&
                                        <TouchableOpacity onPress={() => goToCategory(banner)}>
                                            <Image w={win.width} h={height} source={{
                                                uri: banner.href
                                            }} alt="Alternate Text" />
                                        </TouchableOpacity>
                                    }
                                    {banner.new_window.includes("_blank") &&
                                        <Link href={WEB_URL + banner.link}>
                                            <Image w={win.width} h={height} source={{
                                                uri: banner.href
                                            }} alt="Alternate Text" />
                                        </Link>
                                    }
                                </Center>
                            })
                        })
                        }
                    </Flex>
                }
            </ScrollView>
        </Center>
    );
}