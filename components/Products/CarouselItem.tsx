import { StyleSheet, View, Dimensions, TouchableOpacity, Alert, Image, Modal, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Flex, Center, Box, VStack, IconButton, Icon, AspectRatio, Text, Button, } from 'native-base';
import { Vimeo } from 'react-native-vimeo-iframe';
import FastImage from 'react-native-fast-image'

const win = Dimensions.get('window');

export default function CarouselItem(props: any) {

    const [image, setImage] = useState();
    const [isModalImage, setModalImage] = useState(false);
    const scale = React.useRef(new Animated.Value(1)).current;

    const toggleModalImage = () => {
        setModalImage(!isModalImage);
    };

    // const handlePinch = Animated.event([{ nativeEvent: {scale} }])

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
        <>
            <Box width={win.width}>
                {/* {props.source.uri && !props.source.uri.includes("vimeo") && isRunningInExpoGo &&
                <FullWidthImage source={props.source} />
            } */}
                {props.uri && !props.uri.includes("vimeo") &&
                    <>
                        <TouchableOpacity onPress={toggleModalImage}>
                            <FastImage source={{
                                uri: props.uri,
                            }} style={{ width: '100%', height: props.imageHeight }} />
                        </TouchableOpacity>
                    </>
                }

                {props.uri && props.uri.includes("vimeo") &&
                    <>
                        <Box bg='amber.500' height={props.imageHeight} width={win.width}>
                            {/* <Text>.dasdsa</Text> */}
                            <React.Fragment>
                                <Vimeo
                                    style={{ width: '100%', height: props.imageHeight }}
                                    videoId={props.uri.split("/").pop()}
                                    params={'autoplay=0'}
                                    reference='https://poplook.com'
                                />
                            </React.Fragment>
                        </Box>
                    </>
                }
            </Box>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        //   backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 8,
        width: 500,
        height: 400,
        //   justifyContent: 'center',
        //   alignItems: 'center',
        flex: 1
    },
});






