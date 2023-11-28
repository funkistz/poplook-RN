import { StyleSheet, View, Dimensions, TouchableOpacity, useWindowDimensions } from 'react-native';
import { ScrollView, HStack, VStack, Center, Text } from 'native-base';
import React, { useState, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import Images from './Image';
import Videos from './Video';
import Texts from './TextWithStyle';
import TextWithStyle from './TextWithStyle';

const win = Dimensions.get('window');

const Sliders = memo(function Greeting({ item, child, height }: any) {

    const navigation: any = useNavigation();
    const layout = useWindowDimensions();
    const [carouselRef, setCarouselRef] = useState(null);

    const goToCategory = (item: any) => {
      
        const params = {
            category_id: String(item.categoryId),
            category_name: ''
        };


        navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.categoryId) });

    }

    const renderItem = ({item, index} : any) => {
        
        return (
            <TouchableOpacity onPress={() => goToCategory(item)} key={index}>
                <VStack key={index}>
                    <Center w={layout.width / 3} bg="grey" borderRadius={10} shadow={1}>
                        {item.type == 'image' && 
                            <Images width={layout.width /3} data={item} height={height}></Images>
                        }
                        
                        {item.type == 'video' && 
                            <Videos width={layout.width /3} height={height} data={item}></Videos>
                        }
                    </Center>
                </VStack>
                <TextWithStyle data={item.labelObj}></TextWithStyle>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={styles.container}>

                <TextWithStyle data={item.block.labelObj}></TextWithStyle>
                 
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack>
                        <Carousel
                            layout={'default'}
                            ref={(ref: any) => setCarouselRef(ref)}
                            data={item.block.resource}
                            renderItem={renderItem}
                            sliderWidth={win.width}
                            itemWidth={win.width * (item.block.slideSize / 100) + item.block.slideGap}
                            activeSlideAlignment="start"
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                            onSnapToItem={(index: any) => {
                            }}
                            removeClippedSubviews={false}
                            contentContainerCustomStyle={{overflow: 'hidden', width: (win.width * (item.block.slideSize / 100) + item.block.slideGap + 3) * (item.block.resource.length)}}
                        />
                    </HStack>
                </ScrollView>
            </View>
        </>
    );
})

export default Sliders;

const styles = StyleSheet.create({
    image: {
        borderRadius: 6,
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
})