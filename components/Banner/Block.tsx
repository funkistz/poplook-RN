import { Dimensions, TouchableOpacity } from 'react-native';
import { Center } from 'native-base';
import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Images from './Image';
import Videos from './Video';

const Blocks = memo(function Greeting({ item }: any) {

    const navigation: any = useNavigation();

    const goToCategory = (item: any) => {

        const params = {
            category_id: String(item.block.resource.linkData.id),
            category_name: item.block.resource.linkData.name
        };

        navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.block.resource.linkData.id) });

    }

    return (
        <Center>
            <TouchableOpacity onPress={() => goToCategory(item)}>

                {item.block.resource.type == 'image' && 
                    <Images data={item.block.resource}></Images>
                }

                {item.block.resource.type == 'video' && 
                    <Videos data={item.block.resource}></Videos>
                }

            </TouchableOpacity>
        </Center>
    );
})

export default Blocks;