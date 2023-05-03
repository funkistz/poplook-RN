import { StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, TextInput, Button, Keyboard } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, ScrollView, View, HStack, Box, Spacer, Icon, FlatList, Center, Select, CheckIcon, VStack } from "native-base";
import ProductCard from '../components/Products/ProductCard';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch, scroll } from '../Redux/Slices/Search';
import { ThunkDispatch } from '@reduxjs/toolkit';
import SkeletonLoading from '../components/SkeletonProductList';
import IonIcon from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import { addToWishlist, getWishList } from '../Redux/Slices/Wishlist';
import SizeList from '../components/Products/SizeList';

export default function SearchPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const product = useSelector((storeState: any) => storeState.search);

     // Bottom sheet
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['30%', '50%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        if(index == -1) {
            setAttributeList([])
        }
    }, []);

    // Size data
    const [attributeList, setAttributeList] = useState<any>([]);
    const [sizeSelected, setSizeSelected] = useState<any>();
    const setSizeSelectedModal = async (size: any) => {
        bottomSheetRef.current?.close();
        await addtoWishlist(size,attributeList)
        await dispatch(getWishList())
    }

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

    const addtoWishlist = async (id_product_attribute = null, item:any) => {

        setAttributeList(item)    

        if (item.attribute_list.length > 0) {
            if (!id_product_attribute) {
                bottomSheetRef.current?.snapToIndex(0);
                return;
            }
        }

        const params = {
            id_product: item.id_product,
            id_product_attribute: id_product_attribute ? id_product_attribute : 0,
            quantity: 1
        }

        console.log('params: ', params)

        await dispatch(addToWishlist(params));
        await dispatch(getWishList())
    }

    useEffect(() => {
        navigation.setOptions({ title: "Search '" + route.params.keyword + "' "});
    }, [])

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
                                        <ProductCard product={item} openWishlist={addtoWishlist}></ProductCard>
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

            <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose
                    backgroundStyle={{shadowColor: '#ccc', shadowOpacity: 0.5}}
                >

                    {attributeList.length == 0 && 
                        <>
                            <Spinner spin={true} />
                        </>
                    }

                    {attributeList.length != 0 && 
                        <>
                            <View style={styles.contentContainer}>
                                <Text color={'black'} bold mb={2}>Select Size: </Text>
                                <SizeList attribute={attributeList.attribute_list} setSizeSelected={(size:any) => setSizeSelectedModal(size)} sizeSelected={sizeSelected}></SizeList>
                            </View>
                        </>
                    }
                    
            </BottomSheet>
        </>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 20
    },
})

