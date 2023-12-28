import { StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { HStack, VStack, ScrollView, Text } from 'native-base';
import React, { memo, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Images from './Image';
import Videos from './Video';
import TextWithStyle from './TextWithStyle';

const { width: screenWidth } = Dimensions.get('window');

const Sliders = memo(function Greeting({ item, type }: any) {

    const navigation: any = useNavigation();

    const slideGap = item.block.slideGap;
    const slideSize = item.block.slideSize;
    const length = item.block.resource.length;
    const itemWidth = (screenWidth * slideSize) / 100;

    const [imageHeight, setImageHeight] = useState<any>([])

    useEffect(() => {

        if (item) {
            item.block.resource.map((image: any) => {

                const url = 'https://api.poplook.com/' + image.href;

                Image.getSize(url, (width: any, height: any) => {

                    setImageHeight(height *screenWidth / width);

                });

            })
        }

    }, [item])

    const goToCategory = (item: any) => {

        if (item.linkData.type == 'category') {

            const params = {
                category_id: String(item.linkData.id),
                category_name: item.linkData.name
            };
    
            type == 'banner' ? navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.linkData.id) }) : navigation.navigate('Categories', { screen: 'CategoryPage', params: params, title: String(item.linkData.id) })

        }

        if (item.linkData.type == 'product') {

            const params = {
                product_id: String(item.linkData.id)
            };
    
            navigation.navigate('ProductDetailPage', params);

        } 

    }

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

                                            { data.type == 'image' && 
                                                <Images data={data} column={100/slideSize}></Images>
                                            }
                                            
                                            { data.type == 'video' && 
                                                <Videos data={data}></Videos>
                                            }
                                            
                                        </VStack>

                                        <VStack key={index} w={itemWidth}>

                                            { item.block.type == 'slider' &&
                                                <TextWithStyle data={data.labelObj}></TextWithStyle>
                                            }

                                            { item.block.type == 'product_list' &&
                                                <>
                                                    <TextWithStyle data={data.nameObj}></TextWithStyle>
                                                    <TextWithStyle data={data.priceObj}></TextWithStyle>
                                                </>  
                                            }

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