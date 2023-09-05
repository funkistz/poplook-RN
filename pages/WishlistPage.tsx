import { useIsFocused } from "@react-navigation/native";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Center, Flex, ScrollView, Text } from "native-base";
import { useEffect } from "react";
import { StyleSheet, View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import WishlistList from "../components/Wishlist/WishlistList";
import { getWishList } from "../Redux/Slices/Wishlist";


export default function WishlistPage ({ route , navigation} : { route: any,  navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const isFocused = useIsFocused();

    const wishlist = useSelector((storeState: any) => storeState.wishlist);

    useEffect(() => {

        if (isFocused) {
            dispatch(getWishList())
        }

    }, [])

    useEffect(() => {        

    }, [wishlist])

    return <>
        { wishlist.id_product.length > 0 &&
            <>
                <Center backgroundColor="white">
                    <ScrollView height="100%" mt={5} mb={10}>
                        {wishlist && wishlist.data && wishlist.data.product_list &&
                            (wishlist.data.product_list.map((product: any, index: any) => {
                                return <WishlistList key={index} product={product} currency={wishlist.data.currency}></WishlistList>
                            })
                            )
                        }

                    </ScrollView>
                </Center>
            </>
        }

        { wishlist.id_product.length == 0 &&
            <>
                <View style={{flex:1,justifyContent: "center",alignItems: "center", backgroundColor: 'white'}}>
                    <View style={{flexDirection: 'row', marginBottom: 2}}>
                        <Text color='black' bold fontSize={20}>No Items saved.</Text>
                    </View>
                    <Text color='black' fontSize={13}>There are no saved product.</Text>
                </View>

            </>
        }
    </>
}