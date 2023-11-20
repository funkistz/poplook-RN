import { StyleSheet, View, Dimensions, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { Center, Text } from 'native-base';
import { ScrollView } from 'native-base';
import Sliders from './Sliders';
import Texts from './Text';
import Carousels from './Carousel';
import Grid from './Grid';
import Blocks from './Block';

const win = Dimensions.get('window');

const Children = ({ item, index, navigation }: { item: any, index: any, navigation: any }) => {

    return (
        <Center key={index}>
            <ScrollView w='100%'>
                <View style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, height: item.height }}>

                    {item.block.type == 'block' && 
                        <Blocks item={item} height={item.height} width={item.col.value}{...item.col.type}></Blocks> 
                    }

                    {item.block.type == 'grid' && 
                        <Grid item={item} height={item.height}></Grid>   
                    }

                    {item.block.type == 'text' && 
                        <Texts item={item} height={item.height}></Texts>
                    }

                    {item.block.type == 'slider' && 
                        <Sliders item={item} height={item.height}></Sliders>
                    }

                    {item.block.type == 'carousel' && 
                        <Carousels item={item} children='' height={item.height}></Carousels>
                    }
                </View>
            </ScrollView>
        </Center>
        
    );
}

const styles = StyleSheet.create({
    
});

export default Children;