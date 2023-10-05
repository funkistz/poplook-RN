import React, { memo, useState } from 'react';
import { Center, Text } from 'native-base';
import { View, Dimensions, useWindowDimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import AutoImage from './AutoImage';

const win = Dimensions.get('window');

const Slider2 = memo(function Greeting({ child }: any) {

    const layout = useWindowDimensions();
    const navigation: any = useNavigation();
    const [carouselRef, setCarouselRef] = useState(null);

    const goToCategory = (child: any) => {

        console.log('child', child);

        const params = {
            category_id: child.category_id,
            category_name: child.name
        };

        navigation.navigate('Categories', { screen: 'CategoryPage', params: params, title: child.name });
    };

    const _renderItem = ({item, index} : any) => {
        
        return (
            <View style={{ paddingStart: 15 }}> 
                <TouchableOpacity key={index} onPress={() => goToCategory(item)}>
                    <Center w={layout.width / 3} bg="grey" borderRadius={10} shadow={1}>
                        <AutoImage style={{ borderRadius: 6 }} key={index} imageUri={item.image_url} width={layout.width / 3}/>
                    </Center>
                    <View style={{padding: 10}}>
                        <Text color='black' alignSelf={'center'}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            <Text pt={5} pb={3} pl={5} alignSelf={'flex-start'} color='black' fontSize={16}>{child.name}</Text>
            <View>
            <Carousel
                layout={'default'}
                ref={(ref: any) => setCarouselRef(ref)}
                data={child.children}
                renderItem={_renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={(Dimensions.get('window').width / 3) + 6 * 2}
                activeSlideAlignment="start"
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                contentContainerCustomStyle={{
                    overflow: 'hidden',
                    width: 146 * child.children.length
                }}
                onSnapToItem={(index: any) => {
                }}
                removeClippedSubviews={false}
            />
            </View>
        </>
    );
})

export default Slider2;

const styles = StyleSheet.create({
    image: {
        borderRadius: 6,
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselItem: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    carouselText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})