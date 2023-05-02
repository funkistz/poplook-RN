import React, { useEffect, useState } from 'react';
import CmsService from '../Services/CmsService';
import WebView from 'react-native-webview';
import { View } from 'react-native';

export default function CmsPage({ route, navigation }: { route: any, navigation: any}) {

    const [cms, setCms] = useState<any>({});
    const key = route.params.params.key;

    useEffect(() => {
        navigation.setOptions({ title: route.params.params.title});
        const getDetails = async () => {
            const response = await CmsService.getCmsDetails(key);
            const json = await response.json();
            console.log('res: ', json.data[0].content)
            setCms(json.data[0]);
            
        }
        getDetails().catch(console.error);

    }, [])

    return (
        <>
            <WebView
                originWhitelist={['*']}
                source={{ html: '<style>h1,h2,h3,h4,p,span {font-size: 35px !important} </style><div style="padding: 0 30px">'  +cms.content+'</>' }}
            />
            
        </>
        
    );
}