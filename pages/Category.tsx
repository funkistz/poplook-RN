import { StyleSheet, View, Dimensions, TouchableOpacity, TouchableHighlight, Animated } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Box, HStack, IconButton, FlatList, ScrollView, VStack, Skeleton, Text, Icon, Select, Button } from 'native-base';
import ProductService from '../Services/ProductService';
import ProductCard from '../components/Products/ProductCard';
import Spinner from '../components/Spinner';
import SkeletonProductList from '../components/SkeletonProductList';
import Filter from '../components/Filter';
import FilterModal from '../components/Modals/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { scroll, reset, getFilterList } from '../Redux/Slices/ProductList';
import { addToWishlist, getWishList } from '../Redux/Slices/Wishlist';
import BottomSheet from '@gorhom/bottom-sheet';
import SizeList from '../components/Products/SizeList';

export default function CategoryPage({ route, navigation }: { route: any, navigation: any }) {

    // Redux
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const product = useSelector((storeState: any) => storeState.productList);

    // Define
    const [isModalFilter, setModalFilter] = useState(false);
    const [submit, setSubmit] = useState(false);

    // Modal Filter
    const [listSize, setListSize] = useState<any>([])
    const [listColor, setListColor] = useState<any>([])
    const [listSizeColor, setListSizeColor] = useState<any>([])
    const [sort, setSort] = useState<any>(product.sort)
    const [attribute, setAttribute] = useState<any>([])
    const [color, setColor] = useState<any>([])
    const [combine, setCombine] = useState<any>([])

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

    useEffect(() => {
        // setCombine([...product.attribute, ...product.color]);

    }, [])


    // Init Function
    const getSort = {
        title: "Sort by: ",
        data: [
            { id: 0, name: 'Popularity' },
            { id: 1, name: 'Price lowest to highest' },
            { id: 2, name: 'Price highest to lowest' },
            { id: 6, name: 'Newest' }
        ]
    }

    const getSize = async () => {
        const response = await ProductService.getSize();
        const json = await response.json();

        setListSize(json.data)
    }

    const getColor = async () => {
        const response = await ProductService.getColor();
        const json = await response.json();

        setListColor(json.data)
    }

    const getSizeColor = async () => {

        const responseColor = await ProductService.getColor();
        const jsonColor = await responseColor.json();

        const responseSize = await ProductService.getSize();
        const jsonSize = await responseSize.json();

        setListSizeColor([...jsonSize.data, ...jsonColor.data])

    }


    // Action
    const submitBtn = (action: boolean) => {
        if (action) {
            setModalFilter(!isModalFilter);
            setSubmit(action)
            setCombine([...attribute, ...color])
        }
    }

    const toggleModal = () => {
        setModalFilter(!isModalFilter);
        if (isModalFilter) {
            setSubmit(false)
        }
    };

    const scrollMore = () => {

        if (!product.isLoading) {
            if (product.items.length < product.count) {
                dispatch(scroll(product));
                const params = {
                    categoryId: route.params.category_id,
                    product_attribute: attribute,
                    color: color,
                    sort_option: sort.toString(),
                }
                dispatch(getFilterList(params))
            }
        }
    }

    const clickSort = (item: any) => {
        setSort(item)
    }

    const clickFilter = (params: any) => {
        const newSize = [...attribute];
        const newColor = [...color];


        if (params.type == 'attribute') {
            if (newSize.includes(params.data)) {
                const index = newSize.indexOf(params.data)
                newSize.splice(index, 1);
                setAttribute(newSize);
            } else {
                setAttribute([...attribute, params.data])
            }
        } else if (params.type == 'color') {
            if (newColor.includes(params.data)) {
                const index = newColor.indexOf(params.data)
                newColor.splice(index, 1);
                setColor(newColor);
                // console.log('color:', color)
            } else {
                setColor([...color, params.data])
            }
        }

    }

    const clearAll = () => {
        setSort(6)
        setAttribute([])
        setColor([])
    }

    const clickRemoveItem = (item: any) => {
        const indexOfAttribute = attribute.findIndex((el: any) => el == item)
        if (indexOfAttribute !== -1) {
            const filter = attribute.filter((el: any) => el !== item)
            // console.log('attribute Filter: ', filter)
            setAttribute([...filter])
            setCombine([...filter, ...color])
            const temp: any = {
                color: [...filter]
            }

            const params = {
                categoryId: route.params.category_id,
                product_attribute: [...filter],
                color: color,
                sort_option: sort.toString(),
            }

            dispatch(getFilterList(params))
        }

        const indexOfColor = color.findIndex((el: any) => el == item)
        if (indexOfColor !== -1) {
            const filter = color.filter((el: any) => el !== item)
            // console.log('attribute color: ', filter)
            setColor([...filter])
            setCombine([...attribute, ...filter])

            const params = {
                categoryId: route.params.category_id,
                product_attribute: attribute,
                color: [...filter],
                sort_option: sort.toString(),
            }

            dispatch(getFilterList(params))
        }

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

        await dispatch(addToWishlist(params));
        await dispatch(getWishList())
    }


    // useEffect
    useEffect(() => {
        // Init Data
        getSize().catch(console.error)
        getColor().catch(console.error)
        getSizeColor().catch(console.error)
        dispatch(getWishList())

        // Clear Data
        setAttribute([])
        setColor([])
        setCombine([])

        // console.log('product:', product)

    }, [])

    useEffect(() => {
        if (submit) {
            const params = {
                categoryId: route.params.category_id,
                product_attribute: attribute,
                color: color,
                sort_option: sort.toString(),
            }

            dispatch(getFilterList(params))

        }
    }, [isModalFilter])

    useEffect(() => {
        const Reset = dispatch(reset(product))
        if (Reset) {
            const params = {
                categoryId: route.params.category_id,
                product_attribute: attribute,
                color: color,
                sort_option: sort.toString(),
            }

            // console.log('params', params)
            dispatch(getFilterList(params))
        }
    }, [route])

    useEffect(() => {

    }, [listSizeColor]) // Important

    useEffect(() => {

    }, [combine])  // Important

    return (
        <>
            <FilterModal
                visible={isModalFilter}
                onToggle={toggleModal}
                submitBtn={submitBtn}
                sortData={getSort}
                attributeData={listSize}
                colorData={listColor}
                sortClick={clickSort}
                attributeClick={clickFilter}
                clearAllClick={clearAll}
                selectedSort={sort}
                selectedAttribute={attribute}
                selectedColor={color}
            />


            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {(product.isSuccess && listSizeColor.length > 0) &&
                    <>
                        <Filter clicked={toggleModal} removeItem={clickRemoveItem} product={combine} listSizeColor={listSizeColor} />

                        {product.count > 1 &&
                            <>
                                {(product.items.length > 1) &&
                                    <>
                                        <FlatList
                                            numColumns={2}
                                            data={product.items}
                                            // mb={10}
                                            renderItem={({ item }) => <Box w="50%">
                                                <ProductCard product={item} openWishlist={addtoWishlist}></ProductCard>
                                            </Box>}
                                            keyExtractor={(item: any) => item.id_product}
                                            onEndReached={scrollMore}
                                            onEndReachedThreshold={1}
                                            ListFooterComponent={() => <Spinner spin={product.isLoading}></Spinner>}
                                        />
                                    </>
                                }

                                {(product.items == 0) &&
                                    <>
                                        <SkeletonProductList filter={false} containerOnly={true} />
                                    </>
                                }
                            </>
                        }

                        {(product.count == 0) &&
                            <>
                                {!product.isLoading &&
                                    <>
                                        <HStack backgroundColor={'white'} h={'100%'}>
                                            <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
                                                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                                                    <Text color='black' bold fontSize={20}>No Result</Text>
                                                </View>
                                                <Text color='black' fontSize={13}>0 Filtered Items</Text>
                                            </View>
                                        </HStack>
                                    </>

                                }

                                {product.isLoading &&
                                    <>
                                        <SkeletonProductList filter={false} containerOnly={true} />
                                    </>

                                }

                            </>
                        }
                    </>
                }

                {(!product.isSuccess && product.isLoading && product.count == 0 || listSizeColor.length == 0) &&
                    <>
                        <SkeletonProductList filter={false} containerOnly={false} />
                    </>
                }
            </View>
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

    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 20
    },
});