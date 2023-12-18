import { StyleSheet, View, Dimensions, useWindowDimensions, Image } from 'react-native';
import React, { useEffect , useState} from 'react';
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

    const [imageHeight, setImageHeight] = useState<any>([])
    const layout = useWindowDimensions();

    useEffect(() => {

        if (item.block.resource.length > 0) {
            item.block.resource.map((image: any) => {

                const url = image.href;

                Image.getSize(url, (width: any, height: any) => {

                    setImageHeight(height * win.width / width);

                });

            })
        }

    }, [item])

    const getChildWidth = (col: any) => {

        if (col.type == '%') {
            return (col.value / 100) * layout.width;
        } else if (col.type == 'px') {
            return imageHeight * (col.value / 375);
        } else if (col.type == 'auto') {
            return imageHeight;
        } else {
            return imageHeight;
        }
    }

    const getChildHeight = (height: any) => {

        if (height != 'auto') {
            return layout.height * (height / 667);
        } else {
            return imageHeight;
        }
    }

    return (
        <Center key={index}>
            <ScrollView w='100%'>
                <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                    height: item.height, width: getChildWidth(item.col) }}>

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

                </Flex>
            </ScrollView>
        </Center>
        
    );
}

const styles = StyleSheet.create({
    
});

export default Children;