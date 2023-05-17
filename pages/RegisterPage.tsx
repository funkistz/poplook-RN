import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Modal } from 'react-native'
import { Text, Button, ScrollView, Stack, Link, Checkbox, HStack, Flex, VStack } from "native-base";
import { Formik } from 'formik'
import * as yup from 'yup'
import InputLabel from '../components/Form/InputLabel';
import GeneralService from '../Services/GeneralService';
import CmsService from '../Services/CmsService';
import RegisterService from '../Services/RegisterService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CmsModal from '../components/Modals/Cms';
import AuthService from '../Services/AuthService';

export default function RegisterPage({ visible, onToggle }: any) {

    useEffect(() => {


    }, [])

    const navigation: any = useNavigation();
    const shopId = useSelector((storeState: any) => storeState.session.id_shop);

    const [cms, setCms] = useState<any>({});
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [newsletter ,setNewsletter] = useState(true)
    const [optin ,setOptin] = useState(true)
    const [terms ,setTerms] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const showPicker = () => {
        setShow(true);
    };

    const toggleModal = async (key: any) => {
        setModalVisible(!isModalVisible);
        const response = await CmsService.getCmsDetails(key);
        const json = await response.json();
        setCms(json.data[0]);
    };

    return (
        <>
            <ScrollView backgroundColor={'#fff'}>
                <View style={styles.container}>
                    <Text style={styles.title}>Sign up your account now!</Text>

                    <Formik
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            birthday: '',
                            email: '',
                            password: '',
                            newsletter: true,
                            optin: true,
                            id_lang: 1,
                            terms: '',
                        }}
                        onSubmit={
                            async (values) => {
                                if(!terms) return  GeneralService.toast({ description: 'You must agree to accepting and consenting privacy policy before register.' }); 

                                const data = {
                                    firstname: values.firstname,
                                    lastname: values.lastname,
                                    birthday: format(date, 'yyyy-MM-dd'),
                                    email: values.email,
                                    password: values.password,
                                    newsletter: newsletter ? 1 : 0,
                                    optin: optin ? 1 : 0,
                                    id_lang: 1
                                }
                                const response = await AuthService.register('0', shopId , data);
                                const json = await response.json();

                                if (json.code == 201 && json.data) {
                                    GeneralService.toast({ description: json.message, type: json.status });
                                    navigation.navigate('Login', { screen: 'LoginPage' });
                                } else {
                                    GeneralService.toast({ description: json.message, type: json.status });
                                }
                            }
                        }
                        validationSchema={yup.object().shape({
                            firstname: yup
                                .string()
                                .required('Firstname is required'),
                            lastname: yup
                                .string()
                                .required('Surname is required'),
                            email: yup
                                .string()
                                .email('Email must be in a valid format')
                                .required('Email is required'),
                            retypeEmail: yup
                                .string()
                                .email('Retype email must be in a valid format')
                                .required('Retype Email is required')
                                .oneOf([yup.ref('email')], "Confirm email don't match"),
                            password: yup
                                .string()
                                .min(3, 'Password must be at least 3 characters')
                                .required('Password is required'),
                            retypePassword: yup
                                .string()
                                .min(3, 'Retype password must be at least 3 characters')
                                .required('Retype password is required')
                                .oneOf([yup.ref('password')], "Confirm Password don't match"),
                            terms: yup
                                .bool()
                                .oneOf([true])

                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <>
                                <InputLabel
                                    placeholder="Enter your first name"
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

                                <View style={{marginVertical: 5}}>
                                    <TextInput style={{color: '#666'}} value="Date of Birth*" onFocus={showPicker}/>
                                    <DateTimePicker
                                        themeVariant="light"
                                        value={date}
                                        mode="date"
                                        display="spinner"
                                        onChange={onChange}
                                        maximumDate={new Date()}
                                        style={{borderWidth: 1, borderColor: 'black', borderRadius: 5, width: '100%', marginTop: 5, height: 50}}
                                    />
                                </View>

                                <InputLabel
                                    placeholder="Enter your email"
                                    name="email"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Email*"
                                    touched={touched}
                                    errors={errors}
                                    type="email"
                                    autoCapitalize="none"
                                />

                                <InputLabel
                                    placeholder="Enter your email"
                                    name="retypeEmail"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Retype Email*"
                                    touched={touched}
                                    errors={errors}
                                    type="email"
                                    autoCapitalize="none"
                                />
                                <InputLabel
                                    placeholder="Enter your password"
                                    name="password"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Password*"
                                    touched={touched}
                                    errors={errors}
                                    type='password'
                                />
                                <InputLabel
                                    placeholder="Enter your password"
                                    name="retypePassword"
                                    values={values}
                                    onChangeText={handleChange}
                                    onBlur={setFieldTouched}
                                    text="Retype Password*"
                                    touched={touched}
                                    errors={errors}
                                    type='password'
                                />

                                <Stack height={6}></Stack>

                                <HStack>
                                    <HStack w={'8%'}>
                                        <Checkbox value="newsletter" isChecked={newsletter} style={styles.checkbox} onChange={setNewsletter} accessibilityLabel="Newsletter"></Checkbox>
                                    </HStack>
                                    <HStack  w={'92%'}>
                                        <Text color='black'fontSize={12}>Yes, sign me up for POPLOOK mailing list.</Text>
                                    </HStack>
                                </HStack>

                                <HStack mt={1}>
                                    <HStack  w={'8%'}>
                                        <Checkbox value="optin" isChecked={optin} style={styles.checkbox} onChange={setOptin} accessibilityLabel="SetOptin"></Checkbox>
                                    </HStack>
                                    <HStack w={'92%'}>
                                        <Text color='black'fontSize={12}>Allow POPLOOK to send push notification.</Text>
                                    </HStack>
                                </HStack>

                                <HStack mt={1}>
                                    <HStack w={'8%'}>
                                        <Checkbox value="terms" isChecked={terms} style={styles.checkbox} onChange={setTerms} accessibilityLabel="Terms"></Checkbox>
                                    </HStack>
                                    <HStack w={'92%'} >
                                        <Text color={'black'} fontSize={12}>I am accepting and consenting to the practices described in the
                                            <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleModal('privacypolicy')}> Privacy Policy</Link> &
                                            <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleModal('career')}> Personal Data Protection Notice.</Link>
                                        </Text>
                                    </HStack>
                                </HStack>

                                <CmsModal
                                    visible={isModalVisible}
                                    onToggle={toggleModal}
                                    data={cms}
                                />


                                <Stack height={10}></Stack>

                                <Button
                                    bg={'#1cad48'}
                                    mb={3}
                                    style={styles.button}
                                    _text={{ fontSize: 14, fontWeight: 600 }}
                                    disabled={!isValid}
                                    _pressed={{  backgroundColor: '#1cad48' }}
                                    onPress={() => handleSubmit()}>SIGN UP
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
    date: {
        paddingTop: 5,
        fontSize: 15
    },
    title: {
        color: '#1cad48',
        paddingTop: 50,
        fontSize: 22,
        fontWeight: '600',
        paddingBottom: 20
    },
    container: {
        padding: 30
    },
    button: {
        borderRadius: 10,
        padding: 3,
        sizes: 'md'
    },
    checkbox: {
        borderColor: 'black',
        backgroundColor: 'white'
    },
    bold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    }
})