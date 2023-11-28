import { StyleSheet, Dimensions, Linking, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Link, ScrollView } from 'native-base';
import { WEB_URL } from "@env"
import Children from '../components/Banner/Children';
import { useSelector } from 'react-redux';

const win = Dimensions.get('window');

export default function HomePage({ navigation }: { navigation: any }) {

    const [banners, setBanners] = useState<any>([]);
    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            const getBanners = async () => {
                const response = await BannerService.getMobileBanners(shopId);
                let json = await response.data
    
                setBanners(json.data.data);
            }
    
            getBanners().catch(console.error);

            
        });

        return unsubscribe;
        
    }, [])

    const goToCategory = (item: any) => {

            const params = {
                category_id: String(item.block.resource.categoryId),
                category_name: item.name
            };

            console.log('title', item.block.resource.categoryId);

            navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.block.resource.categoryId) });

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

                                        return <Children item={item} index={index} navigation={navigation}></Children>

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



