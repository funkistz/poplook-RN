import { Dimensions, TouchableOpacity } from 'react-native';
import { Text, FlatList, Center } from 'native-base';
import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Images from './Image';
import Videos from './Video';

const win = Dimensions.get('window');

const Blocks = memo(function Greeting({ item, height }: any) {

    const navigation: any = useNavigation();

    const goToCategory = (item: any) => {

        const params = {
            category_id: String(item.block.resource.categoryId),
            category_name: item.name
        };

        console.log('title', item.block.resource.categoryId);

        navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.block.resource.categoryId) });

    }

    return (
        <Center>
            <TouchableOpacity onPress={() => goToCategory(item)}>
                {item.block.resource.type == 'image' && 
                    <Images data={item.block.resource} width={win.width} height={height}></Images>
                }

                {item.block.resource.type == 'video' && 
                    <Videos data={item.block.resource} width={win.width} height={height}></Videos>
                }
            </TouchableOpacity>
        </Center>
    );
})

export default Blocks;