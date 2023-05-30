import { StyleSheet, KeyboardAvoidingView} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Flex, HStack, ScrollView, Button, Spacer, Stack, View, AlertDialog } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useIsFocused } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup'
import InputLabel from '../components/Form/InputLabel';
import { addAddress, updateAddress, deleteAddress, getAddressList } from '../Redux/Slices/Address';
import { clearAddress, getAddressOne } from '../Redux/Slices/AdressSelected';
import { useNavigation } from '@react-navigation/native';
import { getAddressCountries, getStates } from '../Redux/Slices/Infos';
import FormSelect from '../components/Form/FormSelect';
import { getCartStep1 } from '../Redux/Slices/Checkout';

export default function AddressDetailPage({ route }: { route: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const countries = useSelector((storeState: any) => storeState.infos.addressCountries.map((country: any) => { return { label: country.name, value: country.id_country } }));
    const states = useSelector((storeState: any) => storeState.infos.states.map((state: any) => { return { label: state.name, value: state.id } }));
    const country = useSelector((storeState: any) => storeState.session.country);
    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);

    const navigation: any = useNavigation();
    const address = useSelector((storeState: any) => storeState.address_selected);
    const addressUser = useSelector((storeState: any) => storeState.address);
    const { isCheckout } = route.params;

    const isFocused = useIsFocused();
    const addressId = route.params.param.id;
    const isUpdate = route.params.param.is_update;
    const ischeckout = route.params.param.is_checkout;

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        dispatch(deleteAddress(addressId));
        dispatch(getAddressList());
        setIsOpen(false);
        navigation.goBack();
    };
    const cancelRef = useRef(null);

    useEffect(() => {

        // console.log('addressId addressId', addressId);
        // console.log('addresspage', address);
        // console.log('states', states);
        // console.log('countries', countries);

        if (isFocused) {
            if (addressId) {
                dispatch(getAddressCountries(country.id_shop));
                dispatch(getStates({ code: country.country_iso_code, id_shop: country.id_shop }));
                dispatch(clearAddress());
                dispatch(getAddressOne(addressId))
                navigation.setOptions({ title: "Update Address" });
            }

            dispatch(getAddressCountries(country.id_shop));
            dispatch(getStates({ code: country.country_iso_code, id_shop: country.id_shop }));
        }

    }, [isFocused])

    const validation = () => {
        if (shopId == 1) {
            return yup.object().shape({
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

            })
        } else {
            return yup.object().shape({
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
                city: yup
                    .string()
                    .required('City is required'),
                postcode: yup
                    .number()
                    .required('Postcode is required'),
                phone: yup
                    .number()
                    .required('Telephone is required'),

            })
        }
    }

    return (
        <>
            {address.data && <Formik

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
                        if (isUpdate) {
                            console.log('UPDATE', JSON.stringify({ ...values, id_address: addressId }))
                            dispatch(updateAddress({ ...values, id_address: addressId }));
                        } else {
                            console.log('ADD', JSON.stringify(values))
                            dispatch(addAddress(values));
                        }

                        if (isCheckout) {

                            if (isUpdate) {
                                const param = {
                                    gift: "",
                                    address_id: addressId
                                }
                                dispatch(getCartStep1(param))
                                navigation.navigate('CheckoutExPage', { screen: 'CheckoutExPage' });
                            } else {
                                navigation.goBack();
                            }
                        } else if (ischeckout) {
                            const param = {
                                gift: "",
                                address_id: addressId
                            }
                            dispatch(getCartStep1(param))
                            navigation.navigate('CheckoutExPage', { screen: 'CheckoutExPage' });
                        } else {
                            navigation.goBack();
                        }

                    }
                }
                validationSchema={validation}
                validateOnMount
            >
                {({ values, handleChange, errors, setFieldTouched, setFieldValue, touched, isValid, handleSubmit }) => (
                    <Flex flex={1} backgroundColor='white'>

                        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                            <AlertDialog.Content>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header>Delete Address</AlertDialog.Header>
                                <AlertDialog.Body>
                                    This will remove address permanently!
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button.Group space={2}>
                                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme="danger" onPress={onClose}>
                                            Delete
                                        </Button>
                                    </Button.Group>
                                </AlertDialog.Footer>
                            </AlertDialog.Content>
                        </AlertDialog>

                        <Flex flex={1} >

                            <ScrollView flex={1} flexGrow={1} style={styles.container}>
                            <KeyboardAvoidingView behavior="padding">
                                <InputLabel
                                    placeholder="Firstname"
                                    name="firstname"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Contact *"
                                    touched={touched}
                                    errors={errors}
                                />
                                <InputLabel
                                    placeholder="Surname"
                                    name="lastname"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    // text="Surname*"
                                    touched={touched}
                                    errors={errors}
                                    secureTextEntry={false}
                                />
                                <InputLabel
                                    // placeholder="Enter your phone"
                                    name="phone"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Telephone*"
                                    touched={touched}
                                    errors={errors}
                                    icon='call'
                                />

                                <InputLabel
                                    placeholder="Company"
                                    name="company"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Company"
                                    touched={touched}
                                    errors={errors}
                                />

                                <InputLabel
                                    placeholder="Line 1"
                                    name="address1"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Address *"
                                    touched={touched}
                                    errors={errors}
                                />
                                <InputLabel
                                    placeholder="Line 2"
                                    name="address2"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    // text="Address (Line 2)*"
                                    touched={touched}
                                    errors={errors}
                                />
                                <FormSelect
                                    name="id_country"
                                    values={values}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    text="Country*"
                                    touched={touched}
                                    errors={errors}
                                    data={countries}
                                />
                                {shopId == 1 &&
                                    <FormSelect
                                        name="id_state"
                                        values={values}
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        text="State*"
                                        touched={touched}
                                        errors={errors}
                                        data={states}
                                    />
                                }

                                <InputLabel
                                    // placeholder="Enter your city"
                                    name="city"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Town / City*"
                                    touched={touched}
                                    errors={errors}
                                />
                                <InputLabel
                                    // placeholder="Enter your postcode"
                                    name="postcode"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Postcode*"
                                    touched={touched}
                                    errors={errors}
                                />

                                {isUpdate &&
                                    <HStack>
                                        <Spacer></Spacer>
                                        <Button
                                            mt={5}
                                            mb={10}
                                            width={150}
                                            variant='link'
                                            style={styles.button_delete}
                                            colorScheme="danger"
                                            onPress={() => setIsOpen(!isOpen)}
                                            _text={{ fontSize: 14, fontWeight: 600 }}>DELETE ADDRESS
                                        </Button>
                                    </HStack>
                                }

                                <View height={10}></View>
                                </KeyboardAvoidingView>
                            </ScrollView>

                            <Stack px={3}>
                                <Button
                                    bg={'#1cad48'}
                                    my={3}
                                    style={styles.button}
                                    _text={{ fontSize: 14, fontWeight: 600 }}
                                    isDisabled={!isValid}
                                    isLoading={addressUser.isLoading && !addressUser.isFinish}
                                    isLoadingText="SAVE ADDRESS"
                                    _pressed={{ backgroundColor: '#1cad48' }}
                                    onPress={() => handleSubmit()}>SAVE ADDRESS
                                </Button>
                            </Stack>
                            
                        </Flex>
                    </Flex>
                )}
            </Formik>
            }
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
        color: 'gray'
    },
    border: {
        borderBottomWidth: 1,
    },
    button_delete: {
        borderRadius: 10,
        sizes: 'md',
    },
    button: {
        borderRadius: 10,
        sizes: 'md',
    },
    container: {
        padding: 25,
        paddingTop: 15
    },
})