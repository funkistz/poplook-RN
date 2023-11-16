import { StyleSheet, View, useWindowDimensions, Dimensions, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { Center, Box, Text, ScrollView, Pressable, HStack, VStack } from 'native-base';
import FullWidthImage from 'react-native-fullwidth-image'
import Tabs from '../components/Tabs';
import Sliders from './Banner/Sliders';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import AutoImage from './AutoImage';
import Video from 'react-native-video';
import Image from 'react-native-scalable-image';
import Carousel2, { Pagination } from 'react-native-snap-carousel';
import Children from './Banner/Children';

const win = Dimensions.get('window');

const Menus2 = memo(function Greeting({ categories }: { categories: any }) {

    const [routes, setRoutes] = useState<any>();
    const [scenes, setScenes] = useState<any>();
    const navigation: any = useNavigation();
    const [imageHeights, setImageHeights] = useState<any>([])
    const [carouselRef, setCarouselRef] = useState(null);
    const layout = useWindowDimensions();

    const renderItem = ({item, index} : any) => {
        
        return (
            <View> 
                <TouchableOpacity key={index} onPress={() => goToCategory(item)}>
                    <Image
                        width={win.width}
                        source={{uri: 'https://api.poplook.com/' + item.href }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const renderItem2 = ({item, index} : any) => {

        return (
            <TouchableOpacity onPress={() => goToCategory(item)} key={index}>
                <VStack key={index}>
                    <Center w={layout.width / 3} bg="grey" borderRadius={10} shadow={1} >
                        <Image
                            width={layout.width / 3}
                            source={{uri: 'https://api.poplook.com/' + item.href }}
                            style={{ borderRadius: 6 }} 
                        />
                    </Center>
                </VStack>
                <Text pl={2} pt={2} color='black' fontSize={14}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    const goToCategory = (child: any) => {

        console.log('child', child);

        const params = {
            category_id: child.category_id,
            category_name: child.name
        };

        console.log('title', child.name);

        // navigation.navigate('CategoryPage', { params: params, title: child.name });
        navigation.navigate('Categories', { screen: 'CategoryPage', params: params, title: child.name });


        return;
    };

    const renderCategory = (category: any) => {

        const tabs: any = [];
        console.log('category1', category);

        // if (!category.block) {
        //     return;
        // }

        category.block.map(async (child: any, index: any) => {

            // <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
            //     paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left }} 
            //     key={index}>

            
                child.children.map(async (item: any, index: any) => {

                    if (item.block.type == 'block') {
                        if (item.block.resource.type == 'image') {
                            tabs.push(
                                <Image
                                    width={win.width}
                                    source={{uri: 'https://api.poplook.com/' + item.block.resource.href }}
                                />
                            );
                        }
                        if (item.block.resource.type == 'video') {
                            tabs.push(
                                <Video
                                    source={{ uri: 'https://api.poplook.com/' + item.block.resource.href }}
                                    style={{ width: win.width, height: 200 }}
                                    controls={false}
                                    autoplay={true}
                                    repeat={true} 
                                    resizeMode="cover" 
                                />
                            );
                        }
                    }

                    if (item.block.type == 'slider') {

                        return tabs.push(
                            <Sliders item={item} child={child.children}></Sliders>
                        )
                        // <View style={styles.container}>

                        //     {child.children.map((data: any, index: any) => {
                        //             return <Text pl={5} pt={5} color='black' fontSize={16}>{data.block.label}</Text>
                        //         }
                        //     )}

                        //     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        //         <HStack p={3} justifyContent="center">
                        //             <Carousel2
                        //                 layout={'default'}
                        //                 ref={(ref: any) => setCarouselRef(ref)}
                        //                 data={item.block.resource}
                        //                 renderItem={renderItem2}
                        //                 sliderWidth={win.width}
                        //                 itemWidth={win.width * (item.block.slideSize / 100) + item.block.slideGap}
                        //                 activeSlideAlignment="start"
                        //                 inactiveSlideScale={1}
                        //                 inactiveSlideOpacity={1}
                        //                 onSnapToItem={(index: any) => {
                        //                 }}
                        //                 removeClippedSubviews={false}
                        //                 contentContainerCustomStyle={{overflow: 'hidden', width: (win.width * (item.block.slideSize / 100) + item.block.slideGap) * (item.block.resource.length)}}
                        //             />
                        //         </HStack>
                        //     </ScrollView>
                        // </View>
                        // )
                            
                    }

                })

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

        console.log('categorymula2', categories);

        categories.map((category: any, index: any) => {

            temp.push({
                key: index,
                title: category.name,
                // type: category.type,
                // id: category.category_id,
            });
            tempScenes[index] = () => renderCategory(category);
        })


        console.log('category2', temp);
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});

export default Menus2;