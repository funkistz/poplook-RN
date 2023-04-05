import { Box, HStack,VStack, Skeleton, IconButton, Text, View, Flex, ScrollView } from 'native-base';
import { Dimensions } from 'react-native';

const win = Dimensions.get('window');


export default function SkeletonProductDetails() {

    return (
        <>
            <Flex flex={1} flexDirection="column" backgroundColor={'white'}>
                <ScrollView flex={1}>
                    <Skeleton w={'100%'} h={500} startColor="muted.300"/>

                    <VStack space={4}  pt={10} backgroundColor={'white'} >
                        <Skeleton.Text px="4" startColor="muted.300" />
                    </VStack>
                </ScrollView>
                

                <HStack backgroundColor={'white'} >
                    <View width={win.width / 5} m={1} >
                        <Skeleton size="10" rounded="full" startColor="muted.300" width={win.width / 5}/>
                    </View>
                    <View width={win.width / 5}  m={1}>
                        <Skeleton size="10" rounded="full" startColor="muted.300" width={win.width / 5}/>
                    </View>
                    <View width={win.width * 3 / 5}  m={1} >
                        <Skeleton width={win.width * 3 / 6} startColor="muted.300" borderRadius={20} />
                    </View>
                </HStack>
            </Flex>
            
            
        </>
    );
}