import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Input, Box, Button, ScrollView, View } from "native-base";
import { Formik } from 'formik'
import * as yup from 'yup'
import AuthService from '../Services/AuthService';
import CustomInput from '../components/Form/CustomInput';
import GeneralService from '../Services/GeneralService';
import { loginUser, userSelector } from '../Redux/Slices/Sessions';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigation } from '@react-navigation/native';
import ShippingTo from '../components/ShippingTo';

export default function LoginPage() {

    const navigation: any = useNavigation();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        userSelector
    );

    useEffect(() => {


    }, []);

    useEffect(() => {
        if (isError) {
            // console.log('error xx');
            //   dispatch(clearState());
        }
        if (isSuccess) {
            navigation.navigate('Home', { screen: 'HomePage' });
        }
    }, [isError, isSuccess]);

    const register = () => {

        navigation.navigate('RegisterPage', { screen: 'RegisterPage' });

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={

                        async (values) => {
                            Keyboard.dismiss();
                            dispatch(loginUser(values));
                        }
                    }
                    validationSchema={yup.object().shape({
                        email: yup
                            .string()
                            .email('Email must be in a valid format')
                            .required('Email is required'),
                        password: yup
                            .string()
                            .min(3, 'Password must be at least 3 characters')
                            .required('Password is required'),
                    })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <>
                            <CustomInput
                                placeholder="Email"
                                name="email"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                icon="mail-outline"
                                touched={touched}
                                errors={errors}
                            />
                            <CustomInput
                                placeholder="Password"
                                name="password"
                                values={values}
                                onChangeText={handleChange}
                                onBlur={setFieldTouched}
                                icon="lock-closed-outline"
                                touched={touched}
                                errors={errors}
                                type='password'
                            />
                            <Text style={styles.right_section}>Forgot Password?</Text>

                            <Button
                                bg={'#1cad48'}
                                mb={3}
                                style={styles.button}
                                _text={{ fontSize: 14, fontWeight: 600 }}
                                disabled={!isValid}
                                onPress={() => handleSubmit()}>LOGIN
                            </Button>
                            <Button
                                style={styles.button}
                                bg={'white'}
                                borderColor={'#1cad48'}
                                borderWidth={1}
                                _text={{ color: "#1cad48", fontSize: 14, fontWeight: 600 }}
                                onPress={() => register()}
                            >NEW HERE? SIGN UP
                            </Button>

                            <Box mt={6} >
                                <ShippingTo></ShippingTo>
                            </Box>
                        </>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback >
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#1cad48',
        paddingTop: 80,
        fontSize: 28,
        fontWeight: '600',
        paddingBottom: 20
    },
    input: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 10,
        color: 'black'
    },
    container: {
        padding: 30,
        height: '100%',
        backgroundColor: '#ffffff'
    },
    right_section: {
        paddingLeft: 190,
        color: 'black',
        fontWeight: '400',
        paddingTop: 30,
        fontSize: 16,
        paddingBottom: 22
    },
    left_section: {
        padding: 15,

        color: 'black',
        fontSize: 16,
        fontWeight: '400'
    },
    button: {
        borderRadius: 10,
        padding: 3,
        sizes: 'md'
    }
})