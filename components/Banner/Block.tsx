import { Dimensions, TouchableOpacity, Image } from 'react-native';
import { Flex } from 'native-base';
import React, { memo, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Images from './Image';
import Videos from './Video';

const win = Dimensions.get('window');

const Blocks = memo(function Greeting({ item, type }: any) {

    const navigation: any = useNavigation();
    const [imageHeight, setImageHeight] = useState<any>({})

    useEffect(() => {

        if (item.block.resource) {

            const url = 'https://api.poplook.com/' + item.block.resource.href;

            Image.getSize(url, (width: any, height: any) => {

                setImageHeight(height * win.width / width);

            });
        }

    }, [item])

    const goToCategory = (item: any) => {
        
        if (item.block.resource.linkData.type == 'category') {

            const params = {
                category_id: String(item.block.resource.linkData.id),
                category_name: item.block.resource.linkData.name
            };
    
            type == 'banner' ? navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.block.resource.linkData.id) }) : navigation.navigate('Categories', { screen: 'CategoryPage', params: params, title: String(item.block.resource.linkData.id) })

        } else if (item.block.resource.linkData.type == 'product') {

            const params = {
                product_id: String(item.block.resource.linkData.id)
            };
    
            navigation.navigate('ProductDetailPage', params);

        } else if (item.block.resource.linkData.type == 'page') {

            const params = {
                page_id: String(item.block.resource.linkData.id),
                page_name: item.block.resource.linkData.name,
                page_url: item.block.resource.linkData.url
            };
            
            type == 'banner' ? navigation.navigate('Home', { screen: 'CustomPage', params: params, title: String(item.block.resource.linkData.name) }) : navigation.navigate('CustomPage', { screen: 'CategoryPage', params: params, title: String(item.block.resource.linkData.name) })
            
        }

    }

    const getChildWidth = (col: any) => {

        if (col.type == '%') {
            return (col.value / 100) * win.width;
        } else if (col.type == 'px') {
            return imageHeight * (col.value / 375);
        } else if (col.type == 'auto') {
            return imageHeight;
        } else {
            return imageHeight;
        }

    }

    return (
        <Flex>
            <TouchableOpacity onPress={() => goToCategory(item)}>

                {item.block.resource.type == 'image' && 
                    <Images data={item.block.resource} width={getChildWidth(item.col)}></Images>
                }

                {item.block.resource.type == 'video' && 
                    <Videos data={item.block.resource}></Videos>
                }

            </TouchableOpacity>
        </Flex>
    );
})

export default Blocks;