import { StyleSheet, View, useWindowDimensions, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { Center, Box, Text, ScrollView, Pressable } from 'native-base';
import FullWidthImage from 'react-native-fullwidth-image'
import Tabs from './Tabs';
import Slider from './Slider';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import AutoImage from './AutoImage';

const win = Dimensions.get('window');

const Menus2 = memo(function Greeting({ categories }: { categories: any }) {

    const [routes, setRoutes] = useState<any>();
    const [scenes, setScenes] = useState<any>();
    const navigation: any = useNavigation();
    const [imageHeights, setImageHeights] = useState<any>([])

    const goToCategory = (child: any) => {

        const params = {
            category_id: child.category_id,
            category_name: child.name
        };

        navigation.navigate('Categories', { screen: 'CategoryPage', params: params, title: child.name });


        return;
    };

    const renderCategory = (category: any) => {

        const tabs: any = [];

        if (!category.children) {
            return;
        }

        category.children.map(async (child: any, index: any) => {

            if (child.type == 'banner') {

                Image.getSize(child.image_url, (width, height) => {
                    const temp = [...imageHeights.slice(0, index), (height * win.width / width), ...imageHeights.slice(index)];
                    setImageHeights(temp);
                });

                tabs.push(
                    <TouchableOpacity key={index} onPress={() => goToCategory(child)}>
                        {/* <FastImage source={{
                            uri: child.image_url
                        }}
                            style={{ width: '100%', height: imageHeights[index] }}
                        /> */}
                        <AutoImage imageUri={child.image_url} width={win.width} />
                    </TouchableOpacity>
                );
            } else if (child.type == 'slider') {
                return tabs.push(<Slider key={index} child={child} />)
            }

        })

        return <Center style={{ width: "100%" }}>
            <ScrollView style={{ width: "100%" }}>
                {tabs}
            </ScrollView>
        </Center>
    }

    useEffect(() => {

        const temp: any = [];
        const tempScenes: any = {};

        categories.map((category: any, index: any) => {

            temp.push({
                key: index,
                title: category.name,
                type: category.type,
                id: category.category_id,
            });
            tempScenes[index] = () => renderCategory(category);
        })

        setScenes((tempScenes));
        setRoutes(temp);

    }, [categories])

    const routesFinal = () => {

        const temp: any = [];
        const tempScenes: any = {};

        categories.map((category: any) => {

            temp.push({ key: category.category_id.toString(2) + '_cat', title: category.name });
            tempScenes[category.category_id.toString(2) + '_cat'] = () => renderCategory(category);
        })

        return temp;
    }

    const scenesFinal = () => {

        const temp: any = [];
        const tempScenes: any = {};

        categories.map((category: any) => {

            temp.push({ key: category.category_id.toString(2) + '_cat', title: category.name });
            tempScenes[category.category_id.toString(2) + '_cat'] = () => renderCategory(category);
        })

        return tempScenes;
    }

    return (
        <Center style={{ height: "100%", width: "100%" }}>
            {routes && scenes &&
                <>
                    <Tabs routes={routes} scenes={scenes} ></Tabs>

                </>
            }
        </Center>
    );
})

export default Menus2;