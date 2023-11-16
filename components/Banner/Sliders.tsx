import { StyleSheet, View, Dimensions, TouchableOpacity, useWindowDimensions } from 'react-native';
import { ScrollView, HStack, VStack, Center, Text } from 'native-base';
import React, { useState, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import Image from 'react-native-scalable-image';

const win = Dimensions.get('window');

const Sliders = memo(function Greeting({ item, child }: any) {

    const navigation: any = useNavigation();
    const layout = useWindowDimensions();
    const [carouselRef, setCarouselRef] = useState(null);

    const goToCategory = (item: any) => {

        console.log('child', item);

        const params = {
            category_id: item.category_id,
            category_name: item.name
        };

        navigation.navigate('Categories', { screen: 'CategoryPage', params: params, title: item.name });
    };

    const renderItem = ({item, index} : any) => {
        
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
                <Text pt={2} color='black' fontSize={14}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={styles.container}>

                {child && child.map((data: any, index: any) => {
                        return <Text pl={5} pt={5} color='black' fontSize={16}>{data.block.label}</Text>
                    }
                )}

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack p={3} justifyContent="center">
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
                            contentContainerCustomStyle={{overflow: 'hidden', width: (win.width * (item.block.slideSize / 100) + item.block.slideGap) * (item.block.resource.length)}}
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