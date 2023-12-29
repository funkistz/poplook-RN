import { StyleSheet, useWindowDimensions, Dimensions } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Center, ScrollView, Flex, Text } from 'native-base';
import Tabs from './Tabs';
import Sliders from './Banner/Sliders';
import Blocks from './Banner/Block';
import Grid from './Banner/Grid';
import Carousels from './Banner/Carousel';

const win = Dimensions.get('window');

const Menus = memo(function Greeting({ categories }: { categories: any }) {

    const navigation: any = useNavigation();
    const layout = useWindowDimensions();

    const [routes, setRoutes] = useState<any>();
    const [scenes, setScenes] = useState<any>();

    const getChildWidth = (col: any) => {

        if (col.type == '%') {
            return (col.value / 100) * layout.width;
        } else if (col.type == 'px') {
            return layout.width * (col.value / 375);
        } else if (col.type == 'auto') {
            return layout.width;
        } else {
            return layout.width;
        }
    }

    const renderCategory = (category: any) => {

        const tabs: any = [];

        category.block.map(async (data: any, index: any) => {

                {data.children.map(async (item: any, index: any) => {

                    if (item.block.type == 'block') {
                        tabs.push(
                            <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
                                paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left, 
                                height: data.height, width: '100%', backgroundColor: data.backgroundColor }} 
                                key={index}>
                                <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                                    height: item.height, width: getChildWidth(item.col) }} key={index}>
                                    <Blocks item={item} type={'menu'}></Blocks>
                                </Flex>
                            </Flex>
                        );
                    }

                    else if (item.block.type == 'slider') {
                        tabs.push(
                            <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
                                paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left, 
                                height: data.height, width: '100%', backgroundColor: data.backgroundColor }} 
                                key={index}>
                                <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                                    height: item.height, width: getChildWidth(item.col) }} key={index}>
                                    <Sliders item={item} type={'menu'}></Sliders>
                                </Flex>
                            </Flex>
                        );
                    }

                    else if (item.block.type == 'grid') {
                        tabs.push(
                            <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
                                paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left, 
                                height: data.height, width: '100%', backgroundColor: data.backgroundColor }} 
                                key={index}>
                                <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                                    height: item.height, width: getChildWidth(item.col) }} key={index}>
                                    <Grid item={item} type={'menu'}></Grid>  
                                </Flex>
                            </Flex>
                        );
                    }

                    else if (item.block.type == 'product_list') {
                        tabs.push(
                            <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
                                paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left, 
                                height: data.height, width: '100%', backgroundColor: data.backgroundColor }} 
                                key={index}>
                                <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                                    height: item.height, width: getChildWidth(item.col) }} key={index}>
                                    <Sliders item={item} type={'menu'}></Sliders>
                                </Flex>
                            </Flex>
                        );
                    }

                    else if (item.block.type == 'carousel') {
                        tabs.push(
                            <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
                                paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left, 
                                height: data.height, width: '100%', backgroundColor: data.backgroundColor }} 
                                key={index}>
                                <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                                    height: item.height, width: getChildWidth(item.col) }} key={index}>
                                    <Carousels item={item} type={'menu'}></Carousels> 
                                </Flex>
                            </Flex>
                        );
                    }

                })}

            // </Flex>

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
                data: category.resource.labelObj,
                active: category.active
            });

            tempScenes[index] = () => renderCategory(category);
        })

        setScenes((tempScenes));
        setRoutes(temp);

    }, [categories])

    return (<Center style={{ height: "100%", width: "100%" }}>

        {routes && scenes &&
            <>
                <Tabs routes={routes} scenes={scenes}></Tabs>

            </>
        }

    </Center>
    );
})

const styles = StyleSheet.create({
});

export default Menus;