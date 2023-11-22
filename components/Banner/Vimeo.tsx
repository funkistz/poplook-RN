import React, { memo } from 'react';
import { Vimeo } from 'react-native-vimeo-iframe';
import { Center, Text } from 'native-base';
import { Video } from 'react-native-video';
import { WebView } from 'react-native-webview';

const Vimeos = memo(function Greeting({ width, height, data }: any) {

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
                <Vimeo
                    videoId={data.href}
                    params={'autoplay=0'}
                    reference='https://poplook.com'
                />
            }       
        </Center>
        
    );
})

export default Vimeos;