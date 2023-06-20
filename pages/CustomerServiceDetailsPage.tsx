import { StyleSheet, TouchableOpacity, Dimensions, FlatList, Linking, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, View, VStack, HStack, Flex, Icon, Box, Button, Select, CheckIcon, Input,TextArea } from "native-base";
import { useIsFocused } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { Formik } from 'formik';
import * as Yup from 'yup'
import OrderHistoryService from '../Services/OrderHistoryService';
import { useSelector } from 'react-redux';
import CmsService from '../Services/CmsService';
import GeneralService from '../Services/GeneralService';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';

export default function CustomerServiceDetailsPage({ route , navigation} : { route: any,  navigation: any }) {

    const win = Dimensions.get('window');
    const isFocused = useIsFocused();
    const [details, setDetails] = useState<any>([]);
    const [keyboard, setKeyboard] = useState<boolean>(false);
    const [listOrderId, setListOrderId] = useState<any>([]);
    
    const session = useSelector((storeState: any) => storeState.session);

    const htmlContent = (data: any) => {
        return `   
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0 20px;
                    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    // background: red;
                }
                ul {
                    padding: 0;

                }
                li { 
                    // font-size: 100; 
                    list-style: none;
                } 
                li:before { 
                    color: #1cad48; 
                    content: "\\2022"; 
                    display: inline-block;
                    width: 1em; 
                    font-weight: bold; 
                    font-size: 40;
                } 
                p,span { 
                    font-size: 3 ;
                    // padding-left: 20px;
                }

                a {
                    color: #1cad48 !important;
                }
            </style>    
        </head>

        <body>
            <div>
                ` + data +`
            </div>
        </body>
        </html>

    `
    }

    const injectedJavaScript = `
        window.ReactNativeWebView.postMessage(
            Math.max(
            document.body.scrollHeight, 
            document.documentElement.scrollHeight, 
            document.body.offsetHeight, 
            document.documentElement.offsetHeight, 
            document.body.clientHeight, 
            document.documentElement.clientHeight
            ).toString()
        );
        true;
    `;

    const validationSchema = Yup.object({
        subject: Yup.string().required('Subject is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        message: Yup.string().required('Message is required')
    });

    const fetchData = async (item:any) => {
        const response = await OrderHistoryService.orderHistoryList(item);
        const json = await response.json();
        console.log('result: ......', json)
        console.log('idasdas: ', json.data.order_histories)
        if(json.data.order_histories != "") {
            const orderIds = json.data.order_histories.map((order: any) => order.id_order);
            setListOrderId(orderIds)
        }
    }

    const submit = async (values: any, resetForm: any) => {
        const params: any = {
            email: values.email,
            subject: values.subject,
            id_order: values.order_id,
            message: values.message,
        };

        // console.log('params: ', params)

        sendEmail(params).catch(console.error)
        resetForm();
    }

    const sendEmail = async (item:any) => {
        const response = await CmsService.sendEmail(item);
        const json = await response.json();
        if(json.code == 200) {
            GeneralService.toast({ description: json.message });
        }
    }

    const medias = [
        { id: 0, title: "Facebook", url: "https://www.facebook.com/poplook", icon: 'facebook-f' },
        { id: 1, title: "Twitter", url: "https://www.twitter.com/poplookshop", icon: 'logo-twitter'},
        { id: 2, title: "Instagram", url: "https://www.instagram.com/poplook", icon: 'logo-instagram' },
        { id: 3, title: "Youtube", url: "https://www.youtube.com/c/POPLOOKChannel", icon: 'logo-youtube' },
        { id: 4, title: "Tiktok", url: "https://www.tiktok.com/@poplookshop", icon: 'tiktok' }
    ];

    const goToSocialMediaPage = (url: any) => {
        Linking.openURL(url); 
    }

    useEffect(() => {
        if(isFocused) {
            console.log('params ', route.params.params.data)
            setDetails(route.params.params.data)
            fetchData(session.user.id_customer).catch(console.error);
            navigation.setOptions({ title: route.params.params.id == 21 ? 'Contact Us' : route.params.params.title  });
        }
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboard(true);
            }
        );
        
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboard(false);
        }
        );
        
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };

    }, [])

    return <>
        <Flex flex={1} bg={'white'}>
            {details.id_cms == 21 && <>
                <Formik
                    initialValues={{
                        subject: '',
                        email: session.user.email,
                        order_id: '',
                        message: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => submit(values,resetForm)}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <>
                            <FlatList
                            data={[1]}
                            renderItem={() => (
                                <View mt={4}>
                                    <View mx={5} >
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text color='black'bold fontSize={15}>By Phone: </Text>
                                            <Text color='black' fontSize={15}>+606-253 2750</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text color='black'bold fontSize={15}>Whatsapp: </Text>
                                            <Text color='black' fontSize={15}>+60196933958</Text>
                                        </View>
                                        <Text color='black' mt={4} fontSize={15}>Monday - Friday</Text>
                                        <Text color='black' fontSize={15}>9.00AM - 5.00PM GMT +8</Text>
                                        <View style={{ flexDirection: 'row' }} mt={4}>
                                            <Text color='black'bold fontSize={15}>By Email: </Text>
                                            <Text color='black' fontSize={15}>service@poplook.com</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }} mt={4}>
                                            <Text color='black'bold fontSize={15} marginRight={3}>Connect with Us</Text>
                                        </View>
                                        <VStack marginTop={2} >
                                            <HStack>
                                                {medias.map((item: any, index: any) => {
                                                    return <>
                                                        <TouchableOpacity key={index} onPress={() => goToSocialMediaPage(item.url)}>
                                                            <Box key={index} marginRight={4}>
                                                                { (item.id != 4 && item.id != 0) ? <Icon as={IonIcon} name={item.icon} size="6" color='black'/> : <Icons name={item.icon} size={20} color="black"/>}
                                                            </Box>
                                                        </TouchableOpacity>
                                                    </>;
                                                })}
                                            </HStack>
                                        </VStack>
                                    </View>
                                    <HStack px="1" py="2" mt={4}  bg={'gray.100'}  justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
                                        <HStack alignItems="center" w="100%">
                                            <Text fontSize="15" color="black" pl={2} bold>Send Us A Message</Text>
                                        </HStack>
                                    </HStack>
                                    <View  mx={5}>
                                        <Text color='black' my={2} fontSize={14} pt={1} fontWeight={500}>Subject</Text>
                                        <Select key={0} color={'black'} selectedValue={values.subject} w={'100%'} borderColor={'#ccc'} accessibilityLabel="Choose Subject"  placeholder="Choose Subject" 
                                            _selectedItem={{
                                                bg: "teal.600",
                                                endIcon: <CheckIcon size="5" />
                                            }} 
                                            mt={1} 
                                            onValueChange={(event) => {
                                                handleChange('subject')(event);
                                            }}
                                            >
                                            <Select.Item label="General Enquiry" value="General Enquiry" />
                                            <Select.Item label="Order Enquiry" value="Order Enquiry" />
                                            <Select.Item label="Interest to Purchase" value="Interest to Purchase" />
                                        </Select>
                                        {touched['subject'] && errors['subject'] &&
                                            <Text style={{ fontSize: 10, color: '#FF0D10' }}>{errors['subject']}</Text>
                                        }

                                        <Text color='black' my={2} fontSize={14} pt={1} fontWeight={500}>Email</Text>
                                        <Input variant={'outline'} value={values['email']} isReadOnly={true} color={'black'} borderColor={'#ccc'} />

                                        <Text color='black' my={2} fontSize={14} pt={1} fontWeight={500}>Order Reference</Text>
                                        <Select isDisabled={listOrderId.length == 0 ? true : false} key={2} color={'black'} selectedValue={values.order_id} w="100%" borderColor={'#ccc'} accessibilityLabel="Choose Order Reference" placeholder="Choose Order Reference" 
                                            _selectedItem={{
                                                bg: "teal.600",
                                                endIcon: <CheckIcon size="5" />
                                            }} 
                                            mt={1} 
                                            onValueChange={(event) => { 
                                                handleChange('order_id')(event);
                                            }}>

                                            {listOrderId.map((res:any, index: any) => {
                                                return <Select.Item key={index} label={res} value={res} />
                                            })}
                                        </Select>

                                        <Text color='black' my={2} fontSize={14} pt={1} fontWeight={500}>Message</Text>
                                        <TextArea h={40} value={values['message']} color={'black'} borderColor={'#ccc'} placeholder="Message" w="100%" autoCompleteType={undefined} onChangeText={handleChange('message')} />
                                        {touched['message'] && errors['message'] &&
                                            <Text style={{ fontSize: 10, color: '#FF0D10' }}>{errors['message']}</Text>
                                        }

                                        <Button
                                            key={4}
                                            bg={'#1cad48'}
                                            mb={keyboard ? 400 : 4}
                                            mt={5}
                                            style={styles.button}
                                            _text={{ fontSize: 14, fontWeight: 600 }}
                                            isDisabled={!isValid}
                                            _pressed={{ backgroundColor: '#1cad48' }}
                                            onPress={() => handleSubmit()}>Send
                                        </Button>
                                    </View>

                                </View>
                                
                            )}
                            keyExtractor={() => 'key'} />
                        </>
                    )}
                </Formik>
            </>}
            

            {details.id_cms != 21 && <>
                <Box h={'100%'} mt={4}>
                    <WebView
                            source={{ html: htmlContent(details.content) }}
                            injectedJavaScript={injectedJavaScript}
                            startInLoadingState={true}
                        />
                </Box>
            </>}
        </Flex>
        
    </>
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    button: {
        borderRadius: 10,
        padding: 3,
        sizes: 'md'
    },
})