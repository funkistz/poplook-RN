import React, { useEffect, useState } from 'react';
import { Box, HStack, IconButton, Icon, StatusBar, Text, Center, Flex } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function AppBar({ navigation }: any) {


    console.log('options', navigation);

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Box safeAreaTop bg="purple.100" />
            <HStack px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="100%" color="purple.100">
                <HStack alignItems="center" w="30%">
                    {navigation.canGoBack() &&
                        <IconButton icon={<IonIcon name='arrow-back-outline' size={24} color="black" />} onPress={goBack} />
                    }
                </HStack>
                <Center w="40%">
                    <Text fontSize="20" fontWeight="bold" color="dark" >
                        Poplook
                    </Text>
                </Center>
                <HStack justifyContent="flex-end" w="30%">
                    <IconButton icon={<IonIcon name='search-outline' size={24} color="black" />} />
                    <IconButton icon={<IonIcon name='search-outline' size={24} color="black" />} />
                </HStack>
            </HStack>
        </>
    );
}