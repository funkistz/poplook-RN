import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Box, HStack, IconButton, Icon, FlatList, ScrollView } from 'native-base';
import ProductService from '../Services/ProductService';
import ProductCard from '../components/Products/ProductCard';

export default function ProductListPage({ route, navigation }: { route: any, navigation: any }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const filter = {
            id: route.params.category_id,
            num_page: 1,
            sort_by: 1,
        }


        const fetchData = async () => {

            const response = await ProductService.getProducts(filter);
            const json = await response.json();

            setProducts(json.data);
        }
        fetchData().catch(console.error);

    }, [])

    const goToProductPage = (banner: any) => {

        const params = {

        };

        navigation.navigate('Category', { screen: 'Product', params: params });
    }


    return (
        <FlatList numColumns={2} data={products} renderItem={({
            item
        }) => <Box w="50%">
                <ProductCard product={item}></ProductCard>
            </Box>} keyExtractor={(item: any) => item.id_product} />
    );
}