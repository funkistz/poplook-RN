import React, { memo, useState } from 'react';
import Video from 'react-native-video';
import { Dimensions } from 'react-native';

const win = Dimensions.get('window');

const Videos = memo(function Greeting({ data }: any) {

    const [videoDimension, setVideoDimension] = useState<any>(null);

    const onLoad = (data: any) => {

        const details = {
          width: data.naturalSize.width,
          height: data.naturalSize.height,
        };

        const dimension = details.height * (win.width/details.width)
        setVideoDimension(dimension);
    };

    return (
        <Video
            source={{ uri: 'https://api.poplook.com/' + data.href }}
            style={{ width: videoDimension, height: videoDimension }}
            controls={false}
            autoplay={true}
            repeat={true} 
            resizeMode="cover"
            onLoad={onLoad}
        />            
    );

})

export default Videos;