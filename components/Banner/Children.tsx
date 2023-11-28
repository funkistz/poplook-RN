import { StyleSheet, View, Dimensions, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { Center, Text } from 'native-base';
import { ScrollView, Flex } from 'native-base';
import Sliders from './Sliders';
import Texts from './TextWithStyle';
import Carousels from './Carousel';
import Grid from './Grid';
import Blocks from './Block';
import Navigations from './Navigation';
import Vimeos from './Vimeo';
import TextWithStyle from './TextWithStyle';

const win = Dimensions.get('window');

const Children = ({ item, index, navigation }: { item: any, index: any, navigation: any }) => {

    const getChildWidth = (col: any) => {

        if (col.type == '%') {
            return col.value + '%';
        } else if (col.type == 'px') {
            return col.value + 'px';
        } else if (col.type == 'auto') {
            return 'auto';
        } else {
            return 'auto';
        }

    }

    return (
        <Center key={index}>
            <ScrollView w='100%'>
                <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                    height: item.height, width: getChildWidth(item.col),  }}>

                    {item.block.type == 'block' && 
                        <Blocks item={item} height={item.height} width={item.col.value}{...item.col.type}></Blocks> 
                    }

                    {item.block.type == 'grid' && 
                        <Grid item={item} height={item.height}></Grid>   
                    }

                    {item.block.type == 'text' && 
                        <TextWithStyle data={item.block.resource.labelObj}></TextWithStyle>
                    }

                    {item.block.type == 'slider' && 
                        <Sliders item={item} height={item.height}></Sliders>
                    }

                    {item.block.type == 'carousel' && 
                        <Carousels item={item} children='' height={item.height}></Carousels>
                    }

                    {item.block.type == 'navigation_list' && 
                        <Navigations item={item} height={item.height}></Navigations>
                    }

                    {/* {item.block.type == 'vimeo' && 
                        <Vimeos item={item} height={item.height}></Vimeos>
                    } */}

                </Flex>
            </ScrollView>
        </Center>
        
    );
}

const styles = StyleSheet.create({
    
});

export default Children;