import { StyleSheet, TouchableOpacity, Switch, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, HStack, Spacer, Flex, Center, Icon, Box } from "native-base";
import { useIsFocused } from '@react-navigation/native';
import Spinner from '../components/Spinner';
import WebView from 'react-native-webview';
import CustomInput from '../components/Form/CustomInput';


export default function CustomerServiceDetailsPage({ route , navigation} : { route: any,  navigation: any }) {

    const win = Dimensions.get('window');
    const isFocused = useIsFocused();
    const [details, setDetails] = useState<any>([]);
    const [heightDetails, setHeightDetails] = useState<any>(0);;

    const htmlContent = (data: any) => {
        return `   
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0 20px;
                    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    // background: red;
                }
                ul {
                    padding: 0;

                }
                li { 
                    // font-size: 100; 
                    list-style: none;
                } 
                li:before { 
                    color: #1cad48; 
                    content: "\\2022"; 
                    display: inline-block;
                    width: 1em; 
                    font-weight: bold; 
                    font-size: 40;
                } 
                p,span { 
                    font-size: 30 ;
                    // padding-left: 20px;
                }
            </style>    
        </head>

        <body>
            <div>
                ` + data +`
            </div>
        </body>
        </html>

    `
    }

    const handleWebViewMessage = (event:any) => {
        setHeightDetails(parseInt(event.nativeEvent.data));
    };

    const injectedJavaScript = `
        window.ReactNativeWebView.postMessage(
            Math.max(
            document.body.scrollHeight, 
            document.documentElement.scrollHeight, 
            document.body.offsetHeight, 
            document.documentElement.offsetHeight, 
            document.body.clientHeight, 
            document.documentElement.clientHeight
            ).toString()
        );
        true;
    `;

    useEffect(() => {
        console.log('data: ', route.params.params.data)
        if(isFocused) {
            setDetails(route.params.params.data)
        }
    }, [])

    return <>
        <Flex flex={1} bg={'white'}>
            <Box h={details.id_cms == 21 ? 300: '100%'} mt={4}>
                <WebView
                        source={{ html: htmlContent(details.content) }}
                        injectedJavaScript={injectedJavaScript}
                        onMessage={handleWebViewMessage}
                        // style={{ height: win.height - 150 , marginTop: 20}}
                        startInLoadingState={true}
                    />
                <Text color='black'>{details.id_cms}</Text>
                <HStack px="1" py="2" mt={4}  bg={'gray.100'}  justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
                    <HStack alignItems="center" w="100%">
                        <Text fontSize="15" color="dark" pl={2} bold>Send Us A Message</Text>
                    </HStack>
                </HStack>
            </Box>
        </Flex>
        
    </>
}