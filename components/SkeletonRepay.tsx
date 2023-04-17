import { Box, HStack, VStack, Skeleton, IconButton, Text, View, Flex, ScrollView } from 'native-base';
import { Dimensions } from 'react-native';

const win = Dimensions.get('window');


export default function SkeletonRepay() {

    return (
        <>
            <Flex flex={1} flexDirection="column" backgroundColor={'white'}>

                <Skeleton h={300} p={5} startColor="muted.300" />
                <Skeleton h={200} p={5} startColor="muted.300" />

                <Skeleton w={win.width} h={30} px={5} mb={5} startColor="muted.300" />
                <Skeleton w={win.width} h={30} px={5} mb={5} startColor="muted.300" />
                <Skeleton w={win.width} h={30} px={5} mb={5} startColor="muted.300" />
                <Skeleton w={win.width} h={30} px={5} mb={5} startColor="muted.300" />

            </Flex>
        </>
    );
}