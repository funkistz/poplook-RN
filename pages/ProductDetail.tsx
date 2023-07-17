import { StyleSheet, View, Dimensions, Image, TouchableOpacity, Share, Platform } from 'react-native';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { VStack, HStack, Flex, Box, ScrollView, Button, IconButton, Text, Divider, Backdrop } from 'native-base';
import ProductService from '../Services/ProductService';
import { addToCart, getCart } from '../Redux/Slices/Cart';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Chip } from 'react-native-paper';
import Wishlist from '../components/wishlist';
import StoreAvailabilityModal from '../components/Modals/StoreAvailability';
import SkeletonProductDetails from '../components/SkeletonProductDetails';
import SizeList from '../components/Products/SizeList';
import ProductCard from '../components/Products/ProductCard';
import BottomSheet from '@gorhom/bottom-sheet';
import { WEB_URL } from "@env"
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { addToWishlist, delWishlist, getWishList } from '../Redux/Slices/Wishlist';
import { useFocusEffect } from '@react-navigation/native';
import SizeGuideModal from '../components/Modals/SizeGuide';
import GeneralService from '../Services/GeneralService';
import Carousel from 'react-native-reanimated-carousel';
import CarouselItem from '../components/Products/CarouselItem';
import Animated from 'react-native-reanimated';
import ImageView from "react-native-image-viewing";
import { LayoutAnimation } from 'react-native';
import { toggleAnimation } from '../components/Animation/toggleAnimation';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Pagination } from 'react-native-snap-carousel';

const win = Dimensions.get('window');

