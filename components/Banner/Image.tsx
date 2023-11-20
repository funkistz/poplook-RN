import React, { memo } from 'react';
import { Dimensions } from 'react-native'
import { Center, Image } from 'native-base'
import AutoImage from 'react-native-scalable-image';

const Images = memo(function Greeting({ width, height, data }: any) {

    return (
        <Center>
            {height == 'auto' &&
                <AutoImage width={width} source={{ uri: 'https://api.poplook.com/' + data.href }} ></AutoImage>
            }
            {height != 'auto' &&
                <Image style={{ width: width, height: height }} source={{ uri: 'https://api.poplook.com/' + data.href }} alt="image"/>
            }

        </Center>  
    );
})

export default Images;