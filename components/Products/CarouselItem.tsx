import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box } from 'native-base';
import { Vimeo } from 'react-native-vimeo-iframe';
import FastImage from 'react-native-fast-image'
import { WebView } from 'react-native-webview';

const win = Dimensions.get('window');

export default function CarouselItem(props: any) {

    const [count, setCount] = useState(0);

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


    return (
        <>

            <Box width={win.width} height={props.imageHeight}>

                {props.uri && !props.uri.includes("vimeo") && !props.uri.includes("youtube") &&
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

                {props.uri && props.uri.includes("youtube") &&
                    <>
                        <Box bg='amber.500' height={props.imageHeight} width={(win.width + 1) - count}>
                            <React.Fragment>
                                <WebView
                                    allowsFullscreenVideo
                                    source={{ uri: props.uri + '?rel=0'}} 
                                    androidLayerType="hardware" 
                                
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
    }
});






