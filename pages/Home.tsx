import { StyleSheet, View, Dimensions, Platform, Alert, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Link, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'native-base';
import { WEB_URL, API_KEY, IOS_VERSION } from "@env"
import { useDispatch, useSelector } from 'react-redux';
import { getWishList } from '../Redux/Slices/Wishlist';
import { useFocusEffect } from '@react-navigation/native';
import AuthService from '../Services/AuthService';
import { customerDetails } from '../Redux/Slices/Sessions';
import { getCart } from '../Redux/Slices/Cart';
import { assignDeviceType } from '../Redux/Slices/Sessions';
import ProductService from '../Services/ProductService';
// import { getColors, getSizes } from '../Redux/Slices/Filter';
import Video from 'react-native-video';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
    image: {
        width: '200',
        height: win.height,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlayer: {
        aspectRatio: 3/3
    },
    videoStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default function HomePage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch()
    const session = useSelector((storeState: any) => storeState.session);
    const [banners, setBanners] = useState<any[]>([]);
    const [videos, setVideos] = useState<any>([]);

    useEffect(() => {

        if (Platform.OS === "ios") {
            dispatch(assignDeviceType('ios'));
        } else {
            dispatch(assignDeviceType('android'));
        }

        const unsubscribe = navigation.addListener('focus', () => {
            console.log('session', session);
            dispatch(getWishList())
            // dispatch(getColors())
            // dispatch(getSizes())
            if (session.intro == false || session.intro == undefined) {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'IntroPage',
                    }]
                });
            }

            const fetchData2 = async () => {
                const response = await BannerService.getBanners();
                const json = await response.json();

                setBanners(json.data);

            }

            fetchData2().catch(console.error);

            const fetchVideo = async () => {
                const response = await BannerService.getBannersVideo();
                const json = await response.json();

                setVideos(json.data);

            }
            fetchVideo().catch(console.error);
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
        <Center>
            <ScrollView w='100%'>

                {videos && 

                    <Center>

                        {videos.map((item: any) => {

                            <TouchableOpacity onPress={() => goToCategory(item)}>
                                <Video
                                    source={{ uri: item.href }}
                                    style={styles.videoPlayer}
                                    controls={false}
                                    autoplay={true}
                                    repeat={true} 
                                    resizeMode="cover" 
                                />
                            </TouchableOpacity>
                        })} 

                    </Center>
                }
                
                {banners &&
                    <Flex direction="column">
                        {Object.keys(banners).map((key: any) => {

                            return <Center key={key}>
                                {
                                    
                                    banners[key].data.map((banner: any, key2: any) => {

                                        const href: string = banner.href;

                                        const height = Number(banner.height) * (win.width / Number(banner.width));

                                        return <Center key={banner.id + key2} >
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
                                }
                            </Center>
                        })
                        }
                    </Flex>
                }
            </ScrollView>
        </Center>
    );
}