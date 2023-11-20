import { Dimensions, View, TouchableOpacity } from 'react-native';
import { Text, FlatList } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import Images from './Image';
import Videos from './Video';

const win = Dimensions.get('window');

const Grid = memo(function Greeting({ item, height }: any) {

    const navigation: any = useNavigation();
    const columnNumber = win.width / (item.block.columnNo);
    const gap = item.block.gridSpacing;

    const goToCategory = (item: any) => {
      
        const params = {
            category_id: String(item.categoryId),
            category_name: ''
        };

        navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.categoryId) });

    }

    return (
        <FlatList
            data={item.block.resource}
            numColumns={item.block.columnNo} 
            contentContainerStyle={{gap}}
            columnWrapperStyle={{gap}}
            renderItem={({ item } : any ) => <>
                <View style={{ width: columnNumber }}>
                    <TouchableOpacity onPress={() => goToCategory(item)}>
                        {item.type == 'image' &&
                            <Images width={columnNumber} data={item} height={height}></Images>
                        }
                        {item.type == 'video' &&
                            <Videos width={columnNumber} height={columnNumber/1.5} data={item}></Videos>
                        }
                    </TouchableOpacity>
                    
                </View>
                </>
        }
    />  
    );
})

export default Grid;