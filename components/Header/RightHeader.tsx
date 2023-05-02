import React, { useEffect, useState, useRef } from 'react';
// import { Box, HStack, IconButton, Icon, StatusBar, Text, Center, Flex, Modal, FormControl, Button, Input, View } from 'native-base';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import { Center, Button, Container, Divider, Flex, Heading, HStack, IconButton, Spacer, Stack, Text, VStack, FormControl, Input, Icon } from 'native-base';
import SearchModal from '../Modals/Search';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getSearch, reset } from '../../Redux/Slices/Search';
import Wishlist from '../wishlist';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-paper';
import { getWishList } from '../../Redux/Slices/Wishlist';

export default function RightHeader({ navigation }: { navigation: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const product = useSelector((storeState: any) => storeState.search);
    const wishlist = useSelector((storeState: any) => storeState.wishlist);
    const session = useSelector((storeState: any) => storeState.session);

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

    useEffect(() => {
        if (submit) {
            goToCategory(keyword)
            setSubmit(false)
            setKeyword('')
        }
    }, [isModalVisible])

    useEffect(() => {
        console.log('Enter wishlist....................', session.user)
        // dispatch(getWishList())
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
                onPress={() => navigation.navigate('Home', { screen: 'WishlistPage' })}
                _pressed={{
                    backgroundColor: "gray"
                }}
                icon={ <>
                    <Wishlist like={false} size={24} /> 
                    <Badge
                        size={18}
                        style={styles.badge}
                        visible={true}
                    >
                        {wishlist.id_product.length}
                    </Badge>
                </>} 
            />
            <IconButton
                onPress={toggleModal}
                _pressed={{
                    backgroundColor: "gray"
                }}
                icon={<IonIcon name="search-outline" size={24} color="black" />
                }
            />
            <SearchModal
                visible={isModalVisible}
                onToggle={toggleModal}
                searchKeyword={openKeyword}
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