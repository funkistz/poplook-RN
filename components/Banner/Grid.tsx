import { Dimensions, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { FlatList, Flex } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect } from 'react';
import Images from './Image';
import Videos from './Video';

const win = Dimensions.get('window');

const Grid = memo(function Greeting({ item, type }: any) {

    const navigation: any = useNavigation();

    const columnNumber = item.block.columnNo;
    const gap = item.block.gridSpacing;

    const availableSpace = win.width - (columnNumber - 1) * gap;
    const itemSize = ((availableSpace + gap) / columnNumber);

    const dataArray = [item.block.resource];
    const layout = useWindowDimensions();
    
    const goToCategory = (item: any) => {

        const params = {
            category_id: String(item.linkData.id),
            category_name: item.linkData.name
        };

        type == 'banner' ? navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.linkData.id) }) : navigation.navigate('Categories', { screen: 'CategoryPage', params: params, title: String(item.linkData.id) });

    }

    const renderItem = ({data} : any ) => {
        return (
            <View style={{ width: itemSize }}>
                <TouchableOpacity onPress={() => goToCategory(data)}>

                    {item.type == 'image' &&
                        <Images data={item} column={columnNumber}></Images>
                    }

                    {item.type == 'video' &&
                        <Videos data={item}></Videos>
                    }
                    
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View>

            {columnNumber > 1 &&
                <FlatList
                    data={item.block.resource}
                    numColumns={item.block.columnNo} 
                    key={item.block.columnNo}
                    renderItem={renderItem}
                    contentContainerStyle={{gap}}
                    columnWrapperStyle={{gap}}
                /> 
            }

            {columnNumber == 1 &&
                <Flex>

                    {item.block.resource.map((item: any, index: any) => {  

                        return <TouchableOpacity onPress={() => goToCategory(item)} key={index}>
        
                            {item.type == 'image' && 
                                <Images data={item}></Images>
                            }
            
                            {item.type == 'video' && 
                                <Videos data={item}></Videos>
                            }
            
                        </TouchableOpacity>

                    })}         
                   
                </Flex>
            }
          
        </View>
        
    );
})

export default Grid;