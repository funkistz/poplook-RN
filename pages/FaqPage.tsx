import { ScrollView, Image, Center, Box, Text, Heading, Button, HStack, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FullWidthImage from 'react-native-fullwidth-image';
import { useIsFocused } from '@react-navigation/native';
import LoyaltyService from '../Services/LoyaltyService';
import WebView from 'react-native-webview';
import Spinner from '../components/Spinner';

export default function FaqPage({ route , navigation} : { route: any,  navigation: any }) {

    const isFocused = useIsFocused();
    const [data, setData] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    useEffect(() => {
        setIsLoading(true)
        if(isFocused) {
            fetchData().catch(console.error);
        }

    }, [])

    useEffect(() => {
    
    }, [data])


    const fetchData = async () => {
        const response = await LoyaltyService.getFaqRewards();
        const json = await response.json();
        console.log('JSON: ', json.data)
        setData(json.data[10])
        setIsLoading(false)
    }
    return <>
            {isLoading && 
            <>
                <Center flex={1} justifyContent={'center'} alignItems={'center'} bg={'white'}>
                    <Spinner spin={true} />
                </Center>
                
            </>
            }

            {!isLoading &&  
                <>
                        <WebView
                        originWhitelist={['*']}
                        source={{ html: '<style>h1,h2,h3,h4,p,span {font-size: 35px !important} a { color: #1cad48`} </style><div style="padding: 0 30px">'  + data.content+'</>' }}
                        style={{flex: 1}}
                    />
                </>
            }

        
    </>
}