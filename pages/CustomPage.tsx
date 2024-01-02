import { StyleSheet, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, ScrollView } from 'native-base';
import Sliders from '../components/Banner/Sliders';
import TextWithStyle from '../components/Banner/TextWithStyle';
import Blocks from '../components/Banner/Block';
import Grid from '../components/Banner/Grid';
import Carousels from '../components/Banner/Carousel';

export default function CustomPage({ route, navigation } : { route: any, navigation: any }) {

    const [pages, setPages] = useState<any>([]);
    const layout = useWindowDimensions();

    useEffect(() => {

        navigation.setOptions({ title: route.params.params.page_name });
    
        const getCustomPage = async () => {
            const response = await BannerService.getCustomPage(route.params.params.page_url);
            let json = await response.data

            console.log('CUSTOMPAGE' ,json)

            setPages(json.data.data);
        }

        getCustomPage().catch(console.error);

            
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
            {pages.map((data: any, index: any) => {

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
                                            <Blocks item={item} type={'menu'}></Blocks> 
                                        }

                                        {item.block.type == 'grid' && 
                                            <Grid item={item} type={'menu'}></Grid>   
                                        }

                                        {item.block.type == 'text' && 
                                            <TextWithStyle data={item.block.resource.labelObj}></TextWithStyle>
                                        }

                                        {item.block.type == 'slider' && 
                                            <Sliders item={item} type={'menu'}></Sliders>
                                        }

                                        {item.block.type == 'carousel' && 
                                            <Carousels item={item} type={'menu'}></Carousels> 
                                        }

                                        {item.block.type == 'product_list' && 
                                            <Sliders item={item} type={'menu'}></Sliders>
                                        }

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



