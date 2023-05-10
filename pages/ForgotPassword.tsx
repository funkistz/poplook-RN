import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Input, Icon, Button, ScrollView, Toast, Box } from "native-base";
import { Formik } from 'formik'
import * as yup from 'yup'
import AuthService from '../Services/AuthService';
import GeneralService from '../Services/GeneralService';
import CustomInput from '../components/Form/CustomInput';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
    const id_shop = useSelector((storeState: any) => storeState.session.country.id_shop);
    const navigation: any = useNavigation();
    useEffect(() => {
        console.log('session:', id_shop)
    }, [])
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Forgot Password</Text>
                <Formik 
                    initialValues={{ 
                        email: '',
                    }}
                    onSubmit={

                        async (values) => {
                            const params = {
                                email: values,
                                id_shop: id_shop
                            }
                            const response = await AuthService.forgotPassword(values);
                            const json = await response.json();
                            console.log('json', json)
                            if(json.code == 200) {
                                navigation.navigate('Login', { screen: 'LoginPage' });
                            }

                            GeneralService.toast({ description: json.message, type:json.status });
                        }
                    }
                    validationSchema={yup.object().shape({
                        email: yup
                        .string()
                        .email('Email must be in a valid format')
                        .required('Email is required')
                    })}
            >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <>
            <Text style={{ color: '#000000', paddingBottom: 10, }}>
                If a POPLOOK account exists for the email address you enter, we will send an email to that address with a link to reset your password.
            </Text>
            <CustomInput
                key={1}
                placeholder={'Email'}
                name={'email'}
                values={values}
                onChangeText={handleChange}
                onBlur={setFieldTouched}
                icon={'mail-outline'}
                touched={touched}
                errors={errors}
            />
            <Button 
                style={styles.button} 
                bg={'#1cad48'} 
                borderWidth={1} 
                marginTop={5}
                borderColor={'#1cad48'} 
                _text={{ color: "#ffffff" , fontSize: 14 , fontWeight: 600, textTransform: 'uppercase' }}
                onPress={() => handleSubmit()}>Continue
            </Button>
            </>
        )}
        </Formik>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#1cad48',
        paddingTop: 80,
        fontSize: 22,
        fontWeight: '600',
        paddingBottom: 20,
    },
    container: {
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        flex: 1
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