import { Dimensions, View } from 'react-native';
import { Text, FlatList, Center } from 'native-base';
import React, { memo } from 'react';
import Images from './Image';
import Videos from './Video';

const win = Dimensions.get('window');

const Blocks = memo(function Greeting({ item }: any) {

    return (
        <Center>
            {item.block.resource.type == 'image' && 
                <Images width={win.width} data={item.block.resource}></Images>
            }

            {item.block.resource.type == 'video' && 
                <Videos width={win.width} height={200} data={item.block.resource}></Videos>
            }
        </Center>
    );
})

export default Blocks;