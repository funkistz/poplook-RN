import { Dimensions, View } from 'react-native';
import { Text, FlatList, Center } from 'native-base';
import React, { memo } from 'react';
import Images from './Image';
import Videos from './Video';

const win = Dimensions.get('window');

const Blocks = memo(function Greeting({ item, height }: any) {

    return (
        <Center>
            {item.block.resource.type == 'image' && 
                <Images data={item.block.resource} width={win.width} height={height}></Images>
            }

            {item.block.resource.type == 'video' && 
                <Videos data={item.block.resource} width={win.width} height={height}></Videos>
            }
        </Center>
    );
})

export default Blocks;