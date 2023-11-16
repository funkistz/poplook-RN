import { Dimensions } from 'react-native';
import { Text } from 'native-base';
import React, { memo } from 'react';

const win = Dimensions.get('window');

const Texts = memo(function Greeting({ item }: any) {

    return (
        <Text style={{ width: win.width ,fontSize: item.block.size, fontWeight: item.block.bold, color: item.block.colour, letterSpacing: item.block.letterSpacing, textAlign: 'center' }}>{item.block.resource.label}</Text> 
    );
})

export default Texts;