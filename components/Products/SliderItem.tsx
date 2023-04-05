import { StyleSheet, View, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Flex, Center, Box, VStack, IconButton, Icon, AspectRatio, Text, } from 'native-base';
import ProductService from '../../Services/ProductService';
import { useNavigation } from '@react-navigation/native';
import FullWidthImage from 'react-native-fullwidth-image'
import { Vimeo } from 'react-native-vimeo-iframe';
import FastImage from 'react-native-fast-image'

const win = Dimensions.get('window');

export default function SliderItem(props: any) {

    const [image, setImage] = useState();

    // useEffect(() => {

    //     const VIMEO_ID = '801468907';
    //     fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config?reference`)
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log('vimeo', res);
    //         });


    // }, [])


    // console.log('from lsider item', props);
    // console.log('from lsider item', Dimensions.get('window').width);

    return (
        <Box width={win.width}>
            {/* {props.source.uri && !props.source.uri.includes("vimeo") && isRunningInExpoGo &&
                <FullWidthImage source={props.source} />
            } */}
            {props.source.uri && !props.source.uri.includes("vimeo") &&
                <FastImage source={props.source} style={{ width: '100%', height: props.imageHeight }}

                />
            }

            {props.source.uri && props.source.uri.includes("vimeo") &&
                <>
                    <Box bg='red' height={props.imageHeight}>
                        <Vimeo
                            videoId={props.source.uri.split("/").pop()}
                            params={'autoplay=0'}
                        // reference='https://poplook.com'
                        />
                    </Box>
                </>
            }
        </Box>
    );
}