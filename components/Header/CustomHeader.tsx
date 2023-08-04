import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'native-base';
import SearchModal from '../Modals/Search';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getSearch, reset } from '../../Redux/Slices/Search';
import Wishlist from '../wishlist';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-paper';
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function CustomHeader() {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const product = useSelector((storeState: any) => storeState.search);
    const wishlist = useSelector((storeState: any) => storeState.wishlist);
    const session = useSelector((storeState: any) => storeState.session);
    const totalItem = useSelector((storeState: any) => storeState.cart.total_item);

    const [isModalVisible, setModalVisible] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [submit, setSubmit] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const openKeyword = (data: any, action: boolean) => {
        if (action) {
            setModalVisible(!isModalVisible);
            setKeyword(data)
            setSubmit(action)
        }
    }

    const goToWishlistPage = () => {
        navigation.navigate('Home', { screen: 'WishlistPage' })
        // navigation.dispatch(
        //     CommonActions.reset({
        //         index: 0,
        //         routes: [
        //             {
        //                 name: 'Main',
        //                 state: {
        //                     routes: [{
        //                         name: 'Home',
        //                         state: {
        //                             routes: [{
        //                                 name: 'WishlistPage'
        //                             }],
        //                         },
        //                     }],
        //                 },
        //             },
        //         ],
        //     })
        // );  //please re-test
    }

    const goToCartTab = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Main',
                        state: {
                            routes: [{
                                name: 'Cart'
                            }],
                        },
                    },
                ],
            })
        );
    }

    useEffect(() => {
        if (submit) {
            goToCategory(keyword)
            setSubmit(false)
            setKeyword('')
        }
    }, [isModalVisible])

    useEffect(() => {

    }, [])


    const goToCategory = (data: any) => {
        const params = {
            keyword: data,
            sort: "0"
        };

        const Reset = dispatch(reset(product))
        if (Reset) {
            dispatch(getSearch(params))
            navigation.navigate('Home', { screen: 'SearchPage', params: params });
        }
    }

    return (
        <>
            <IconButton
                onPress={toggleModal}
                _pressed={{
                    backgroundColor: "white"
                }}
                icon={<IonIcon name="search-outline" size={24} color="black" />
                }
            />
            <SearchModal
                visible={isModalVisible}
                onToggle={toggleModal}
                searchKeyword={openKeyword}
            />
            <IconButton
                onPress={goToWishlistPage}
                _pressed={{
                    backgroundColor: "white"
                }}
                icon={<>
                    <Wishlist key={1} like={false} size={24} />
                    <Badge
                        key={2}
                        size={18}
                        style={styles.badge}
                        visible={true}
                    >
                        {wishlist.id_product.length}
                    </Badge>
                </>}
            />
            <IconButton
                onPress={goToCartTab}
                icon={<>
                    <IonIcon name="cart-outline" size={24} color="black" />
                    {totalItem > 0 &&
                        <Badge key={2} size={18} style={styles.badge} visible={true}>{totalItem}</Badge>
                    }
                </>}
            />
        </>
    );
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: 4,
        right: 2,
        backgroundColor: '#1cad48'
    },
});