import { StyleSheet, View, Dimensions, Platform, Alert, Linking, useWindowDimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Link, Text, FlatList } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'native-base';
import { WEB_URL, API_KEY, IOS_VERSION } from "@env"
import { useDispatch, useSelector } from 'react-redux';
import { getWishList } from '../Redux/Slices/Wishlist';
import { useFocusEffect } from '@react-navigation/native';
import AuthService from '../Services/AuthService';
import { customerDetails } from '../Redux/Slices/Sessions';
import { getCart } from '../Redux/Slices/Cart';
import { assignDeviceType } from '../Redux/Slices/Sessions';
import ProductService from '../Services/ProductService';
import { getColors, getSizes } from '../Redux/Slices/Filter';
import Video from 'react-native-video';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import Slider2 from '../components/Slider2';
import AutoImage from '../components/AutoImage';
import MyImageCarousel from '../components/Carousel2';
import Carousel2, { Pagination } from 'react-native-snap-carousel';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import PaginationDot from 'react-native-insta-pagination-dots'

const win = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default function BannerPage({ navigation }: { navigation: any }) {

    const [banners, setBanners] = useState<any>([]);

    const layout = useWindowDimensions();

    const [carouselRef, setCarouselRef] = useState(null);

    useEffect(() => {

        const getBanners = async () => {
            const response = await BannerService.getMobileBanners();
            let json = await response.data

            console.log('MOBILE BANNER' ,json.data.data)

            setBanners(json.data.data);
        }

        getBanners().catch(console.error);

    }, [])

    const goToCategory = (banner: any) => {

        console.log('banner', banner.link);
        console.log('banner true', banner.link.includes("process_redirect_url.php"));

        if (banner.link.includes("process_redirect_url.php")) {
            Linking.openURL(WEB_URL + banner.link);
        } else {

            const params = {
                category_id: banner.category_id,
                category_name: banner.category_name
            };

            console.log('title', banner.category_name);

            navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: banner.category_name });

        }

    }

    const renderItem = ({item, index} : any) => {
        
        return (
            <View> 
                <TouchableOpacity key={index} onPress={() => goToCategory(item)}>
                    <Image source={{ uri: 'https://api.poplook.com/' + item.href }} alt="image" style={{ width: win.width, height: 250 }}/>
                </TouchableOpacity>
            </View>
        );
    };

    const renderItem2 = ({item, index} : any) => {
        
        return (
            <View> 
                {/* <TouchableOpacity key={index} onPress={() => goToCategory(item)}> */}
                    <Image source={{ uri: 'https://api.poplook.com/' + item.href }} alt="image" style={{ width: win.width, height: 250 }}/>
                {/* </TouchableOpacity> */}
            </View>
        );
    };

    const [activeSlide, setActiveSlide] = useState(0);
    const translateX = useSharedValue(0);

    const handlePrev = () => {
        if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
        translateX.value = withSpring(-currentImageIndex * width);
        }
    };

    const handleNext = (data: any) => {
        if (currentImageIndex < data.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
        translateX.value = withSpring(-(currentImageIndex + 1) * width);
        }
    };

    const renderCarouselItem = ({ item, index } : any) => (<>
        <Text color="black">kai</Text>
        <View style={styles.carouselItem}>
        <Image source={{ uri: 'https://api.poplook.com/' + item.href }} alt="image" style={{ width: win.width, height: 250 }}/>
        </View>
        </>
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const [currentImageIndex, setCurrentImageIndex] = useState<any>(0);

    const navigateTo = direction => {
        if (direction === 'next' && index.current < images.length - 1) {
          index.current++;
        } else if (direction === 'prev' && index.current > 0) {
          index.current--;
        }
    
        timing(translateX, {
          toValue: -index.current * width,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
    };

    return (
        <ScrollView>
            {banners.map((data: any, index: any) => {
    
                return <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent }} key={index}>
                    {data.children.map((item: any, index: any) => {
                        return <Center key={index}>

                        {item.block.type == 'block' && 
                            <View style={styles.block}>
                                <Image source={{ uri: 'https://api.poplook.com/' + item.block.resource.href }} alt="image" key={index} style={{ width: win.width, height: 200 }}/>
                            </View>
                        }

                        {item.block.type == 'grid' && 
                            <FlatList
                                data={item.block.resource}
                                numColumns={item.block.colunmNo} 
                                renderItem={({ item } : any ) => <>
                                <View style={{ width: win.width / 2 }}>
                                    <Image source={{ uri: 'https://api.poplook.com/' + item.href }} alt="image" style={{ width: win.width, height: 200 }}/>
                                </View>
                                </>
                                }
                            />
                        }

                        {item.block.type == 'slider' && 
                            <View style={styles.container}>
                                <Text color="black">{item.block.type}</Text>
                                <Carousel2
                                    layout={'default'}
                                    ref={(ref: any) => setCarouselRef(ref)}
                                    data={item.block.resource}
                                    renderItem={renderItem}
                                    sliderWidth={Dimensions.get('window').width}
                                    itemWidth={Dimensions.get('window').width}
                                    activeSlideAlignment="start"
                                    inactiveSlideScale={1}
                                    inactiveSlideOpacity={1}
                                    onSnapToItem={(index: any) => {
                                    }}
                                    removeClippedSubviews={false}
                                />
                            </View>
                        }

                        {item.block.type == 'carousel' && 
                            <View style={styles.container}>
                                <Text color="black">{item.block.type}</Text>
                                <Carousel
                                    width={win.width}
                                    height={200}
                                    loop={true}
                                    data={item.block.resource}
                                    renderItem={renderItem2}
                                    onSnapToItem={(index) => {
                                        setCurrentImageIndex(index)
                                    }}
                                />

                            {/* <PaginationDot
                                activeDotColor={'black'}
                                curPage={currentImageIndex}
                                maxPage={item.block.resource.length}
                            /> */}

                            <View style={styles.controls}>
                                <TouchableOpacity onPress={handlePrev} style={styles.controlButton}>
                                <Text>Prev</Text>
                                </TouchableOpacity>
                                    <Pagination
                                    dotsLength={item.block.resource.length}
                                    activeDotIndex={currentImageIndex}
                                    containerStyle={styles.paginationContainer}
                                    dotStyle={styles.paginationDot}
                                    inactiveDotOpacity={0.6}
                                    inactiveDotScale={0.8}
                                    />

                                {/* <PaginationDot
                                    activeDotColor={'black'}
                                    curPage={currentImageIndex}
                                    maxPage={item.block.resource.length}
                                />      */}

                                <TouchableOpacity onPress={() => handleNext(item.block.resource)} style={styles.controlButton}>
                                <Text>Next</Text>
                                </TouchableOpacity>
                            </View>

                                {/* <Pagination
                                    dotsLength={item.block.resource.length}
                                    activeDotIndex={currentImageIndex}
                                    containerStyle={styles.paginationContainer}
                                    dotStyle={styles.dot}
                                    inactiveDotStyle={styles.inactiveDot}
                                    inactiveDotOpacity={0.6}
                                    inactiveDotScale={0.8}
                                    // inactiveDotScale={}
                                /> */}
                            </View>
                        }

                        </Center>
                    })}
                </Flex>
            })}
            
    
        </ScrollView>
        
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'white',
    },
    block: {
      width: '100%' // is 50% of container width
    },
    grid: {
      width: '50%' // is 50% of container width
    },
    image: {
      width: '100%',
      height: 100,
      // resizeMode: 'cover',
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white',
    },
    carouselContainer: {
        width: width * 0.9,
        height: 200,
      },
      carousel: {
        flex: 1,
      },
      carouselItem: {
        width: width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    image2: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
      controls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    controlButton: {
        padding: 10,
        backgroundColor: 'lightblue',
        marginHorizontal: 10,
    },
    // paginationContainer: {
    //     paddingVertical: 10,
    // },
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
    },
});