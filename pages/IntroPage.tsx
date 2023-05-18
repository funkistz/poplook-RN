import { StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Input, Box, Button, ScrollView, View, HStack, VStack } from "native-base";
import { Formik } from 'formik'
import * as yup from 'yup'
import AuthService from '../Services/AuthService';
import CustomInput from '../components/Form/CustomInput';
import GeneralService from '../Services/GeneralService';
import { intro, loginUser, userSelector } from '../Redux/Slices/Sessions';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigation } from '@react-navigation/native';
import ShippingTo from '../components/ShippingTo';

export default function PageIntroPage() {

    const navigation: any = useNavigation();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const session = useSelector((storeState: any) => storeState.session);
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        userSelector
    );

    useEffect(() => {

    }, []);

    const submit = () => {
        dispatch(intro(true))
        navigation.navigate('Main', { screen: 'HomePage' });
    }


    return (
        <View style={styles.container}>
            <ShippingTo></ShippingTo>
            <VStack mt={4}>
                <Button
                    bg={'#1cad48'}
                    style={styles.search}
                    _text={{ fontSize: 14, fontWeight: 600 }}
                    onPress={submit}
                >Continue
                </Button>
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: '#fff'
    },
    search: {
        borderRadius: 10,
        padding: 6,
        sizes: 'md',
        marginBottom: 70,
        width: '100%',
        height: 45,
    },
})