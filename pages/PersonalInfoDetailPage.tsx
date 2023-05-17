import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Button, Flex, Text } from "native-base";
import CustomInput from '../components/Form/CustomInput';
import { Formik } from 'formik';
import * as yup from 'yup'
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../Services/AuthService';
import GeneralService from '../Services/GeneralService';
import { profile } from '../Redux/Slices/Sessions';

export default function PersonalInfoDetailPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch()
    const details = useSelector((storeState: any) => storeState.session.user);
    const session = useSelector((storeState: any) => storeState.session);


    const title = 'New ' + route.params.params.title;
    const confirm_title = 'Confirm ' + route.params.params.title;
    const id = route.params.params.id;
    const key = route.params.params.key;
    const confirm_key = 'confirm_' + route.params.params.key;

    const icon = (item: any) => {
        if(item == 0) {
            return 'mail-outline'
        }else if(item == 1)  {
            return 'lock-closed-outline'
        }else if(item == 2) {
            return 'person-outline'
        } else {
            return null
        }
    }

    useEffect(() => {
        console.log('user:', details)
        console.log('id:', id)
        console.log('session:', details.id_customer)
        if(id == 0) {
            navigation.setOptions({ title: 'Update ' + route.params.params.title});
        } else if(id == 1) {
            navigation.setOptions({ title: 'Update ' + route.params.params.title});
        } else if(id == 2) {
            navigation.setOptions({ title: 'Update ' + route.params.params.title});
        }
        
    }, [])

    const submit = async (values: any, resetForm: any) => {


        const params: any = {
            firstname: id === 2 ? values.new_name : '',
            lastname: id === 2 ? values.new_lastname : '',
            email: id === 0 ? values.confirm_email : '',
            password: id === 1 ? values.confirm_password : '',
            id_customer: details.id_customer,
        };

        const response = await AuthService.updateUserInfo(params);
        const json = await response.json();
        if(json.code == 200) {
            GeneralService.toast({ description: json.message });
            dispatch(profile(json.data))
            console.log('result: ', details)
            navigation.goBack();
            resetForm();
            

        }
    }


    const email = {
        current_email: details.email,
        new_email: '',
        confirm_email: '',
    }
    const password = {
        current_password: '',
        new_password: '',
        confirm_password: '',
    }
    const name = {
        // current_name: details.name,
        new_name: details.name,
        // lastname: details.lastname,
        new_lastname: details.lastname,
    }


    const validation = () => {
        if(id == 0) {
            return yup.object().shape({
                new_email: yup.string()
                    .email('New Email must be in a valid format')
                    .required('New Email is required')
                    .notOneOf([yup.ref('current_email'), null], 'New email must be different from current email'),
                confirm_email: yup.string()
                    .email('Confirm email must be in a valid format')
                    .required('Confirm email is required')
                    .oneOf([yup.ref('new_email')], "Confirm email don't match"),
            })
        } else if(id == 1) {
            return yup.object().shape({
                // current_password: yup.string()
                //     .required('Current Password is required'),
                new_password: yup.string()
                    .required('New Password is required')
                    .notOneOf([yup.ref('current_password'), null], 'New password must be different from current email'),
                confirm_password: yup.string()
                    .required('Confirm password is required')
                    .oneOf([yup.ref('new_password')], "Confirm Password don't match"),
            })
        } 

        return yup.object().shape({
            new_name: yup.string()
                .required('New Firstname is required'),
            new_lastname: yup.string()
                .required('New Lastname is required'),
        })
    }


    return (
        <>
            <Flex flex={1} bg={'white'}>
                <ScrollView>
                    <View style={styles.container}>
                        <Formik
                            initialValues={
                                    id === 0 ? email:
                                    id === 1 ? password : name
                            }
                            onSubmit={(values, { resetForm }) => submit(values,resetForm)}
                            validationSchema={validation}
                        >
                            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                <>
                                    <Flex direction="row" flex={1} flexWrap="wrap" justifyContent="flex-start">
                                        
                                        {id == 0 && <>
                                            <CustomInput
                                                key={0}
                                                placeholder={title}
                                                name={'current_' + key}
                                                type={id == 1 ? 'password' : 'text'}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                                readOnly={id == 1 ? false : true}
                                            />
                                            <CustomInput
                                                key={1}
                                                placeholder={title}
                                                name={'new_' + key}
                                                type={id == 1 ? 'password' : 'text'}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                                autoCapitalize="none"
                                            />
                                            <CustomInput
                                                key={2}
                                                placeholder={confirm_title}
                                                name={'confirm_' + key}
                                                type={id == 1 ? 'password' : 'text'}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                                autoCapitalize="none"
                                            />
                                        </>}

                                        {id == 1 && <>
                                            {/* <CustomInput
                                                key={0}
                                                placeholder={title}
                                                name={'current_' + key}
                                                type={id == 1 ? 'password' : 'text'}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                                readOnly={id == 1 ? false : true}
                                            /> */}
                                            <CustomInput
                                                key={1}
                                                placeholder={title}
                                                name={'new_' + key}
                                                type={id == 1 ? 'password' : 'text'}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                            />
                                            <CustomInput
                                                key={2}
                                                placeholder={confirm_title}
                                                name={'confirm_' + key}
                                                type={id == 1 ? 'password' : 'text'}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                            />
                                        </>}

                                        {id == 2 && <>
                                            {/* <CustomInput
                                                key={0}
                                                placeholder={title}
                                                name={'current_' + key}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                                readOnly={id == 1 ? false : true}
                                            /> */}
                                            <CustomInput
                                                key={1}
                                                placeholder={'New Firstname'}
                                                name={'new_' + key}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                            />
                                            {/* <CustomInput
                                                key={2}
                                                placeholder={title}
                                                name={'last' + key}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                                readOnly={id == 1 ? false : true}
                                            /> */}
                                            <CustomInput
                                                key={3}
                                                placeholder={'New Lastname'}
                                                name={'new_last' + key}
                                                values={values}
                                                onChangeText={handleChange}
                                                onBlur={setFieldTouched}
                                                icon={icon(id)}
                                                touched={touched}
                                                errors={errors}
                                            />
                                        </>}

                                    </Flex>
                                    <Button
                                        key={3}
                                        bg={'#1cad48'}
                                        mb={3}
                                        mt={5}
                                        style={styles.button}
                                        _text={{ fontSize: 14, fontWeight: 600 }}
                                        isDisabled={!isValid}
                                        _pressed={{  backgroundColor: '#1cad48' }}
                                        onPress={() => handleSubmit()}>{id===0 ? 'Save Email Address Changes': id=== 1 ? 'Save Password Changes' : 'Save Name Changes'}
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