export default function ProductDetailPage({ route, navigation, product_id }: any) {

    const cart = useSelector((storeState: any) => storeState.cart);

    const [isFocus, setIsFocus] = useState(false);

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

    // Details
    const [product, setProduct] = useState<any>({});
    const [images, setImages] = useState<any>([]);
    const [imagesOnly, setImagesOnly] = useState<any>([]);
    const [carouselItems, setCarouselItems] = useState<any>([]);
    const [vimeoUrl, setVimeoUrl] = useState<any>([]);
    const [imagePreviewShow, setImagePreviewShow] = useState<any>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<any>(0);
    const [ref, setRef] = useState<any>();
    const scrollPosition = useRef(0)

    useEffect(() => {

        let temp: any = [];

        if (images) {
            images.map((image: any) => {

                // temp.push(<CarouselItem imageHeight={imageHeight} uri={image} />);
                temp = [...temp, <CarouselItem imageHeight={imageHeight} uri={image} />]

            })
        }

        setCarouselItems(temp);

    }, [images])

    const [attribute, setAttribute] = useState([]);
    const [colorRelated, setColorRelated] = useState([]);
    const [shownHere, setShownHere] = useState<any>([]);

    // setImageHeight(height * screenWidth / width);

    const [imageHeight, setImageHeight] = useState<any>((760 * win.width / 506));

    useEffect(() => {
        setImageHeight(760 * win.width / 506);
    }, [win])

    const [isLoading, setIsLoading] = useState<any>(false);
    const [details, setDetails] = useState<any>('');
    const [measurements, setMeasurements] = useState<any>([]);
    const [care, setCare] = useState<any>('');
    const [delivery, setDelivery] = useState<any>('');
    const [reference, setReference] = useState<any>('');
    const [styleItWith, setStyleItWith] = useState<any>([]);
    const [motherDaughter, setMotherDaughter] = useState<any>([]);
    const [quantityAvailable, setQuantityAvailable] = useState<any>('');

    // Webview
    const [heightDetails, setHeightDetails] = useState<any>(0);;

    // Redux
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const wishlist = useSelector((storeState: any) => storeState.wishlist);
    const session = useSelector((storeState: any) => storeState.session);

    // Modal
    const [isModalStore, setModalStore] = useState(false);
    const [isModalSizeGuide, setModalSizeGuide] = useState(false);
    const [isModalDetails, setModalDetails] = useState(false);
    const [isModalDelivery, setModalDelivery] = useState(false);
    const [isModalCare, setModalCare] = useState(false);
    const [isModalMeasurements, setModalMeasurements] = useState(false);
    const animationController = useRef(new Animated.Value(0)).current;

    // Bottom sheet
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        if (index == -1) {
            setBackdropVisible(false)
        }
    }, []);
    const [backdropVisible, setBackdropVisible] = useState(false);

    // Size data
    const [hasSize, setHasSize] = useState<any>(false);
    const [type, setType] = useState<any>();
    const [sizeSelected, setSizeSelected] = useState<any>();
    const setSizeSelectedModal = async (size: any) => {
        closeSheet();
        if (type == 'cart') {
            await addToCartF(size);
        } else {
            await addtoWishlist(size, attribute)
            await dispatch(getWishList())
        }
        setSizeSelected(size);
    }
    const closeSheet = () => {
        bottomSheetRef.current?.close();
    };

    // Toggle
    const toggleModalStore = () => {
        setModalStore(!isModalStore);
    };

    const toggleModalSizeGuide = () => {
        setModalSizeGuide(!isModalSizeGuide);
    };

    const toggleModalDetails = () => {
        setModalDetails(!isModalDetails);

        const config: any = {
            duration: 300,
            toValue: isModalDetails ? 0 : 1,
            useNativeDriver: true
        };

        Animated.timing(animationController, config).start();
        LayoutAnimation.configureNext(toggleAnimation); 
    };

    const toggleModalCare = () => {
        setModalCare(!isModalCare);

        const config: any = {
            duration: 300,
            toValue: isModalCare ? 0 : 1,
            useNativeDriver: true
        };
        Animated.timing(animationController, config).start();
        LayoutAnimation.configureNext(toggleAnimation); 
    };

    const toggleModalMeasurements = () => {
        setModalMeasurements(!isModalMeasurements);

        const config: any = {
            duration: 300,
            toValue: isModalMeasurements ? 0 : 1,
            useNativeDriver: true
        };
        Animated.timing(animationController, config).start();
        LayoutAnimation.configureNext(toggleAnimation); 
    };

    const toggleModalDelivery = () => {
        setModalDelivery(!isModalDelivery);

        const params = {
            data: delivery
        };
        
        navigation.navigate('DeliveryReturnsPage', { screen: 'DeliveryReturnsPage', params: params });
    };

    const changeProductId = (item: any) => {
        navigation.push('ProductDetailPage', { product_id: item })
    }

    const selectProductId = async (item: any) => {
        await setModalDetails(!isModalDetails);
        await changeProductId(item);
    }

    const fetchData = async (product_id: any) => {

        const params = {
            product_id: product_id,
            id_shop: session.country.id_shop,
            lang: 1,
            full: 1,
        }

        const response = await ProductService.getProduct(params);
        const json = await response.json();

        const screenWidth = Dimensions.get('window').width;

        Image.getSize(json.data.image_url[0], (width, height) => {

            setImageHeight(height * screenWidth / width);
        });

        setProduct(json.data);

        const images: any = json.data.image_url;

        let temp: any = []

        if (json.data.image_url) {
            json.data.image_url.map((image: any) => {

                temp = [...temp, <CarouselItem imageHeight={imageHeight} uri={image} />]
            })
        }

        setCarouselItems(temp);
        setImagesOnly([...images.map((url: any) => { return { uri: url } })]);

        if (json.data.video_url) {
            images.push(json.data.video_url);
            setVimeoUrl(json.data.video_url);
        }

        if (json.data.attribute_list && json.data.attribute_list.length > 0) {
            setHasSize(true);
        }

        setImages(images);
        setAttribute(json.data.attribute_list)
        setColorRelated(json.data.color_related)
        setDetails(json.data.description)
        setCare(json.data.care.content)
        setDelivery(json.data.delivery_returns.content)
        setReference(json.data.reference)
        setShownHere(json.data.shown_here_with)
        setMeasurements(json.data.measurements)
        setStyleItWith(json.data.style_it_with)
        setMotherDaughter(json.data.mother_daughter_with)
        setQuantityAvailable(json.data.quantity)
        setIsLoading(true)
    }

    const addToCartF = (id_product_attribute = null) => {

        setType('cart');

        if (hasSize) {
            if (!sizeSelected && !id_product_attribute) {
                bottomSheetRef.current?.snapToIndex(0);
                setBackdropVisible(true);
                return;
            }
        }

        const params = {
            id_product: product.id,
            id_product_attribute: id_product_attribute ? id_product_attribute : sizeSelected,
            quantity: 1
        }

        dispatch(addToCart(params));
    }

    const addtoWishlist = async (id_product_attribute = null, item: any) => {

        if (session.user == null) {
            return GeneralService.toast({ description: 'To use Wishlist function, please log in to your account.' });
        }

        setType('wishlist');

        const idProducts = item.map((res: any) => res.id_product);
        const uniqueIdProducts = idProducts.filter((value: any, index: any, self: any) => {
            return self.indexOf(value) === index;
        });

        if (wishlist.id_product.length > 0) {
            const check = uniqueIdProducts.length > 0 ? uniqueIdProducts.toString() : product.id;
            const filter = wishlist.data.product_list.find((res: any) => res.id_product === check);

            if (filter != undefined) {
                const params = {
                    id_product: filter.id_product,
                    id_product_attribute: filter.id_product_attribute,
                }

                await dispatch(delWishlist(params))
                return;
            }
        }

        if (hasSize) {
            if (!sizeSelected && !id_product_attribute) {
                bottomSheetRef.current?.snapToIndex(0);
                setBackdropVisible(true);
                return;
            }
        }

        const params = {
            id_product: product.id,
            id_product_attribute: id_product_attribute ? id_product_attribute : sizeSelected,
            quantity: 1
        }

        await dispatch(addToWishlist(params));
    }

    const styleItaddtoWishlist = async (id_product_attribute = null, item: any) => {

        if (Array.isArray(item.attribute_list)) {
            if (item.attribute_list.length > 0) {
                if (!id_product_attribute) {
                    bottomSheetRef.current?.snapToIndex(0);
                    return;
                }
            }
        }


        const params = {
            id_product: item.id_product,
            id_product_attribute: id_product_attribute ? id_product_attribute : 0,
            quantity: 1
        }

        await dispatch(addToWishlist(params));
        // await dispatch(getWishList())
    }

    const shareUrl = async () => {
        const url = WEB_URL + 'en/home/' + product.id + '-' + product.link_rewrite;
        await Share.share({
            message: url,
        });
    }

    const price = () => {
        const oldPrice = parseFloat(product.price_without_reduction)
        const newPrice = parseFloat(product.price)
        if (oldPrice > newPrice) {
            return <>
                <View style={{ flexDirection: 'row' }}>
                    <Text color={'gray.400'} strikeThrough fontSize={18}>{session.country.currency_sign} {product.price_without_reduction}</Text><Text style={{ color: 'red' }} bold fontSize={18}> {session.country.currency_sign} {product.price}</Text>
                </View>
            </>
        } else {
            return <Text color='black' bold fontSize={18}>{session.country.currency_sign} {product.price}</Text>
        }
    }

    const chooseColor = (item: any) => {
        if (item !== route.params.product_id) {
            navigation.push('ProductDetailPage', { product_id: item })
        }
    }

    const htmlContent = (data: any) => {
        return `   
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0 20px;
                    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    // background: red;
                }
                ul {
                    padding: 0;

                }
                li { 
                    // font-size: 100; 
                    list-style: none;
                } 
                li:before { 
                    color: #1cad48; 
                    content: "\\2022"; 
                    display: inline-block;
                    width: 1em; 
                    font-weight: bold; 
                    font-size: 40;
                } 
                p { 
                    font-size: 30 ;
                    // padding-left: 20px;
                }
            </style>    
        </head>

        <body>
            <div>
                ` + data + `
            </div>
        </body>
        </html>

    `
    }

    const injectedJavaScript = `
        window.ReactNativeWebView.postMessage(
            Math.max(
            document.body.scrollHeight, 
            document.documentElement.scrollHeight, 
            document.body.offsetHeight, 
            document.documentElement.offsetHeight, 
            document.body.clientHeight, 
            document.documentElement.clientHeight
            ).toString()
        );
        true;
    `;

    const handleWebViewMessage = (event: any) => {
        setHeightDetails(parseInt(event.nativeEvent.data));
    };

    useEffect(() => {
        setIsLoading(false);
        dispatch(getCart());
        fetchData(route.params.product_id).catch(console.error);

    }, [])


    const openImagePreview = () => {

        if (currentImageIndex < (imagesOnly.length)) {
            setImagePreviewShow(true);
        }

    }

    const handleScroll = (event: any) => {
        const positionX = event.nativeEvent.contentOffset.x;
        const positionY = event.nativeEvent.contentOffset.y;

        scrollPosition.current = positionY;
    };

    return (
        <>
            {isFocus &&
                <View style={styles.container}>
                    <StoreAvailabilityModal
                        visible={isModalStore}
                        onToggle={toggleModalStore}
                        size={attribute}
                        reference={product.reference}
                        product={product}
                    />

                    <SizeGuideModal
                        visible={isModalSizeGuide}
                        onToggle={toggleModalSizeGuide}
                    />

                    <ImageView
                        images={imagesOnly}
                        imageIndex={currentImageIndex}
                        visible={imagePreviewShow}
                        onRequestClose={() => setImagePreviewShow(false)}
                    />

                    {isLoading &&
                        <>
                            <Flex flex={1} flexDirection="column" backgroundColor='white' margin={0} style={{ position: 'relative' }}>
                                <ScrollView flex={1} ref={ref => { setRef(ref as any); }} onScroll={handleScroll}>
                                    <VStack h={imageHeight} alignItems="center"  >
                                        {carouselItems && <>
                                            <Carousel
                                                loop={false}
                                                width={win.width}
                                                height={imageHeight}
                                                // autoPlay={true}
                                                data={images}
                                                scrollAnimationDuration={100}
                                                // onScrollBegin={() => { GeneralService.toast({ title: 'xxx' }) }}
                                                onSnapToItem={(index) => {
                                                    setCurrentImageIndex(index)
                                                    if (index == imagesOnly.length) {
                                                        ref.scrollTo({
                                                            y: scrollPosition.current + 1
                                                        })
                                                    }
                                                }}
                                                panGestureHandlerProps={{
                                                    activeOffsetX: [-10, 10],
                                                    failOffsetY: [-10, 10],
                                                  }}
                                                renderItem={({ index }) => <CarouselItem key={index} imageHeight={imageHeight} uri={images[index]}
                                                    openPreview={openImagePreview}
                                                />}
                                            />

                                            <Pagination
                                                dotsLength={images.length}
                                                activeDotIndex={currentImageIndex}
                                                containerStyle={styles.paginationContainer}
                                                dotStyle={styles.dot}
                                                inactiveDotStyle={styles.inactiveDot}
                                                inactiveDotOpacity={0.6}
                                                inactiveDotScale={0.8}
                                            />

                                            
                                        </>}
                                        {/* <SliderBox
                                            LoaderComponent={() => <></>}
                                            sliderBoxHeight={imageHeight}
                                            resizeMethod={'resize'}
                                            resizeMode={'cover'}
                                            ImageComponent={(props: any) => <SliderItem imageHeight={imageHeight} {...props} />}
                                            images={images} /> */}
                                    </VStack>

                                    <VStack px={4} pt={4} backgroundColor={'white'} >
                                        <Text color={'black'} fontSize={18}>{product.name}</Text>
                                        {price()}
                                        {product.discount_text != null && <Text px={3} py={1} style={{ color: 'white', fontSize: 10, backgroundColor: 'black', textAlign: 'center' }}>{product.discount_text}</Text>}

                                        {quantityAvailable == 0 && <Text style={{ color: '#a94442', fontSize: 18, marginTop: 20, }}>This product is not available.</Text>}

                                        {attribute.length > 0 && quantityAvailable > 0 &&
                                            <>
                                                <Text color={'black'} bold mt={5} mb={2}>Select Size: </Text>
                                                <SizeList attribute={attribute} setSizeSelected={setSizeSelected} sizeSelected={sizeSelected}></SizeList>

                                                <TouchableOpacity onPress={toggleModalSizeGuide} >
                                                    <Text underline color={'#1cad48'} alignItems="center" style={{ paddingRight: 5 }} my='1' > Size Guide </Text>
                                                </TouchableOpacity>
                                            </>
                                        }

                                        <TouchableOpacity onPress={toggleModalStore} >
                                            <HStack>
                                            <Text underline color={'#1cad48'} alignItems="center" style={{ paddingRight: 1 }} mb={6} my='1'> Check in store availability</Text>
                                            {/* <Icons name={'store'}  size={22} color={'#1cad48'} style={{ paddingTop: 4 }}/> */}
                                            </HStack>
                                            
                                        </TouchableOpacity>  

                                        {colorRelated &&
                                            <>
                                                <Text bold color={'black'} alignItems="center" mb={2}> Colours</Text>
                                                <ScrollView horizontal={true}>
                                                    <HStack mb={4}>
                                                        {colorRelated && colorRelated.map((res: any) => {
                                                            return <TouchableOpacity onPress={() => chooseColor(res.id_product)} key={res.id_color + '_' + 1} disabled={res.id_product === route.params.product_id ? true : false}>
                                                                <Image style={styles.tinyLogo} source={{ uri: res.image_color_url }} />
                                                            </TouchableOpacity>
                                                        })}
                                                    </HStack>
                                                </ScrollView>
                                            </>
                                        }
                                    </VStack>

                                    <View>
                                        <TouchableOpacity activeOpacity={1} onPress={toggleModalDetails}>
                                            <HStack style={ !isModalDetails ? styles.bottomLine : styles.noBottomLine }>
                                                <Box width={'90%'} backgroundColor='red' pt={1}>
                                                    <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 10 }}>Details</Text>
                                                </Box>
                                                <Box width={'10%'} backgroundColor='red'>
                                                    { !isModalDetails ? <IonIcon name={'chevron-forward-outline'} size={30} color="#333"/> : <IonIcon name={'chevron-down-outline'} size={30} color="#333"/> }
                                                </Box>
                                            </HStack>
                                        </TouchableOpacity>

                                        {isModalDetails && 
                                            <VStack style={styles.openBottomLine}>
                                                <View style={{ flex: 1 }}>
                                                    {details &&
                                                        <>
                                                            <View style={{ marginHorizontal: 20 }}>
                                                                <ScrollView>
                                                                    <AutoHeightWebView
                                                                        source={{ html: htmlContent(details) }}
                                                                        injectedJavaScript={injectedJavaScript}
                                                                        onMessage={handleWebViewMessage}
                                                                        style={{ width: '100%'}}
                                                                        startInLoadingState={true}
                                                                        scrollEnabled={false}
                                                                    />
                                                                    <HStack>
                                                                        <View>
                                                                            {shownHere &&
                                                                                <>
                                                                                    <Text fontSize={15} color={'black'} mt={4}>Shown here with:</Text>
                                                                                    <View>
                                                                                        {shownHere.map((res: any) => {
                                                                                            return <Chip
                                                                                                key={res.id_product + '_' + 2}
                                                                                                icon={() => null}
                                                                                                mode='outlined'
                                                                                                style={styles.shown}
                                                                                                onPress={() => selectProductId(res.id_product)}
                                                                                            >
                                                                                                <Text style={styles.shownText}>{res.name}</Text>
                                                                                            </Chip>
                                                                                        })}
                                                                                    </View>
                                                                                </>
                                                                            }

                                                                            {motherDaughter &&
                                                                                <>
                                                                                    <Text fontSize={15} color={'black'}>Shop Mother & Daughter:</Text>
                                                                                    <View>
                                                                                        {motherDaughter.map((res: any) => {
                                                                                            return <Chip
                                                                                                key={res.id_product + '_' + 3}
                                                                                                icon={() => null}
                                                                                                mode='outlined'
                                                                                                style={styles.shown}
                                                                                                onPress={() => selectProductId(res.id_product)}
                                                                                            >
                                                                                                <Text style={styles.shownText}>{res.name}</Text>
                                                                                            </Chip>
                                                                                        })}
                                                                                    </View>
                                                                                </>
                                                                            }
                                                                            <Text color={'black'}>Reference Number: {reference}</Text>
                                                                        </View>
                                                                    </HStack>
                                                                </ScrollView>
                                                            </View>
                                                        </>
                                                    }
                                                </View>
                                            </VStack>
                                        }
                                    

                                        <TouchableOpacity activeOpacity={1} onPress={toggleModalMeasurements}>
                                            <HStack style={ !isModalMeasurements ? styles.bottomLine : styles.noBottomLine }>
                                                <Box width={'90%'} backgroundColor='red' pt={1}>
                                                    <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 10, }}>Measurements</Text>
                                                </Box>
                                                <Box width={'10%'} backgroundColor='red'>
                                                { !isModalMeasurements ? <IonIcon name={'chevron-forward-outline'} size={30} color="#333"/> : <IonIcon name={'chevron-down-outline'} size={30} color="#333"/> }
                                                </Box>
                                            </HStack>
                                        </TouchableOpacity>

                                        {isModalMeasurements && 
                                            <VStack style={styles.openBottomLine}>
                                                <View style={{ flex: 1 }}>
                                                    {measurements &&
                                                        <>
                                                            <View style={{ marginHorizontal: 20 }}>
                                                                <ScrollView>
                                                                    <AutoHeightWebView
                                                                        source={{ html: htmlContent(measurements) }}
                                                                        injectedJavaScript={injectedJavaScript}
                                                                        style={{ width: '100%'}}
                                                                        startInLoadingState={true}
                                                                        scrollEnabled={false}
                                                                    />
                                                                </ScrollView>
                                                            </View>
                                                        </>
                                                    }
                                                </View>
                                            </VStack>
                                        }

                                        <TouchableOpacity activeOpacity={1} onPress={toggleModalCare}>
                                            <HStack style={ !isModalCare ? styles.bottomLine : styles.noBottomLine }>
                                                <Box width={'90%'} backgroundColor='red' pt={1}>
                                                    <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 10 }}>Care</Text>
                                                </Box>
                                                <Box width={'10%'} backgroundColor='red'>
                                                    { !isModalCare ? <IonIcon name={'chevron-forward-outline'} size={30} color="#333"/> : <IonIcon name={'chevron-down-outline'} size={30} color="#333"/> }
                                                </Box>
                                            </HStack>
                                        </TouchableOpacity>

                                        {isModalCare &&
                                           <VStack style={styles.openBottomLine}>
                                                 <View style={{ flex: 1 }}>
                                                    {care &&
                                                        <>
                                                            <View style={{ marginHorizontal: 20 }}>
                                                                <ScrollView>
                                                                    <AutoHeightWebView
                                                                        source={{ html: htmlContent(care) }}
                                                                        injectedJavaScript={injectedJavaScript}
                                                                        onMessage={handleWebViewMessage}
                                                                        style={{ width: '100%'}}
                                                                        startInLoadingState={true}
                                                                        scrollEnabled={false}
                                                                    />
                                                                </ScrollView>
                                                            </View>
                                                        </>
                                                    }
                                                </View>
                                            </VStack>
                                        }

                                        <TouchableOpacity activeOpacity={1} onPress={toggleModalDelivery}>
                                            <HStack style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, padding: 10 }}>
                                                <Box width={'90%'} backgroundColor='red' pt={1}>
                                                    <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 10, }}>Delivery & Returns</Text>
                                                </Box>
                                                <Box width={'10%'} backgroundColor='red'>
                                                    <IonIcon
                                                        name={'chevron-forward-outline'}
                                                        size={30}
                                                        color="#333"
                                                    />
                                                </Box>
                                            </HStack>
                                        </TouchableOpacity>
                                    </View>

                                    {styleItWith &&
                                        <>
                                            <VStack pt={4} >
                                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10 }}>
                                                    <Box w={'20%'} flex={1} justifyContent="center">
                                                        <Divider style={styles.divider} />
                                                    </Box>
                                                    <Box w={'60%'}>
                                                        <Text style={styles.levelup}> Style it with</Text>
                                                    </Box>
                                                    <Box w={'20%'} flex={1} justifyContent="center">
                                                        <Divider style={styles.divider} />
                                                    </Box>
                                                </View>
                                                <HStack>
                                                    <ScrollView horizontal={true}>
                                                        {styleItWith && styleItWith.map((res: any) => {
                                                            return <Box w={200} key={res.id_product + '_' + 4}>
                                                                <ProductCard product={res} route={changeProductId} openWishlist={styleItaddtoWishlist} hideWishlist={true}></ProductCard>
                                                            </Box>
                                                        })}
                                                    </ScrollView>
                                                </HStack>
                                            </VStack>
                                        </>
                                    }
                                </ScrollView>

                                <Flex direction='row' style={styles.footerWrapper}>
                                    <IconButton size='lg' variant="ghost" onPress={() => addtoWishlist(null, attribute)} _pressed={{ backgroundColor: "white" }}>
                                        <Wishlist like={wishlist.id_product.includes(route.params.product_id)} size={26}></Wishlist>
                                    </IconButton>
                                    <IconButton size='lg' variant="ghost"
                                        _icon={{
                                            color: "black",
                                            as: IonIcon,
                                            name: "share-social-outline",
                                            size: 'xl'
                                        }}
                                        onPress={shareUrl}
                                        _pressed={{
                                            backgroundColor: "white"
                                        }}
                                    />
                                    <Box style={styles.addtoCartWrapper}>
                                        <Button isDisabled={quantityAvailable == 0 ? true : false}
                                            onPress={() => addToCartF()}
                                            style={styles.addtoCartBtn}
                                            isLoading={cart.cartLoading}
                                            isLoadingText="ADD TO CART">
                                            ADD TO CART
                                        </Button>
                                    </Box>
                                </Flex>
                            </Flex>
                        </>
                    }
                    {!isLoading && <SkeletonProductDetails />}

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
                    // backgroundStyle={{shadowColor: '#ccc', shadowOpacity: 0.5 }}
                    >
                        <View style={styles.contentContainer}>
                            <Text color={'black'} bold mb={2}>Select Size: </Text>
                            <SizeList attribute={attribute} setSizeSelected={(size: any) => setSizeSelectedModal(size)} sizeSelected={sizeSelected}></SizeList>
                        </View>
                    </BottomSheet>
                </View>
            }
        </>
    );

}

