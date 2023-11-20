import React, { memo } from 'react';
import Video from 'react-native-video';
import { Center } from 'native-base';

const Videos = memo(function Greeting({ width, height, data }: any) {

    const ratio = 2;

    return (
        <Center>
            {height == 'auto' &&
                <Video
                    source={{ uri: 'https://api.poplook.com/' + data.href }}
                    style={{ width: width, height: height, aspectRatio: ratio }}
                    controls={false}
                    autoplay={true}
                    repeat={true} 
                    resizeMode="cover"
                />
            }

            {height != 'auto' &&
                <Video
                    source={{ uri: 'https://api.poplook.com/' + data.href }}
                    style={{ width: width, height: height }}
                    controls={false}
                    autoplay={true}
                    repeat={true} 
                    resizeMode="cover"
                />
            }       
        </Center>
        
    );
})

export default Videos;