import { Dimensions, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import Images from './Image';
import Videos from './Video';

const win = Dimensions.get('window');

const Grid = memo(function Greeting({ item }: any) {

    const navigation: any = useNavigation();

    const columnNumber = item.block.columnNo;
    const gap = item.block.gridSpacing;

    const availableSpace = win.width - (columnNumber - 1) * gap;
    const itemSize = ((availableSpace + gap) / columnNumber);

    const goToCategory = (item: any) => {

        const params = {
            category_id: String(item.linkData.id),
            category_name: item.linkData.name
        };

        navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.linkData.id) });

    }

    const renderItem = ({item} : any ) => {
        return (
            <View style={{ width: itemSize }}>
                <TouchableOpacity onPress={() => goToCategory(item)}>

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
        <FlatList
            data={item.block.resource}
            numColumns={item.block.columnNo} 
            key={item.block.columnNo}
            renderItem={renderItem}
            contentContainerStyle={{gap}}
            columnWrapperStyle={{gap}}
        />  
    );
})

export default Grid;