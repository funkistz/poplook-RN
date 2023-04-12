import { StyleSheet, View, Dimensions, Image, TouchableOpacity, Share, PixelRatio, Modal, Animated } from 'react-native';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { VStack, HStack, Center, Flex, Spacer, Box, ScrollView, Button, IconButton, Text, Divider } from 'native-base';
import ProductService from '../Services/ProductService';
import { SliderBox } from "react-native-image-slider-box";
import SliderItem from '../components/Products/SliderItem';
import { addToCart, getCart } from '../Redux/Slices/Cart';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Chip } from 'react-native-paper';
import Wishlist from '../components/wishlist';
import WebView from 'react-native-webview';
import Accordion from '../components/Accordian';
import StoreAvailabilityModal from '../components/Modals/StoreAvailability';
import SkeletonProductDetails from '../components/SkeletonProductDetails';
import SizeList from '../components/Products/SizeList';
import ProductCard from '../components/Products/ProductCard';
import { background, color } from 'native-base/lib/typescript/theme/styled-system';
import BottomSheet from '@gorhom/bottom-sheet';
import { WEB_URL } from "@env"
import IonIcon from 'react-native-vector-icons/Ionicons';
import { addToWishlist, getWishList } from '../Redux/Slices/Wishlist';

const win = Dimensions.get('window');

