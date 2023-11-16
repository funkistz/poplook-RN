import { Dimensions, View } from 'react-native';
import { Text, FlatList } from 'native-base';
import React, { memo } from 'react';
import Images from './Image';
import Videos from './Video';

const win = Dimensions.get('window');

const Grid = memo(function Greeting({ item }: any) {

    const columnNumber = win.width / (item.block.columnNo);
    const gap = item.block.gridSpacing;

    return (
        <FlatList
            data={item.block.resource}
            numColumns={item.block.columnNo} 
            contentContainerStyle={{gap}}
            columnWrapperStyle={{gap}}
            renderItem={({ item } : any ) => <>
                <View style={{ width: columnNumber }}>
                    {item.type == 'image' &&
                        <Images width={columnNumber} data={item}></Images>
                    }
                    {item.type == 'video' &&
                        <Videos width={columnNumber} height={columnNumber/1.5} data={item}></Videos>
                    }
                    
                </View>
                </>
        }
    />  
    );
})

export default Grid;