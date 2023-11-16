import { StyleSheet, Dimensions, Linking, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Link, ScrollView } from 'native-base';
import { WEB_URL } from "@env"
import Children from '../components/Banner/Children';

const win = Dimensions.get('window');

export default function HomePage({ navigation }: { navigation: any }) {

    const [banners, setBanners] = useState<any>([]);

    useEffect(() => {

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

    const goToCategory = (item: any) => {

        console.log('item', item);

        console.log('banner', item.block.resource.link);
        console.log('banner true', item.block.resource.link.includes("process_redirect_url.php"));

        if (item.block.resource.link.includes("process_redirect_url.php")) {
            Linking.openURL(WEB_URL + item.block.resource.link);
        } else {

            const params = {
                category_id: String(item.block.resource.categoryId),
                category_name: item.name
            };

            console.log('title', item.block.resource.categoryId);

            navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.block.resource.categoryId) });

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

                                return <>
                                    <TouchableOpacity onPress={() => goToCategory(item)}>
                                        <Children item={item} index={index} navigation={navigation}></Children>
                                    </TouchableOpacity>
                                </>
                            })}
                        </Flex>
            })}
            
    
        </ScrollView>
        
      );
}

const styles = StyleSheet.create({
});

