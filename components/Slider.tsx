import { StyleSheet, View, useWindowDimensions, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { Center, Box, Text, ScrollView, Pressable, HStack, VStack } from 'native-base';
import FullWidthImage from 'react-native-fullwidth-image'
import Tabs from './Tabs';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import AutoImage from './AutoImage';

const win = Dimensions.get('window');

const Slider = memo(function Greeting({ child }: any) {

    const layout = useWindowDimensions();
    const navigation: any = useNavigation();
    const [imageHeights, setImageHeights] = useState<any>([])

    const goToCategory = (child: any) => {

        console.log('child', child);

        const params = {
            category_id: child.category_id,
            category_name: child.name
        };

        navigation.navigate('Categories', { screen: 'CategoryPage', params: params });
    };

    return (
        <>
            <Text pl={5} pt={5} color='black' fontSize={16}>{child.name}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space={3} p={5} justifyContent="center">
                    {child.children.map((menu: any, index: any) => {

                        // Image.getSize(menu.image_url, (width, height) => {
                        //     const temp = [...imageHeights.slice(0, index), (height * win.width / width), ...imageHeights.slice(index)];
                        //     // setImageHeights(temp);
                        // });

                        return (
                            <TouchableOpacity onPress={() => goToCategory(child)} key={index}>
                                <VStack key={index}>
                                    <Center w={layout.width / 3} bg="grey" borderRadius={10} shadow={1} >
                                        {/* <FullWidthImage style={{ borderRadius: 6 }} key={index} source={{
                                            uri: menu.image_url
                                        }} /> */}
                                        <AutoImage style={{ borderRadius: 6 }} key={index} imageUri={menu.image_url} width={layout.width / 3} />

                                    </Center>
                                    <Text pt={3} color='black' >{menu.name}</Text>
                                </VStack>
                            </TouchableOpacity>
                        );
                    })}
                </HStack>
            </ScrollView>
        </>
    );
})

export default Slider;

const styles = StyleSheet.create({
    image: {
        borderRadius: 6,
    },
})