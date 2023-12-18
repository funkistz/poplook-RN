import { Dimensions, Image, View } from 'react-native';
import { Text, Flex, HStack, VStack } from 'native-base';
import React, { memo } from 'react';
import AutoImage from 'react-native-scalable-image';

const win = Dimensions.get('window');

const TextWithStyle = memo(function Greeting({ data }: any) {

    const url = 'https://api.poplook.com/' + data.icon.href;

    return (
        <View>
            <HStack>
                { data.icon.position == 'left' &&
                    <>
                        <Image source={{ uri : url }} style={{ width: data.icon.size, height : data.icon.size }} />
                        <Text style={{ fontStyle: data.fontStyle, fontSize: data.size, fontWeight: data.bold, color: data.color, letterSpacing: data.letterSpacing, textAlign: data.align, textDecorationLine: data.textDecoration, fontFamily: data.fontFamily, textTransform: data.transform, paddingLeft: data.icon.gap }}>{data.content}</Text>
                    </>
                }

                { data.icon.position == 'right' &&
                    <>
                        <Text style={{ fontStyle: data.fontStyle, fontSize: data.size, fontWeight: data.bold, color: data.color, letterSpacing: data.letterSpacing, textAlign: data.align, textDecorationLine: data.textDecoration, fontFamily: data.fontFamily, textTransform: data.transform, paddingRight: data.icon.gap }}>{data.content}</Text>
                        <Image source={{ uri : url }} style={{ width: data.icon.size, height : data.icon.size }} />
                    </>
                }
            
            </HStack>
        </View>
    );
})

export default TextWithStyle;