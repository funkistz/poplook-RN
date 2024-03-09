import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, HStack, FlatList, Text, Backdrop, Flex, View, ScrollView, Button } from 'native-base';
import ProductService from '../Services/ProductService';
import ProductCard from '../components/Products/ProductCard';
import Spinner from '../components/Spinner';
import SkeletonProductList from '../components/SkeletonProductList';
import Filter from '../components/Filter';
import FilterModal from '../components/Modals/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { scroll, reset, getFilterList } from '../Redux/Slices/ProductList';
import { addToWishlist, delWishlist, getWishList } from '../Redux/Slices/Wishlist';
import BottomSheet from '@gorhom/bottom-sheet';
import SizeList from '../components/Products/SizeList';
import { useFocusEffect } from '@react-navigation/native';
import BannerService from '../Services/BannerService';
import Blocks from '../components/Banner/Block';
import Grid from '../components/Banner/Grid';
import TextWithStyle from '../components/Banner/TextWithStyle';
import Sliders from '../components/Banner/Sliders';
import Carousels from '../components/Banner/Carousel';
import ListComponent from '../components/Products/ListComponent';
import Icon from 'react-native-vector-icons/AntDesign';

export default function CategoryPage({ route, navigation }: { route: any, navigation: any }) {

    const [isFocus, setIsFocus] = useState(false);

    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);
    const layout = useWindowDimensions();

    useFocusEffect(
        React.useCallback(() => {

            setTimeout(
                () => setIsFocus(true),
                100
            );

            return () => {
                // setIsFocus(false);
            };
        }, [])
    );

    // Redux
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const product = useSelector((storeState: any) => storeState.productList);
    const session = useSelector((storeState: any) => storeState.session);
    const wishlist = useSelector((storeState: any) => storeState.wishlist);


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
    const snapPoints = useMemo(() => ['35%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        if (index == -1) {
            setAttributeList([])
            setBackdropVisible(false)
        }
    }, []);
    const [backdropVisible, setBackdropVisible] = useState(false);

    // Size data
    const [attributeList, setAttributeList] = useState<any>([]);
    const [sizeSelected, setSizeSelected] = useState<any>();
    const setSizeSelectedModal = async (size: any) => {
        bottomSheetRef.current?.close();
        await addtoWishlist(size, attributeList)
        await dispatch(getWishList())
    }

    // Init Function
    const getSort = {
        title: "Sort by: ",
        data: [
            { id: 0, name: 'Popularity' },
            { id: 7, name: 'Newest' },
            { id: 6, name: 'Default' },
            { id: 1, name: 'Price lowest to highest' },
            { id: 2, name: 'Price highest to lowest' },
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
                getData()
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

    const addtoWishlist = async (id_product_attribute = null, item: any) => {

        if (wishlist.id_product.length > 0) {

            const filter = wishlist.data.product_list.find((res: any) => res.id_product === item.id_product);

            if (filter != undefined) {
                const params = {
                    id_product: filter.id_product,
                    id_product_attribute: filter.id_product_attribute,
                }

                await dispatch(delWishlist(params))
                return;
            }
        }

        setAttributeList(item)

        if (item.attribute_list.length > 0) {
            if (!id_product_attribute) {
                bottomSheetRef.current?.snapToIndex(0);
                setBackdropVisible(true);
                return;
            }
        }

        const params = {
            id_product: item.id_product,
            id_product_attribute: id_product_attribute ? id_product_attribute : 0,
            quantity: 1
        }

        await dispatch(addToWishlist(params));
    }

    const getData = async () => {

        const params = {
            categoryId: route.params.category_id,
            product_attribute: attribute,
            color: color,
            sort_option: sort.toString(),
        }

        dispatch(getFilterList(params))
    }

    const ITEMS_PER_PAGE = 20;
    const MAX_VISIBLE_PAGES = 3;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(product.count / ITEMS_PER_PAGE);

    const dataToShow = product.items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    
    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    
    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        if (!product.isLoading) {
            if (product.items.length < product.count) {
                dispatch(scroll(product));
                getData()
            }
        }
    };

    const handlePagePress = (pageNumber: any) => {
        setCurrentPage(pageNumber);
      if (!product.isLoading) {
        if (product.items.length < product.count) {
            dispatch(scroll(product));
            getData()
        }
    }
    };

    const getVisiblePages = () => {
        const startPage = Math.max(currentPage - Math.floor(MAX_VISIBLE_PAGES / 2), 1);
        const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);
        return [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);
    };


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

    }, [])

    useEffect(() => {
        if (submit) {
            getData().catch(console.error)

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
            dispatch(getFilterList(params))
        }
    }, [route])

    useEffect(() => {

    }, [listSizeColor]) // Important

    useEffect(() => {

    }, [combine])  // Important

    useEffect(() => {
        if (route.params.category_id == 264) {
            navigation.setOptions({ title: route.params.category_name });
        } else {
            navigation.setOptions({ title: route.params.category_name });
        }
    }, [])

    const [topBanners, setTopBanners] = useState<any>([]);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            const getTopBanners = async () => {
                const response = await BannerService.getTopBanners(route.params.category_id, shopId);
                let json = await response.data

                
    
                setTopBanners(json.data.data);
            }
    
            getTopBanners().catch(console.error);

        });

        return unsubscribe;
        
    }, [])

    const getChildWidth = (col: any) => {

        if (col.type == '%') {
            return (col.value / 100) * layout.width;
        } else if (col.type == 'px') {
            return layout.width * (col.value / 375);
        } else if (col.type == 'auto') {
            return layout.width;
        } else {
            return layout.width;
        }
    }

    const renderPageIndicator = (pageIndex: any) => (
        <View
          style={[
            styles.pageIndicator,
            { backgroundColor: currentPage === pageIndex + 1 ? 'blue' : 'gray' },
          ]}
          key={pageIndex}
        />
      );

    return (
        <>
            {isFocus &&
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
                                                {/* <ScrollView> */}
                                                {topBanners.map((data: any, index: any) => {

                                                return <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent,
                                                    paddingTop: data.padding.top, paddingRight: data.padding.right, paddingBottom: data.padding.bottom, paddingLeft: data.padding.left, 
                                                    height: data.height, width: '100%', backgroundColor: data.backgroundColor }} 
                                                    key={index}>

                                                        {data.children != null &&
                                                            <>
                                                                {data.children.map((item: any, index: any) => {

                                                                    return <Flex style={{ backgroundColor: item.backgroundColor, paddingTop: item.padding.top, paddingRight: item.padding.right, paddingBottom: item.padding.bottom, paddingLeft: item.padding.left, 
                                                                        height: item.height, width: getChildWidth(item.col) }} key={index}>

                                                                        {item.block.type == 'block' && 
                                                                            <Blocks item={item} type={'banner'}></Blocks> 
                                                                        }

                                                                        {item.block.type == 'grid' && 
                                                                            <Grid item={item} type={'banner'}></Grid>   
                                                                        }

                                                                        {item.block.type == 'text' && 
                                                                            <TextWithStyle data={item.block.resource.labelObj}></TextWithStyle>
                                                                        }

                                                                        {item.block.type == 'slider' && 
                                                                            <Sliders item={item} type={'banner'}></Sliders>
                                                                        }

                                                                        {item.block.type == 'carousel' && 
                                                                            <Carousels item={item} type={'banner'}></Carousels> 
                                                                        }

                                                                        {item.block.type == 'product_list' && 
                                                                            <Sliders item={item} type={'banner'}></Sliders>
                                                                        }

                                                                        {/* <Children item={item} index={index} navigation={navigation}></Children> */}

                                                                    </Flex>

                                                                })}
                                                            </>
                                                        }

                                                    </Flex>
                                                })}
                                                <FlatList
                                                    numColumns={2}
                                                    data={dataToShow}
                                                    renderItem={({ item } : any) => (
                                                        <ListComponent item={item} addtoWishlist={addtoWishlist}/>
                                                    )}
                                                    keyExtractor={(item: any) => item.id_product}
                                                    // ListFooterComponent={renderFooter}
                                                    disableVirtualization
                                                    // onEndReached={scrollMore}
                                                    onEndReachedThreshold={0.5}
                                                    // onEndReached={scrollMore}
                                                    // onEndReachedThreshold={0.1}
                                                    ListFooterComponent={() => <Spinner spin={product.isLoading}></Spinner>}
                                                />
                                                 <View style={styles.pagination}>
                                                    <TouchableOpacity
                                                    style={styles.paginationButton}
                                                    onPress={handlePrevious}
                                                    disabled={currentPage === 1}
                                                    >
                                                    <Text style={styles.paginationButtonText}><Icon name={'caretleft'} size={24} color="#333"/></Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.pageNumberText}>{` ${currentPage} of ${totalPages}`}</Text>
                                                    {/* {getVisiblePages().map((pageNumber) => (
                                                        <TouchableOpacity
                                                            disabled={product.isLoading}
                                                            key={pageNumber}
                                                            style={[
                                                            styles.pageNumberButton,
                                                            { backgroundColor: currentPage === pageNumber ? '#ccc' : 'white' },
                                                            ]}
                                                            onPress={() => handlePagePress(pageNumber)}
                                                        >
                                                            <Text style={styles.pageNumberText}>{pageNumber}</Text>
                                                        </TouchableOpacity>
                                                        ))} */}
                                                    <TouchableOpacity
                                                    style={styles.paginationButton}
                                                    onPress={handleNext}
                                                    disabled={currentPage === totalPages}
                                                    >
                                                    <Text style={styles.paginationButtonText}><Icon name={'caretright'} size={24} color="#333"/></Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {/* </ScrollView> */}
                                                
                                                
                                                
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
                        backdropComponent={() => (
                            <>
                                {backdropVisible && <Backdrop
                                    onPress={() => {
                                        setBackdropVisible(false);
                                        bottomSheetRef.current?.close();
                                    }}
                                    opacity={0}
                                />}
                            </>

                        )}
                    // backgroundStyle={{shadowColor: '#ccc', shadowOpacity: 0.5}}
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
                                    <SizeList attribute={attributeList.attribute_list} setSizeSelected={(size: any) => setSizeSelectedModal(size)} sizeSelected={sizeSelected}></SizeList>
                                </View>
                            </>
                        }

                    </BottomSheet>
                </>
            }
        </>

    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 15
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    pagination2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center',
      },
      pageIndicatorsContainer: {
        flexDirection: 'row',
      },
      pageIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 3,
        marginHorizontal: 60,
        alignItems: 'center',
        backgroundColor: 'white',
      },
      paginationButton: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
      },
      paginationButtonText: {
        color: 'black',
        padding: 3
      },
      pageNumberButton: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black'
      },
      pageNumberText: {
        color: 'black',
        fontSize: 12
      },
});