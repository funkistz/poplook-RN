import { StyleSheet, View, Dimensions, TouchableOpacity, useWindowDimensions } from 'react-native';
import React, { useState, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import Images from './Image';
import Videos from './Video';
import TextWithStyle from './TextWithStyle';

const win = Dimensions.get('window');

const { width: screenWidth } = Dimensions.get('window');

const Sliders = memo(function Greeting({ item }: any) {

    const navigation: any = useNavigation();

    const slideGap = item.block.slideGap/100;
    const slideSize = item.block.slideSize;
    const length = item.block.resource.length;
    const itemWidth = (screenWidth * slideSize) / 100;

    const [carouselRef, setCarouselRef] = useState(null);

    const goToCategory = (item: any) => {

        const params = {
            category_id: String(item.linkData.id),
            category_name: item.linkData.name
        };

        navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.linkData.id) });

    }

    const renderItem = ({item, index} : any) => {
        return (
            <>
            <View style={styles.carouselItem}>
                <TouchableOpacity onPress={() => goToCategory(item)} key={index}> 
                
                    {item.type == 'image' && 
                        <Images data={item} column={100/slideSize}></Images>
                    }
                    
                    {item.type == 'video' && 
                        <Videos data={item}></Videos>
                    }
                        <TextWithStyle data={item.labelObj}></TextWithStyle>

                </TouchableOpacity>
            </View>
            </>
        )
    };

    return (
        <>
            <View style={styles.container}>

                <TextWithStyle data={item.block.labelObj}></TextWithStyle>

                <Carousel
                    slideStyle={{ }}
                    layout={'default'}
                    ref={(ref: any) => setCarouselRef(ref)}
                    data={item.block.resource}
                    renderItem={renderItem}
                    sliderWidth={win.width}
                    itemWidth={itemWidth + slideGap} 
                    // inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    activeSlideAlignment="start"
                    onSnapToItem={(index: any) => {
                    }}
                    removeClippedSubviews={false}
                />
            </View>
        </>
    );
})

export default Sliders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    carouselItem: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',// Adjust as needed for space gap
        marginHorizontal: 10
      }
})