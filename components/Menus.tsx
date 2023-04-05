import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useWindowDimensions, Dimensions, Image as RImage, Animated } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { Center, Box, Text, Image, ScrollView, Pressable } from 'native-base';
import FullWidthImage from 'react-native-fullwidth-image'
import Tabs from '../components/Tabs';
import Slider from './Slider';
import { useNavigation } from '@react-navigation/native';

const Menus = memo(function Greeting({ categories }: { categories: any }) {

    const [routes, setRoutes] = useState<any>();
    const [scenes, setScenes] = useState<any>();

    const renderCategory = (category: any) => {

        const tabs: any = [];
        console.log('category', category);

        if (!category.children) {
            return;
        }

        category.children.map(async (child: any, index: any) => {

            if (child.type == 'banner') {
                tabs.push(<FullWidthImage key={index} source={{
                    uri: child.image_url
                }} />);
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

        categories.map((category: any) => {

            temp.push({ key: category.category_id.toString(2) + '_cat', title: category.name });
            tempScenes[category.category_id.toString(2) + '_cat'] = () => renderCategory(category);
        })


        console.log('category', temp);
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

export default Menus;