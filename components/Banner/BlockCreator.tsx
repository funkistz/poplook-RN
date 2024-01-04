import { StyleSheet, useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';
import { Flex } from 'native-base';
import Sliders from './Sliders';
import Carousels from './Carousel';
import Grid from './Grid';
import Blocks from './Block';
import Navigations from './Navigation';
import Vimeos from './Vimeo';
import TextWithStyle from './TextWithStyle';

const BlockCreator = ({ data, key }: { data: any, key: any }) => {

    const layout = useWindowDimensions();

    useEffect(() => {

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

    return <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
        paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left, 
        height: data.height, width: '100%', backgroundColor: data.backgroundColor }} 
        key={key}>

            {data.children != null &&
                <>
                    {data.children.map((item: any, index: any) => {

                        return <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                            height: item.height, width: getChildWidth(item.col) }} key={index}>

                            {item.block.type == 'block' && 
                                <Blocks item={item} type={'banner'}></Blocks> 
                            }

                            {item.block.type == 'grid' && 
                                <Grid item={item} type={'banner'}></Grid>   
                            }

                            {item.block.type == 'text' && 
                                <TextWithStyle data={item.block.resource.labelObj}></TextWithStyle>
                            }

                            {item.block.type == 'slider' && 
                                <Sliders item={item} type={'banner'}></Sliders>
                            }

                            {item.block.type == 'carousel' && 
                                <Carousels item={item} type={'banner'}></Carousels> 
                            }

                            {item.block.type == 'product_list' && 
                                <Sliders item={item} type={'banner'}></Sliders>
                            }

                        </Flex>

                    })}
                </>
            }

        </Flex>

}

const styles = StyleSheet.create({
    
});

export default BlockCreator;