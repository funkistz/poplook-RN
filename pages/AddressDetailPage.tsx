import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import BannerService from '../Services/BannerService';
import { Flex, Center, Image, Box, HStack, IconButton, Icon, FlatList, ScrollView, Text, VStack, Button, Spacer, Stack } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import { Formik } from 'formik';
import * as yup from 'yup'
import InputLabel from '../components/Form/InputLabel';
import { addAddress } from '../Redux/Slices/Address';
import { clearAddress, getAddressOne } from '../Redux/Slices/AdressSelected';
import { useNavigation } from '@react-navigation/native';
import { persistor } from '../Redux/app';

export default function AddressDetailPage({ route }: { route: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigation: any = useNavigation();
    const address = useSelector((storeState: any) => storeState.address_selected);
    
    const isFocused = useIsFocused();
    const addressId = route.params.param.id;
    const isUpdate = route.params.param.is_update;

    useEffect(() => {

        console.log('routeid' ,addressId);
        console.log('addresspage' ,address);

        if (isFocused) {
            if (addressId){
                dispatch(clearAddress()).then(() => {
                    dispatch(getAddressOne(addressId))
                })
                
            }
        }

    }, [isFocused])

    


    return (
        <>
         <ScrollView>
            <View style={styles.container}>
                <Text color={'black'}>{addressId}</Text>
                <Formik
                    
                    initialValues={{
                        firstname: isUpdate ? address.data.firstname : '',
                        lastname: isUpdate ? address.data.lastname : '',
                        company: isUpdate ? address.data.company : '',
                        address1: isUpdate ? address.data.address1 : '',
                        address2: isUpdate ? address.data.address2 : '',
                        id_country: isUpdate ? address.data.id_country : '',
                        id_state: isUpdate ? address.data.id_state : '',
                        city: isUpdate ? address.data.city : '',
                        postcode: isUpdate ? address.data.postcode : '',
                        phone: isUpdate ? address.data.phone : '',
                    }}
                    onSubmit={
                        async (values) => {
                            console.log('ADD' , JSON.stringify(values))
                            dispatch(addAddress(values));
                            navigation.navigate('AddressListPage', { screen: 'AddressListPage' });
                        }
                    }
                    validationSchema={yup.object().shape({
                        firstname: yup
                            .string()
                            .required('Firstname is required'),
                        lastname: yup
                            .string()
                            .required('Surname is required'),
                        company: yup
                            .string(),
                        address1: yup
                            .string()
                            .required('Address (Line 1) is required'),
                        address2: yup
                            .string()
                            .required('Address (Line 2) is required'),
                        id_country: yup
                            .number()
                            .required('Country is required'),
                        id_state: yup   
                            .number()
                            .required('State is required'),
                        city: yup   
                            .string()
                            .required('City is required'),
                        postcode: yup   
                            .number()
                            .required('Postcode is required'),
                        phone: yup   
                            .number()
                            .required('Telephone is required'),

                    })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <>
                            <InputLabel
                                placeholder="Enter your firstname"
                                name="firstname"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="First Name*"
                                touched={touched}
                                errors={errors}
                            />
                            <InputLabel
                                placeholder="Enter your surname"
                                name="lastname"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="Surname*"
                                touched={touched}
                                errors={errors}
                                secureTextEntry={false}
                            />

                            <InputLabel
                                placeholder="Enter your company"
                                name="company"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="Company"
                                touched={touched}
                                errors={errors}
                            />
                            
                            <InputLabel
                                placeholder="Enter your address"
                                name="address1"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="Address (Line 1)*"
                                touched={touched}
                                errors={errors}
                            />
                            <InputLabel
                                placeholder="Enter your address"
                                name="address2"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="Address (Line 2)*"
                                touched={touched}
                                errors={errors}
                            />
                            <InputLabel
                                placeholder="Enter your country"
                                name="id_country"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="Country*"
                                touched={touched}
                                errors={errors}
                            />
                            <InputLabel
                                placeholder="Enter your state"
                                name="id_state"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="State*"
                                touched={touched}
                                errors={errors}
                            />
                            <InputLabel
                                placeholder="Enter your city"
                                name="city"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="Town / City*"
                                touched={touched}
                                errors={errors}
                            />
                            <InputLabel
                                placeholder="Enter your postcode"
                                name="postcode"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="Postcode*"
                                touched={touched}
                                errors={errors}
                            />
                            <InputLabel
                                placeholder="Enter your phone"
                                name="phone"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                text="Telephone*"
                                touched={touched}
                                errors={errors}
                            />
                            
                            <Stack height={6}></Stack>

                            <Button
                                bg={'#1cad48'}
                                mb={3}
                                style={styles.button}
                                _text={{ fontSize: 14, fontWeight: 600 }}
                                disabled={!isValid}
                                onPress={() => handleSubmit()}>SAVE ADDRESS
                            </Button>
                            <Button
                                mb={3}
                                style={styles.button_delete}
                                _text={{ fontSize: 14, fontWeight: 600 }}>DELETE ADDRESS
                            </Button>
                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
        </>   
    );
}

const styles = StyleSheet.create({
    bold: {
        fontSize: 13,
        color: 'black'
    },
    normal: {
        fontSize: 13,
        color: 'grey'
    },
    border: {
        borderBottomWidth: 1,
    },
    button_delete: {
        borderRadius: 10,
        sizes: 'md',
        backgroundColor: 'red'
    },
    button: {
        borderRadius: 10,
        sizes: 'md',
    },
    container: {
        padding: 30
    },
})