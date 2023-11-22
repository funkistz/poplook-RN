import { Dimensions, StyleSheet } from 'react-native';
import { Box, Text, Flex } from 'native-base';
import React, { memo } from 'react';

const win = Dimensions.get('window');

const Texts = memo(function Greeting({ item, height }: any) {

    const italic = item.block.italic ? 'italic' : 'normal' ;
    const underline = item.block.underline ? 'underline' : 'none' ;

    return (
        <Flex w={win.width} justify={item.block.align}>
            <Text style={{ fontStyle: italic , fontSize: item.block.size, fontWeight: item.block.bold, color: item.block.colour, letterSpacing: item.block.letterSpacing, textAlign: item.block.align, textDecorationLine: underline, height: height }}>{item.block.resource.label}</Text> 
        </Flex>
    );
})

export default Texts;