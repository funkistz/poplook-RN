import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Link, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'native-base';
import { WEB_URL, API_KEY } from "@env"
import { useDispatch, useSelector } from 'react-redux';
import { getWishList } from '../Redux/Slices/Wishlist';

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

    const goToCategory = (banner: any) => {

        const params = {
            category_id: banner.category_id,
            category_name: banner.category_name
        };

        navigation.navigate('Home', { screen: 'CategoryPage', params: params });
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