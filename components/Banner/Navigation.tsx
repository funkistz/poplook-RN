import { Dimensions, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';

const win = Dimensions.get('window');

const Navigations = memo(function Greeting({ item, height }: any) {

    const navigation: any = useNavigation();

    const goToCategory = (item: any) => {
      
        const params = {
            category_id: String(item.categoryId),
            category_name: ''
        };

        navigation.navigate('Home', { screen: 'CategoryPage', params: params, title: String(item.categoryId) });

    }

    return (
        <View>
            {item.block.resource.map((data: any, index: any) => {
                return <TouchableOpacity onPress={() => goToCategory(data)} key={index}>
                    <Text style={{ color: data.colour }}>{data.label}</Text>
                </TouchableOpacity>
            })}
             
        </View>
    );
})

export default Navigations;