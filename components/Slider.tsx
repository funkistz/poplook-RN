import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useWindowDimensions, Dimensions, Image as RImage, Animated } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { Center, Box, Text, Image, ScrollView, Pressable, HStack, VStack } from 'native-base';
import FullWidthImage from 'react-native-fullwidth-image'
import Tabs from './Tabs';

const Slider = memo(function Greeting({ child }: any) {

    const layout = useWindowDimensions();

    return (
        <>
            <Text pl={5} pt={5} color='black' fontSize={16}>{child.name}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space={3} p={5} justifyContent="center">
                    {child.children.map((menu: any, index: any) => {
                        return (
                            <>
                                <VStack>
                                    <Center w={layout.width / 3} bg="grey" rounded="md" shadow={3} >
                                        <FullWidthImage key={index} source={{
                                            uri: menu.image_url
                                        }} />
                                    </Center>
                                    <Text pt={3} color='black' >{menu.name}</Text>
                                </VStack>
                            </>
                        );
                    })}
                </HStack>
            </ScrollView>
        </>
    );
})

export default Slider;