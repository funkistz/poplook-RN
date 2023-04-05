import { StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, TextInput, Button, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, HStack, Box, Spacer, Icon, FlatList, Center, Select, CheckIcon, VStack } from "native-base";
import ProductCard from '../components/Products/ProductCard';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch, scroll } from '../Redux/Slices/Search';
import { ThunkDispatch } from '@reduxjs/toolkit';
import SkeletonLoading from '../components/SkeletonProductList';
import IonIcon from 'react-native-ionicons';

export default function SearchPage() {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const product = useSelector((storeState: any) => storeState.search);

    const scrollMore = () => {
        const params = {
            keyword: product.keyword,
            sort: product.sort
        }

        if (!product.isLoading) {
            if (product.items.length < product.count) {
                const scrollx = dispatch(scroll(product));
                if (scrollx) {
                    dispatch(getSearch(params))
                }
            }
        }
    }

    const loadingSpinner = () => {
        return <Spinner spin={product.isLoading}></Spinner>
    }

    const sort = (item: any) => {

        const params = {
            keyword: product.keyword,
            sort: item
        }
        dispatch(getSearch(params))
    }

    return (
        <>
            {(!product.isLoading || product.items.length > 0) &&
                <View>
                    {(product.count > 0) &&
                        <View>
                            <Center backgroundColor={'white'} py={3}>
                                <Box w="95%" >
                                    <Select
                                        backgroundColor={'gray.100'}
                                        color={'black'}
                                        borderColor={'red'}
                                        selectedValue={product.sort.toString()}
                                        accessibilityLabel="Please Select"
                                        placeholder="Please Select"
                                        h={10}
                                        onValueChange={
                                            itemValue => sort(itemValue)

                                        }
                                        _selectedItem={{
                                            color: 'amber.100'
                                        }}
                                    >
                                        <Select.Item label="Popularity" value="0" />
                                        <Select.Item label="Date" value="6" />
                                        <Select.Item label="Price lowest to highest" value="1" />
                                        <Select.Item label="Price highest to lowest" value="2" />
                                    </Select>
                                </Box>
                            </Center>
                            <FlatList
                                backgroundColor={'white'}
                                numColumns={2}
                                data={product.items}
                                mb={10}
                                renderItem={({
                                    item
                                }) => <Box w="50%">
                                        <ProductCard product={item}></ProductCard>
                                    </Box>}
                                keyExtractor={(item: any) => item.id_product}
                                onEndReached={scrollMore}
                                onEndReachedThreshold={1}
                                ListFooterComponent={loadingSpinner}
                            />
                        </View>
                    }
                    {product.count == 0 &&

                        <HStack backgroundColor={'white'} h={'100%'}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                                    <IonIcon
                                        name='search-outline'
                                        size={24}
                                        color="black"
                                        style={{ marginRight: 10, paddingTop: 3, }}
                                    />
                                    <Text color='black' bold fontSize={20}>No Result For </Text>
                                </View>
                                <Text color='black' fontSize={13}>Sorry, we couldn't find any result</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text color='black' fontSize={13}>for your search on </Text>
                                    <Text color='black' bold fontSize={13}>"{product.keyword}"</Text>
                                </View>
                            </View>
                        </HStack>

                    }
                </View>
            }

            {(product.isLoading && product.items.length == 0) &&
                <SkeletonLoading filter={false} containerOnly={false} />
            }
        </>
    )
}

const styles = StyleSheet.create({

})

