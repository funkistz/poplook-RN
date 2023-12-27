import { Image} from 'react-native';
import { Text, Flex, HStack, Box } from 'native-base';
import React, { memo } from 'react';

const TextWithStyle = memo(function Greeting({ data }: any) {

    const url = 'https://api.poplook.com/' + data.icon.href;

    const getAlign = (data: any) => {

        if (data == 'center') {
            return data;
        } else if (data == 'left') {
            return 'flex-start';
        } else if (data == 'right') {
            return 'flex-end';
        }
    }

    return (
        <Flex direction='row'>
            <Box style={{flexGrow: 1 , alignItems: getAlign(data.align)}}>
                { data.icon.position == 'left' &&
                    <HStack>
                        <Image source={{ uri : url }} style={{ width: data.icon.size, height : data.icon.size }} />
                        <Text style={{ fontStyle: data.fontStyle, fontSize: data.size, fontWeight: data.bold, color: data.color, letterSpacing: data.letterSpacing, textAlign: data.align, textDecorationLine: data.textDecoration, fontFamily: data.fontFamily, textTransform: data.transform, paddingLeft: data.icon.gap}}>{data.content}</Text>
                    </HStack>
                }

                { data.icon.position == 'right' &&
                    <HStack>
                        <Text style={{ fontStyle: data.fontStyle, fontSize: data.size, fontWeight: data.bold, color: data.color, letterSpacing: data.letterSpacing, textAlign: data.align, textDecorationLine: data.textDecoration, fontFamily: data.fontFamily, textTransform: data.transform, paddingRight: data.icon.gap }}>{data.content}</Text>
                        <Image source={{ uri : url }} style={{ width: data.icon.size, height : data.icon.size }} />
                    </HStack>
                }
            </Box>
        </Flex>
    );
})

export default TextWithStyle;