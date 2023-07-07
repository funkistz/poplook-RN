import { View, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ScrollView } from 'native-base';
import WebView from 'react-native-webview';

const win = Dimensions.get('window');

export default function DeliveryReturnsPage({ route }: { route: any }) {

    const delivery = route.params.params.data;

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
                p { 
                    font-size: 30 ;
                    // padding-left: 20px;
                }
            </style>    
        </head>

        <body>
            <div>
                ` + data + `
            </div>
        </body>
        </html>

    `
    }

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

    return (
        <>
            <View>
                <ScrollView>
                    <WebView
                        source={{ html: htmlContent(delivery) }}
                        injectedJavaScript={injectedJavaScript}
                        style={{ height: win.height - 105, backgroundColor: 'white'}}
                        startInLoadingState={true}
                    />
                </ScrollView>
            </View>
        </>
                
    )
}

