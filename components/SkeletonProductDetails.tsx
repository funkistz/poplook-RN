import { Box, HStack,VStack, Skeleton, IconButton, Text, View, Flex, ScrollView } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

const win = Dimensions.get('window');


export default function SkeletonProductDetails() {

    return (
        <>
            <Flex flex={1} flexDirection="column" backgroundColor={'white'}>
                <ScrollView flex={1}>
                    <Skeleton w={'100%'} h={500} startColor="muted.300"/>

                    <VStack space={4}  pt={5} backgroundColor={'white'} >
                        <Skeleton size="5" px="5" rounded="full" startColor="muted.300" width={'100%'}/>
                        <Skeleton size="5" px="5" rounded="full" startColor="muted.300" width={'40%'}/>
                    </VStack>
                </ScrollView>

                <Flex direction='row' style={styles.footerWrapper}>
                    <Skeleton size="10" rounded="full" startColor="muted.300" mt={3} ml={1} width={50}/>
                    <Skeleton size="10" rounded="full" startColor="muted.300"  mt={3} ml={1} width={50}/>
                    <Box style={styles.addtoCartWrapper} mt={1}>
                        <Skeleton startColor="muted.300" borderRadius={20}/>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}

const styles = StyleSheet.create({
    footerWrapper: {
        backgroundColor: 'white',
        height: 60
    },
    footerIconWrapper: {
        padding: 6
    },
    addtoCartWrapper: {
        flexGrow: 1,
        padding: 6
    },
});