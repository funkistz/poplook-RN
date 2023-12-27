import { StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, ScrollView } from 'native-base';
import Children from '../components/Banner/Children';
import { useSelector } from 'react-redux';
import Sliders from '../components/Banner/Sliders';
import TextWithStyle from '../components/Banner/TextWithStyle';
import Blocks from '../components/Banner/Block';
import Grid from '../components/Banner/Grid';
import Carousels from '../components/Banner/Carousel';

const win = Dimensions.get('window');

export default function HomePage({ navigation }: { navigation: any }) {

    const [banners, setBanners] = useState<any>([]);
    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);
    const layout = useWindowDimensions();
    const [currentImageIndex, setCurrentImageIndex] = useState<any>(0);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            const getBanners = async () => {
                const response = await BannerService.getMobileBanners(shopId);
                let json = await response.data
    
                setBanners(json.data.data);
            }
    
            getBanners().catch(console.error);

            
        });

        return unsubscribe;
        
    }, [])

    const getChildWidth = (col: any) => {

        if (col.type == '%') {
            return (col.value / 100) * layout.width;
        } else if (col.type == 'px') {
            return layout.width * (col.value / 375);
        } else if (col.type == 'auto') {
            return layout.width;
        } else {
            return layout.width;
        }
    }

    const getChildHeight = (height: any) => {

        if (height != 'auto') {
            return layout.height * (height / 667);
        } else {
            return layout.height;
        }
    }

    return (
        <ScrollView w='100%'>
            {banners.map((data: any, index: any) => {

                return <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
                    paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left, 
                    height: data.height, width: '100%', backgroundColor: data.backgroundColor }} 
                    key={index}>

                        {data.children != null &&
                            <>
                                {data.children.map((item: any, index: any) => {

                                    return <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                                        height: item.height, width: getChildWidth(item.col) }} key={index}>

                                        {item.block.type == 'block' && 
                                            <Blocks item={item}></Blocks> 
                                        }

                                        {item.block.type == 'grid' && 
                                            <Grid item={item}></Grid>   
                                        }

                                        {item.block.type == 'text' && 
                                            <TextWithStyle data={item.block.resource.labelObj}></TextWithStyle>
                                        }

                                        {item.block.type == 'slider' && 
                                            <Sliders item={item}></Sliders>
                                        }

                                        {item.block.type == 'carousel' && 
                                            <Carousels item={item}></Carousels> 
                                        }

                                        {item.block.type == 'product_list' && 
                                            <Sliders item={item}></Sliders>
                                        }

                                        {/* <Children item={item} index={index} navigation={navigation}></Children> */}

                                    </Flex>

                                })}
                            </>
                        }

                    </Flex>
            })}
    
        </ScrollView>
      );
}

const styles = StyleSheet.create({
});



