import { StyleSheet, View, Dimensions, TouchableOpacity, useWindowDimensions } from 'react-native';
import React, { useState, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Images from './Image';
import Videos from './Video';
import TextWithStyle from './TextWithStyle';
import { HStack, VStack, ScrollView } from 'native-base';

const { width: screenWidth } = Dimensions.get('window');

const Sliders = memo(function Greeting({ item }: any) {

    const navigation: any = useNavigation();

    const slideGap = item.block.slideGap;
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
                        <Images data={item} column={(100/slideSize)}></Images>
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

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack>

                        {item.block.resource.map((data: any, index: any) => {
                            return (
                                <>
                                <View style={styles.carouselItem}>
                                    <TouchableOpacity onPress={() => goToCategory(data)} key={index}> 
                                        <VStack key={index} w={itemWidth + slideGap}>

                                                {data.type == 'image' && 
                                                    <Images data={data} column={100/slideSize} ></Images>
                                                }
                                                
                                                {data.type == 'video' && 
                                                    <Videos data={data}></Videos>
                                                }

                                            <TextWithStyle data={data.labelObj}></TextWithStyle>
                                        </VStack>
                                    </TouchableOpacity>
                                </View>
                                </>
                            );
                        })}
                        
                    </HStack>
                </ScrollView>
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
        alignItems: 'flex-start'
      }
})