import React, { useEffect } from 'react';
import { Box, HStack, IconButton, StatusBar, Text, Center, Flex, VStack, Image, AspectRatio, Button, Backdrop } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { delToCart, getCart } from '../../Redux/Slices/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/Feather';
import GeneralService from '../../Services/GeneralService';
import { addToWishlist, delWishlist } from '../../Redux/Slices/Wishlist';
import IonIcon from 'react-native-vector-icons/Ionicons';

const win = Dimensions.get('window');

export default function CartList({ product, openUpdateCart }: any) {

    const { navigate } = useNavigation<any>();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const cart = useSelector((storeState: any) => storeState.cart);
    const session = useSelector((storeState: any) => storeState.session);

    const goToProductPage = () => {

        const params = {
            product_id: product.id_product
        };

        navigate('ProductDetailPage', params);
    }

    useEffect(() => {

    }, [])

    const deleteCart = async (product: any) => {

        const params = {
            id_cart: cart.id_cart,
            id_product: product.id_product,
            id_product_attribute: product.id_product_attribute,
        }


        await dispatch(delToCart(params))
        await dispatch(getCart())
    }


    const alertDelete = (product: any) => {

        Alert.alert('Remove product from  cart?', '', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => deleteCart(product)
            },
        ]);
    }

    const addtoWishlist = async (id_product: any, id_product_attribute: any, quantity: any) => {

        if (session.user == null) {
            return GeneralService.toast({ description: 'To use Wishlist function, please log in to your account.' });
        }

        const params = {
            id_product: id_product,
            id_product_attribute: id_product_attribute,
            quantity: quantity
        }

        await dispatch(addToWishlist(params));
        await dispatch(getCart())
    }

    const updateCart = (id : any) => {

        openUpdateCart(id)
    }

    return (
        <>
            <TouchableOpacity onPress={goToProductPage}>
                <Flex style={styles.container}>
                    <Box w={100}>
                        <AspectRatio ratio={2 / 3}>
                            <Image resizeMode="cover" source={{
                                uri: product.image_url
                            }} alt="image" />
                        </AspectRatio>
                    </Box>
                    <Box flexGrow={1} width={1} pl={4}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text color='black' bold fontSize={14} w={'96%'}>{product.name}</Text>
                            {/* <View style={styles.closeIcon}>
                                <IconButton
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    size={'xs'}
                                    onPress={() => alertDelete(product)}
                                    icon={<Icon name="x" size={16} color="black" />}
                                />
                            </View> */}
                        </View>

                        {product.price_wt > 0 && <Text color='black' bold fontSize={13}>{session.country.currency_sign} {product.price_wt}</Text>}
                        {product.price_wt <= 0 && <Text color='black' bold fontSize={13}>Free</Text>}

                        <HStack my={1.5}>
                            <Box >
                                {product.attributes_small && (
                                    <Text color='black' fontSize={12}>Size: {product.attributes_small}</Text>
                                )}
                                <Text color='black' fontSize={12}>Ref No: {product.reference}</Text>
                                <Text color='black' fontSize={12}>Quantity: {product.quantity}</Text>
                            </Box>
                        </HStack>

                        <HStack>
                            {/* <Box w={'25%'} mr={2}>
                                <Button variant="outline" bg="transparent" _text={{ color: "black" }} size="xs" borderColor={"#ccc"} onPress={() => updateCart(product.id_product)}>Update</Button>
                            </Box> */}
                            <Box w={'80%'}>
                                <Button style={styles.btnAddtoCart} variant="outline" bg="transparent" _text={{ color: "black", fontSize: 11 }} size="xs" borderColor={"#ccc"} onPress={() => addtoWishlist(product.id_product, product.id_product_attribute, product.quantity)}>Move to Wishlist</Button>
                            </Box>
                            <Box w={'20%'} px={1}>
                            <IconButton
                                size={'sm'}
                                onPress={() => alertDelete(product)}
                                style={styles.delete}
                                icon={<IonIcon name="trash-outline" size={21} color="black" />}
                            />
                        </Box>
                        </HStack>
                    </Box>
                </Flex>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: win.width,
        padding: 10
    },
    delete: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black'
    },
    closeIcon: {
        width: 28,
        height: 28,
        backgroundColor: '#eee',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnAddtoCart: {
        width: '60%',
        flexDirection: 'row'
    },
});