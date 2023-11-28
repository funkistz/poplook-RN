import { Dimensions, StyleSheet } from 'react-native';
import { Box, Text, Flex } from 'native-base';
import React, { memo } from 'react';

const win = Dimensions.get('window');

const TextWithStyle = memo(function Greeting({ data }: any) {

    return (
        <Flex w={win.width}>
            <Text style={{ fontStyle: data.fontStyle, fontSize: data.size, fontWeight: data.bold, color: data.color, letterSpacing: data.letterSpacing, textAlign: data.align, textDecorationLine: data.textDecoration, fontFamily: data.fontFamily }}>{data.content}</Text> 
        </Flex>
    );
})

export default TextWithStyle;