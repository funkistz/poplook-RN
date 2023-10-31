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
import Carousel from 'react-native-snap-carousel';

const win = Dimensions.get('window');

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

    const renderItem = ({ item } : any) => (
        <View style={{ width: 100 }}>
            <Image source={{ uri: 'https://api.poplook.com/' + item.href }} alt="image" style={{ width: win.width, height: 100 }}/>
        </View>
    );

    const _renderItem = ({item, index} : any) => {
        
        return (
            <View> 
                <TouchableOpacity key={index} onPress={() => goToCategory(item)}>
                    {/* <Center w={layout.width / 3} bg="grey" borderRadius={10} shadow={1}> */}
                    <Image source={{ uri: 'https://api.poplook.com/' + item.href }} alt="image" style={{ width: win.width, height: 200 }}/>
                    {/* </Center> */}
                    {/* <View style={{padding: 10}}>
                        <Text color='black' alignSelf={'center'}>{item.name}</Text>
                    </View> */}
                </TouchableOpacity>
            </View>
        );
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
                            // <FlatList
                            //     data={item.block.resource}
                            //     renderItem={renderItem}
                            //     numColumns={item.block.columnNo} // Set the number of columns in your grid
                            // />


                            <FlatList
                                data={item.block.resource}
                                numColumns={item.block.colunmNo} 
                                renderItem={({ item } : any ) => <>
                                <View style={{ width: win.width / 3 }}>
                                    <Image source={{ uri: 'https://api.poplook.com/' + item.href }} alt="image" style={{ width: win.width, height: 100 }}/>
                                </View>
                                </>
                                }
                            />
                        }
                        {item.block.type == 'slider' && 
                             <View>
                                <Carousel
                                    layout={'default'}
                                    ref={(ref: any) => setCarouselRef(ref)}
                                    data={item.block.resource}
                                    renderItem={_renderItem}
                                    sliderWidth={Dimensions.get('window').width}
                                    itemWidth={Dimensions.get('window').width}
                                    // activeSlideAlignment="start"
                                    inactiveSlideScale={1}
                                    inactiveSlideOpacity={1}
                                    // contentContainerCustomStyle={{
                                    //     overflow: 'hidden',
                                    //     width: 146 * item.block.resource
                                    // }}
                                    // onSnapToItem={(index: any) => {
                                    // }}
                                    // removeClippedSubviews={false}
                                />
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
});