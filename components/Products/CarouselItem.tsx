import { StyleSheet, View, Dimensions, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Flex, Center, Box, VStack, IconButton, Icon, AspectRatio, Text, Button, } from 'native-base';
import { Vimeo } from 'react-native-vimeo-iframe';
import FastImage from 'react-native-fast-image'
import Animated, { Layout, ZoomIn, FadeIn } from 'react-native-reanimated';

const win = Dimensions.get('window');

export default function CarouselItem(props: any) {

    const [image, setImage] = useState();
    const [isModalImage, setModalImage] = useState(false);
    const scale = React.useRef(new Animated.Value(1)).current;
    const [count, setCount] = useState(0);

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

    useEffect(() => {

        const interval: any = setTimeout(() => {
            setCount((prevCount) => prevCount + 1)
        }, 2000);

        // const setTimeout = setTimeout(
        //     () => {
        //         setCount((prevCount) => prevCount + 1)
        //     }, 1000
        // );

        return () => {
            clearInterval(interval)
        }
    }, [])



    // console.log('from lsider item', props);
    // console.log('from lsider item', Dimensions.get('window').width);

    return (
        <>

            <Box width={win.width} height={props.imageHeight}>
                {/* {props.source.uri && !props.source.uri.includes("vimeo") && isRunningInExpoGo &&
                <FullWidthImage source={props.source} />
            } */}
                {props.uri && !props.uri.includes("vimeo") &&
                    <TouchableOpacity activeOpacity={1} onPress={props.openPreview}>
                        <FastImage source={{
                            uri: props.uri,
                        }} style={{ width: '100%', height: props.imageHeight }} />
                    </TouchableOpacity>
                }

                {props.uri && props.uri.includes("vimeo") &&
                    <>
                        <Box bg='amber.500' height={props.imageHeight} width={(win.width + 1) - count}>
                            <React.Fragment>
                                <Vimeo
                                    style={{ width: '100%', height: '100%' }}
                                    videoId={props.uri.split("/").pop()}
                                    params={'autoplay=0'}
                                    overScrollMode="never" 
                                    androidLayerType="hardware" 
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