export default function ProductDetailPage({ route, navigation, product_id }: any) {


    // Details
    const [product, setProduct] = useState<any>({});
    const [images, setImages] = useState<any>([]);
    const [attribute, setAttribute] = useState([]);
    const [colorRelated, setColorRelated] = useState([]);
    const [shownHere, setShownHere] = useState<any>([]);
    const [imageHeight, setImageHeight] = useState<any>(0);
    const [isLoading, setIsLoading] = useState<any>(false);
    const [details, setDetails] = useState<any>('');
    const [measurements, setMeasurements] = useState<any>([]);
    const [care, setCare] = useState<any>('');
    const [delivery, setDelivery] = useState<any>('');
    const [reference, setReference] = useState<any>('');
    const [styleItWith, setStyleItWith] = useState<any>([]);
    const [motherDaughter, setMotherDaughter] = useState<any>([]);

    // Webview
    const [heightDetails, setHeightDetails] = useState<any>(0);;

    // Redux
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const wishlist = useSelector((storeState: any) => storeState.wishlist);

    // Modal
    const [isModalStore, setModalStore] = useState(false);
    const [isModalDetails, setModalDetails] = useState(false);
    const [isModalDelivery, setModalDelivery] = useState(false);
    const [isModalCare, setModalCare] = useState(false);
    const [isModalMeasurements, setModalMeasurements] = useState(false);

    // Bottom sheet
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['30%', '50%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // Size data
    const [hasSize, setHasSize] = useState<any>(false);
    const [type, setType] = useState<any>();
    const [sizeSelected, setSizeSelected] = useState<any>();
    const setSizeSelectedModal = async (size: any) => {
        bottomSheetRef.current?.close();
        if(type == 'cart') {
            await addToCartF(size);
        } else {
            await addtoWishlist(size)
            await dispatch(getWishList())
        }
        setSizeSelected(size);
    }

    // Toggle
    const toggleModalStore = () => {
        setModalStore(!isModalStore);
    };
    const toggleModalDetails = () => {
        setModalDetails(!isModalDetails);
    };
    const toggleModalCare = () => {
        setModalCare(!isModalCare);
    };
    const toggleModalMeasurements = () => {
        setModalMeasurements(!isModalMeasurements);
    };
    const toggleModalDelivery = () => {
        setModalDelivery(!isModalDelivery);
    };

    const changeProductId = (item: any) => {
        fetchData(item).catch(console.error);
        setIsLoading(false)
    }

    const selectProductId = async (item:any) => {
        await setModalDetails(!isModalDetails);
        setIsLoading(true)
        await changeProductId(item);
    }

    const fetchData = async (product_id: any) => {
        // const params = route.params;
        const params = {
            product_id: product_id,
            id_shop: 1,
            lang: 1,
            full: 1,
        }

        const response = await ProductService.getProduct(params);
        const json = await response.json();

        console.log('jsonn: ', json);

        const screenWidth = Dimensions.get('window').width;

        Image.getSize(json.data.image_url[0], (width, height) => {
            // console.log('image size', height * screenWidth / width);
            setImageHeight(height * screenWidth / width);
        });

        setProduct(json.data);

        // console.log('Products: ', json.data)

        const images: any = json.data.image_url;

        if (json.data.video_url) {
            images.push(json.data.video_url);
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
        console.log('setIt: ', json.data.style_it_with)
        setMotherDaughter(json.data.mother_daughter_with)
        setIsLoading(true)
    }

    const addToCartF = (id_product_attribute = null) => {

        setType('cart');

        if (hasSize) {
            if (!sizeSelected && !id_product_attribute) {
                bottomSheetRef.current?.snapToIndex(0);
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

    const addtoWishlist = async (id_product_attribute = null) => {

        setType('wishlist');

        if (hasSize) {
            if (!sizeSelected && !id_product_attribute) {
                bottomSheetRef.current?.snapToIndex(0);
                return;
            }
        }

        const params = {
            id_product: product.id,
            id_product_attribute: id_product_attribute ? id_product_attribute : sizeSelected,
            quantity: 1
        }

        await dispatch(addToWishlist(params));
        await dispatch(getWishList())
    }

    const styleItaddtoWishlist = async (id_product_attribute = null, item:any) => {

        // setAttributeList(item)    

        console.log('item', item)
        console.log('asdas: ',Array.isArray(item.attribute_list))

        // if() {

        // }

        if(Array.isArray(item.attribute_list)) {
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
        await dispatch(getWishList())
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
                    <Text style={{ color: 'gray' }} bold strikeThrough fontSize={18}>RM {product.price_without_reduction}</Text><Text style={{ color: 'red' }} bold fontSize={18}> RM {product.price}</Text>
                </View>
            </>
        } else {
            return <Text color='black' bold fontSize={18}>RM {product.price}</Text>
        }
    }

    const chooseColor = (item: any) => {
        fetchData(item).catch(console.error);
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
                ` + data +`
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

    const handleWebViewMessage = (event:any) => {
        setHeightDetails(parseInt(event.nativeEvent.data));
    };

    useEffect(() => {
        setIsLoading(false);
        dispatch(getCart());
        setHeightDetails(400)

        fetchData(route.params.product_id).catch(console.error);

    }, [])


    return (
        <View style={styles.container}>
            <StoreAvailabilityModal
                visible={isModalStore}
                onToggle={toggleModalStore}
                size={attribute}
                reference={product.reference}
                product={product}
            />

            {isLoading &&
                <>
                    <Flex flex={1} flexDirection="column" backgroundColor='white' margin={0}>
                        <ScrollView flex={1}>
                            <VStack h={500} alignItems="center"  >
                                <SliderBox
                                    LoaderComponent={() => <></>}
                                    sliderBoxHeight={imageHeight}
                                    resizeMethod={'resize'}
                                    resizeMode={'cover'}
                                    ImageComponent={(props: any) => <SliderItem imageHeight={imageHeight} {...props} />}
                                    images={images} />
                            </VStack>

                            <VStack px={4} pt={4} backgroundColor={'white'} >
                                <Text color={'black'} fontSize={18}>{product.name}</Text>
                                {price()}
                                {attribute.length > 0 &&
                                    <>
                                        <Text color={'black'} bold mt={5} mb={2}>Select Size: </Text>
                                        <SizeList attribute={attribute} setSizeSelected={setSizeSelected} sizeSelected={sizeSelected}></SizeList>
                                    </>
                                }

                                <TouchableOpacity onPress={toggleModalStore} >
                                    <Text underline color={'#1cad48'} alignItems="center" style={{ paddingRight: 5 }} my='1' mb={6} mt={6}> Check in store availability </Text>
                                </TouchableOpacity>

                                {colorRelated &&
                                    <>
                                        <Text bold color={'black'} alignItems="center" mb={2}> Colours</Text>
                                        <ScrollView horizontal={true}>
                                            <HStack mb={4}>
                                                {colorRelated && colorRelated.map((res: any, index: any) => {
                                                    return <>
                                                        <TouchableOpacity onPress={() => chooseColor(res.id_product)} key={index}>
                                                            <Image style={styles.tinyLogo} source={{ uri: res.image_color_url }} />
                                                        </TouchableOpacity>

                                                    </>
                                                })}
                                            </HStack>
                                        </ScrollView>
                                    </>
                                }


                            </VStack>

                            <VStack space={4} paddingBottom={5}>
                                <View>
                                    <TouchableOpacity activeOpacity={1} onPress={toggleModalDetails}>
                                        <HStack style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, padding: 10, }}>
                                            <Box width={'90%'} backgroundColor='red' pt={1}>
                                                <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 10, }}>Details</Text>
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

                                    <Modal
                                        presentationStyle='formSheet'
                                        animationType="slide"
                                        transparent={false}
                                        visible={isModalDetails}
                                        onRequestClose={toggleModalDetails}
                                    >
                                        <View style={{ flex: 1, paddingVertical: 20}}>
                                            <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 18, paddingBottom: 5 }}>Details</Text>
                                            <Divider style={{ width: '95%', alignSelf: 'center', backgroundColor: '#ccc' }}></Divider>
                                            {details &&
                                                <>
                                                    <View>
                                                        <ScrollView>
                                                            <WebView 
                                                                source={{ html: htmlContent(details) }}
                                                                injectedJavaScript={injectedJavaScript}
                                                                onMessage={handleWebViewMessage}
                                                                style={{ height: heightDetails }}
                                                                startInLoadingState={true}
                                                            />
                                                            <HStack pl={4} mb={5}>
                                                                <View>
                                                                    {shownHere &&
                                                                        <>
                                                                            <Text fontSize={15} color={'black'}>Shown here with:</Text>
                                                                            <View style={{ marginVertical: 10 }}>
                                                                                {shownHere.map((res: any, index: any) => {
                                                                                    return <>
                                                                                        <Chip
                                                                                            key={index}
                                                                                            icon={() => null}
                                                                                            mode='outlined'
                                                                                            style={styles.shown}
                                                                                            onPress={() => selectProductId(res.id_product)}
                                                                                        >
                                                                                            <Text style={styles.shownText}>{res.name}</Text>
                                                                                        </Chip>
                                                                                    </>
                                                                                })}
                                                                            </View>
                                                                        </>
                                                                    }

                                                                    {motherDaughter &&
                                                                        <>
                                                                            <Text fontSize={15} color={'black'}>Shop Mother & Daughter:</Text>
                                                                            <View style={{ marginVertical: 10 }}>
                                                                                {motherDaughter.map((res: any, index: any) => {
                                                                                    return <>
                                                                                        <Chip
                                                                                            key={index}
                                                                                            icon={() => null}
                                                                                            mode='outlined'
                                                                                            style={styles.shown}
                                                                                            onPress={() => selectProductId(res.id_product)}
                                                                                        >
                                                                                            <Text style={styles.shownText}>{res.name}</Text>
                                                                                        </Chip>
                                                                                    </>
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
                                    </Modal>

                                    <TouchableOpacity activeOpacity={1} onPress={toggleModalMeasurements}>
                                        <HStack style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, padding: 10, }}>
                                            <Box width={'90%'} backgroundColor='red' pt={1}>
                                                <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 10, }}>Measurements</Text>
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
                                    <Modal
                                        presentationStyle='formSheet'
                                        animationType="slide"
                                        transparent={false}
                                        visible={isModalMeasurements}
                                        onRequestClose={toggleModalMeasurements}
                                    >
                                        <View style={{ flex: 1, paddingVertical: 20 }}>
                                            <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 18, paddingBottom: 5 }}>Measurements</Text>
                                            <Divider style={{ width: '95%', alignSelf: 'center', backgroundColor: '#ccc' }}></Divider>
                                            { measurements &&
                                                <>
                                                    <View>
                                                        <ScrollView>
                                                            <WebView
                                                                source={{ html: htmlContent(measurements) }}
                                                                injectedJavaScript={injectedJavaScript}
                                                                onMessage={handleWebViewMessage}
                                                                style={{ height: win.height - 150 }}
                                                                startInLoadingState={true}
                                                            />
                                                        </ScrollView>
                                                    </View>
                                                </>
                                            }
                                        </View>
                                    </Modal>

                                    <TouchableOpacity activeOpacity={1} onPress={toggleModalCare}>
                                        <HStack style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, padding: 10, }}>
                                            <Box width={'90%'} backgroundColor='red' pt={1}>
                                                <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 10, }}>Care</Text>
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
                                    <Modal
                                        presentationStyle='formSheet'
                                        animationType="slide"
                                        transparent={false}
                                        visible={isModalCare}
                                        onRequestClose={toggleModalCare}
                                        style={{ justifyContent: 'flex-end' }}
                                    >
                                        <View style={{ flex: 1, paddingVertical: 20 }}>
                                            <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 18, paddingBottom: 5 }}>Care</Text>
                                            <Divider style={{ width: '95%', alignSelf: 'center', backgroundColor: '#ccc' }}></Divider>
                                            { care &&
                                                <>
                                                    <View>
                                                        <ScrollView>
                                                            <WebView
                                                                source={{ html: htmlContent(care) }}
                                                                injectedJavaScript={injectedJavaScript}
                                                                onMessage={handleWebViewMessage}
                                                                style={{ height: win.height - 150 }}
                                                                startInLoadingState={true}
                                                            />
                                                        </ScrollView>
                                                    </View>
                                                </>
                                            }
                                        </View>
                                    </Modal>

                                    <TouchableOpacity activeOpacity={1} onPress={toggleModalDelivery}>
                                        <HStack style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, padding: 10, }}>
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
                                    <Modal
                                        presentationStyle='formSheet'
                                        animationType="slide"
                                        transparent={false}
                                        visible={isModalDelivery}
                                        onRequestClose={toggleModalDelivery}
                                    >
                                        <View style={{ flex: 1, paddingVertical: 20 }}>
                                            <Text bold style={{ color: 'black', fontSize: 16, paddingLeft: 18, paddingBottom: 5 }}>Delivery & Return</Text>
                                            <Divider style={{ width: '95%', alignSelf: 'center', backgroundColor: '#ccc' }}></Divider>
                                            { delivery &&
                                                <>
                                                    <View>
                                                        <ScrollView>
                                                            <WebView
                                                                source={{ html: htmlContent(delivery) }}
                                                                injectedJavaScript={injectedJavaScript}
                                                                onMessage={handleWebViewMessage}
                                                                style={{ height: win.height - 150 }}
                                                                startInLoadingState={true}
                                                            />
                                                        </ScrollView>
                                                    </View>
                                                </>
                                            }
                                        </View>
                                    </Modal>

                                </View>
                            </VStack>

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
                                                {styleItWith && styleItWith.map((res: any, index: any) => {
                                                    return <>
                                                        <Box w={200} key={index}>
                                                            <ProductCard product={res} route={changeProductId} openWishlist={styleItaddtoWishlist} hideWishlist={true}></ProductCard>
                                                        </Box>

                                                    </>
                                                })}
                                            </ScrollView>
                                        </HStack>
                                    </VStack>
                                </>
                            }



                        </ScrollView>

                        <HStack style={{ height: 60, paddingVertical: 5 }}  >
                            <IconButton size='lg' variant="ghost" width={win.width / 5} onPress={() => addtoWishlist()}>
                                <Wishlist like={wishlist.id_product.includes(route.params.product_id)} size={24}></Wishlist>
                            </IconButton>
                            <IconButton size='lg' variant="ghost" width={win.width / 5}
                                _icon={{
                                    color: "black",
                                    as: IonIcon,
                                    name: "share-social-outline",
                                    size: 'xl'
                                }}
                                onPress={shareUrl}
                            />
                            <Box w={win.width * 3 / 5}>
                                <Button onPress={() => addToCartF()} style={styles.addtoCartBtn}>
                                    ADD TO CART
                                </Button>
                            </Box>

                        </HStack>
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
                backgroundStyle={{shadowColor: '#ccc', shadowOpacity: 0.5}}
            >
                <View style={styles.contentContainer}>
                    <Text color={'black'} bold mb={2}>Select Size: </Text>
                    <SizeList attribute={attribute} setSizeSelected={(size:any) => setSizeSelectedModal(size)} sizeSelected={sizeSelected}></SizeList>
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
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
        width: 50,
        height: 45,
        borderRadius: 10,
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
        backgroundColor: '#d1f456',
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
    addtoCartBtn: {
        backgroundColor: '#1cad48',
        borderRadius: 30,
        height: '100%',
        marginRight: 5,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        // alignItems: 'center',
        padding: 20
    },
});