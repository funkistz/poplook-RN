import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import Image from 'react-native-scalable-image';
import { Pagination } from 'react-native-snap-carousel';

const win = Dimensions.get('window');

const Carousels = memo(function Greeting({ item }: any) {

    const navigation: any = useNavigation();
    const [currentImageIndex, setCurrentImageIndex] = useState<any>(0);

    const goToCategory = (item: any) => {

        const params = {
            category_id: item.category_id,
            category_name: item.name
        };

        navigation.navigate('Categories', { screen: 'CategoryPage', params: params, title: item.name });
    };

    const renderItem = ({item, index} : any) => {
        
        return (
            <View> 
                <TouchableOpacity key={index} onPress={() => goToCategory(item)}>
                    <Image
                        width={win.width} // height will be calculated automatically
                        source={{uri: 'https://api.poplook.com/' + item.href }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <Carousel
                    width={win.width}
                    height={200}
                    loop={true}
                    data={item.block.resource}
                    renderItem={renderItem}
                    onSnapToItem={(index) => {
                        setCurrentImageIndex(index)
                    }}
                />

                <Pagination
                    dotsLength={item.block.resource.length}
                    activeDotIndex={currentImageIndex}
                    containerStyle={styles.paginationContainer}
                    dotStyle={styles.dot}
                    inactiveDotStyle={styles.inactiveDot}
                    inactiveDotOpacity={0.6}
                    inactiveDotScale={0.8}
                />

            </View>
        </>
    );
})

export default Carousels;

const styles = StyleSheet.create({
    image: {
        borderRadius: 6,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
        backgroundColor: 'blue',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 2.0)'
    },
    inactiveDot: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }
})