const styles = StyleSheet.create({
    footerWrapper: {
        backgroundColor: 'white',
        height: 60
    },
    footerIconWrapper: {
        padding: 6
    },
    addtoCartWrapper: {
        flexGrow: 1,
        padding: 6
    },
    addtoCartBtn: {
        backgroundColor: '#1cad48',
        borderRadius: 30,
        height: '100%',
        marginRight: 5,
    },
    chip: {
        marginHorizontal: 2,
        backgroundColor: '#fff',
        color: '#000',
        width: win.width / 7
    },
    text: {
        flexDirection: 'row',
        fontSize: 13,
        color: 'black',
    },
    tinyLogo: {
        width: 45,
        height: 45,
        borderRadius: 40,
        marginHorizontal: 2,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    accordianTitle: {
        color: 'black',
        paddingLeft: 0,
        marginLeft: 0,
    },
    accordian: {
        backgroundColor: 'white',
    },
    shown: {
        borderColor: '#1cad48',
        marginVertical: 4,
        borderRadius: 20,
    },
    shownText: {
        color: '#1cad48',
    },

    headerText: {
        color: 'black',
        fontSize: 18,
        padding: 26,
    },
    footer: {
        flex: 1,
        backgroundColor: 'pink',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    divider: {
        // backgroundColor: '#d1f456',
        backgroundColor: '#1cad48',
        height: 5,
    },
    levelup: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        textTransform: 'uppercase',
        paddingVertical: 10,
        position: 'relative',
        borderRadius: 10,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        // alignItems: 'center',
        padding: 15
    },
    bottomLine: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10
    },
    noBottomLine: {
        paddingLeft: 10,
        paddingRight: 10,
        // paddingBottom: 10,
        paddingTop: 10
    },
    openBottomLine: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        // paddingTop: 10
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 2.0)'
    },
    inactiveDot: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
});
