import { StyleSheet, View, Dimensions, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { VStack, HStack, Text, Center, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { Pagination } from 'react-native-snap-carousel';
import Images from './Image';
import Videos from './Video';
import TextWithStyle from './TextWithStyle';
import AutoImage from 'react-native-scalable-image';

const win = Dimensions.get('window');

const Carousels = memo(function Greeting({ item, type }: any) {

    const navigation: any = useNavigation();
    const layout = useWindowDimensions();
    const [currentImageIndex, setCurrentImageIndex] = useState<any>(0);
    const [carouselItems, setCarouselItems] = useState<any>([]);

    const widthItem = item.col;
    const heightItem = item.height;
    const length = item.block.resource.length;
    const [imageHeight, setImageHeight] = useState<any>([])

    useEffect(() => {

        if (item) {
            item.block.resource.map((image: any) => {

                const url = 'https://api.poplook.com/' + image.href;

                Image.getSize(url, (width: any, height: any) => {

                    setImageHeight(height * win.width / width);

                });

            })
        }

    }, [item])

    const goToCategory = (item: any) => {

        const params = {
            category_id: String(item.linkData.id),
            category_name: item.linkData.name
        };

        type == 'banner' ? navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.linkData.id) }) : navigation.navigate('Categories', { screen: 'CategoryPage', params: params, title: String(item.linkData.id) })

    }

    const getChildWidth = (col: any) => {

        if (col.type == '%') {
            return (col.value / 100) * layout.width;
        } else if (col.type == 'px') {
            return imageHeight * (col.value / 375);
        } else if (col.type == 'auto') {
            return imageHeight;
        } else {
            return imageHeight;
        }

    }

    const getChildHeight = (height: any) => {

        if (height != 'auto') {
            return layout.height * (height / 667);
        } else {
            return imageHeight;
        }

    }

    const renderItem = ({item, index} : any) => {
        
        return (
            <>
                <View style={styles.carouselItem}>
                    <TouchableOpacity key={index} onPress={() => goToCategory(item)}>

                        {item.type == 'image' && 
                            <Images data={item} width={getChildWidth(widthItem)}></Images>  
                        }
                        
                        {item.type == 'video' && 
                            <Videos data={item}></Videos>
                        }

                        <TextWithStyle data={item.labelObj}></TextWithStyle>
                        
                    </TouchableOpacity>  
                </View>
            </>
        );
    };

    return (
        <>
        <ScrollView>
            <VStack h={imageHeight}>

                <TextWithStyle data={item.block.labelObj}></TextWithStyle>

                <Carousel
                    width={getChildWidth(widthItem)}
                    loop={true}
                    data={item.block.resource}
                    renderItem={renderItem}
                    onSnapToItem={(index) => {
                        setCurrentImageIndex(index)
                    }}
                    panGestureHandlerProps={{
                        activeOffsetX: [-10, 10],
                        failOffsetY: [-10, 10],
                    }}
                />

                <Pagination
                    dotsLength={length}
                    activeDotIndex={currentImageIndex}
                    containerStyle={styles.paginationContainer}
                    dotStyle={styles.dot}
                    inactiveDotStyle={styles.inactiveDot}
                    inactiveDotOpacity={0.6}
                    inactiveDotScale={0.8}
                />

            </VStack> 
            </ScrollView>
        </>
    );
})

export default Carousels;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30
    },
    paginationContainer: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 150

    },
    dot: {
        width: 20,
        height: 4,
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 2.0)'
    },
    inactiveDot: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    carouselItem: {
        flex: 1
    },
})