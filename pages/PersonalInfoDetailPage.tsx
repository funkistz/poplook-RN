import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Button, Flex } from "native-base";
import CustomInput from '../components/Form/CustomInput';
import { Formik } from 'formik';
import * as yup from 'yup'
import { Alert } from 'react-native';

export default function PersonalInfoDetailPage({ route, navigation }: { route: any, navigation: any }) {

    const title = 'New ' + route.params.params.title;
    const confirm_title = 'Confirm ' + route.params.params.title;
    const id = route.params.params.id;
    const key = route.params.params.key;
    const confirm_key = 'confirm_' + route.params.params.key;

    useEffect(() => {


    }, [])

    return (
        <>
            <Flex flex={1} bg={'white'}>
                <ScrollView>
                    <View style={styles.container}>
                    <Formik
                            initialValues={{
                                email: '',
                                confirm_email: '',
                                password: '',
                                confirm_password: '',
                                name: '',
                                confirm_name: ''
                            }}
                            onSubmit={values => Alert.alert(JSON.stringify(values))}
                            validationSchema={yup.object().shape({
                                email: yup
                                    .string()
                                    .email('Email must be in a valid format')
                                    .required('Email is required'),
                                confirm_email: yup
                                    .string()
                                    .email('Email must be in a valid format')
                                    .required('Email is required'),
                                password: yup
                                    .string()
                                    .min(3, 'Password must be at least 3 characters')
                                    .required('Password is required'),
                                confirm_password: yup
                                    .string()
                                    .min(3, 'Password must be at least 3 characters')
                                    .required('Password is required'),
                                name: yup
                                    .string()
                                    .required('Name is required'),
                                confirm_name: yup
                                    .string()
                                    .required('Name is required'),
                            })}
                        >
                            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                <>
                                    <CustomInput
                                        placeholder={title}
                                        name={key}
                                        values={values}
                                        onChangeText={handleChange}
                                        onBlur={setFieldTouched}
                                        icon='ios-mail-outline'
                                        touched={touched}
                                        errors={errors}
                                    />
                                    <CustomInput
                                        placeholder={title}
                                        name={key}
                                        values={values}
                                        onChangeText={handleChange}
                                        onBlur={setFieldTouched}
                                        icon='ios-mail-outline'
                                        touched={touched}
                                        errors={errors}
                                    />
                                    <CustomInput
                                        placeholder={confirm_title}
                                        name={confirm_key}
                                        values={values}
                                        onChangeText={handleChange}
                                        onBlur={setFieldTouched}
                                        icon='ios-mail-outline'
                                        touched={touched}
                                        errors={errors}
                                    />
                                    <Button
                                        bg={'#1cad48'}
                                        mb={3}
                                        mt={5}
                                        style={styles.button}
                                        _text={{ fontSize: 14, fontWeight: 600 }}
                                        // disabled={!isValid}
                                        onPress={() => handleSubmit()}>SAVE CHANGES
                                    </Button>
                                </>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </Flex>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    button: {
        borderRadius: 10,
        padding: 3,
        sizes: 'md'
    }
})