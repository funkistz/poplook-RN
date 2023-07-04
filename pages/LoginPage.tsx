import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Box, Button, View, HStack } from "native-base";
import { Formik } from 'formik'
import * as yup from 'yup'
import CustomInput from '../components/Form/CustomInput';
import { intro, loginUser, userSelector } from '../Redux/Slices/Sessions';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigation, CommonActions } from '@react-navigation/native';
import ShippingTo from '../components/ShippingTo';

export default function LoginPage({ route }: { route: any }) {

    const navigation: any = useNavigation();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const session = useSelector((storeState: any) => storeState.session);
    const { isSuccess, isError } = useSelector(
        userSelector
    );
    const params = route.params;

    useEffect(() => {

        if (isError) {
            navigation.navigate('LoginPage', { screen: 'LoginPage'});
        }

        if (isSuccess) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Main' }]
                })
            );
        }

    }, [isError, isSuccess]);

    const register = () => {

        navigation.navigate('RegisterPage', { screen: 'RegisterPage' });

    }

    const forgotPassword = () => {

        navigation.navigate('ForgotPassword', { screen: 'ForgotPassword' });

    }

    if (params && params.redirect == 'login') {
        navigation.navigate('My Account', {
            screen: 'LoginPage',
        });
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
                                type="text"
                                autoCapitalize="none"
                                autoCorrect={false}
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

                            <HStack style={{ marginVertical: 20 }}>
                                <HStack w={'50%'} style={{ flex: 1, justifyContent: 'flex-end' }} h={30}>
                                    <Text style={styles.forgot_password} onPress={() => forgotPassword()}>Forgot Password?</Text>
                                </HStack>
                            </HStack>

                            <Button
                                bg={'#1cad48'}
                                mb={3}
                                style={styles.button}
                                _text={{ fontSize: 14, fontWeight: 600 }}
                                isDisabled={!isValid}
                                isLoading={session.loginLoading && !session.loginFinish}
                                isLoadingText="LOGIN"
                                _pressed={{ backgroundColor: '#1cad48' }}
                                onPress={() => handleSubmit()}>LOGIN
                            </Button>
                            <Button
                                style={styles.button}
                                bg={'white'}
                                borderColor={'#1cad48'}
                                borderWidth={1}
                                _text={{ color: "#1cad48", fontSize: 14, fontWeight: 600 }}
                                onPress={() => register()}
                                _pressed={{ backgroundColor: '#fff' }}
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
    },
    forgot_password: {
        color: 'black',
        fontWeight: '400',
        fontSize: 16,
        textAlign: 'right',
        paddingTop: 5,
    }
})
