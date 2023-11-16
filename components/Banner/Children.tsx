import { StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import { Center } from 'native-base';
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
                <View style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left }}>

                    {item.block.type == 'block' && 
                        <Blocks item={item}></Blocks> 
                    }

                    {item.block.type == 'grid' && 
                    <Grid item={item}></Grid>   
                    }

                    {item.block.type == 'text' && 
                        <Texts item={item}></Texts>
                    }

                    {item.block.type == 'slider' && 
                        <Sliders item={item} children=''></Sliders>
                    }

                    {item.block.type == 'carousel' && 
                        <Carousels item={item} children=''></Carousels>
                    }
                </View>
            </ScrollView>
        </Center>
        
    );
}

const styles = StyleSheet.create({
    
});

export default Children;