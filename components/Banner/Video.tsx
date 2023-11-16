import { Dimensions, useWindowDimensions } from 'react-native';
import React, { memo } from 'react';
import Video from 'react-native-video';

const Videos = memo(function Greeting({ width, height, data }: any) {

    return (
        <Video
            source={{ uri: 'https://api.poplook.com/' + data.href }}
            style={{ width: width , height: height }}
            controls={false}
            autoplay={true}
            repeat={true} 
            resizeMode="cover" 
        />
    );
})

export default Videos;