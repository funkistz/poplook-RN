import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, Box, AspectRatio, Radio, Input, Divider, Checkbox, Link, VStack, Select, CheckIcon, Flex, TextArea } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCartStep1, getCartStep2 } from '../Redux/Slices/Checkout';
import Address from '../components/Address';
import PaymentMethod from '../components/PaymentMethod';
import ShippingMethod from '../components/ShippingMethod';
import AddressModal from '../components/Modals/AddressList';
import { addressSelectedSelector } from '../Redux/Slices/AdressSelected';
import CartService from '../Services/CartService';
import { Pay } from "react-native-ipay88-integration";
import { startPayment } from 'react-native-eghl';
import {handlePaymentURL} from 'react-native-atome-paylater';
import PaymentService from '../Services/PaymentService';
import CmsService from '../Services/CmsService';
import CmsModal from '../components/Modals/Cms';

export default function CheckoutPage({ route} : { route: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [show, setShow] = React.useState(false);
    const [gift, setGift] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [paymentType, setPaymentType] = React.useState('');
    const [paymentChild, setPaymentChild] = React.useState('');
    const [isAddressModalVisible, setAdressModalVisible] = useState(false);
    const [isCmsModalVisible, setCmsModalVisible] = useState(false);
    const [data, setData] = useState({});
    const [url, setUrl] = useState<any>('');
    const [appUrl, setAppUrl] = useState<any>('');
    const [result, setResult] = useState('');
    const [refId, setRefId] = useState<any>('');
    const [giftMessage, setGiftMessage] = useState('');
    const [leaveMessage, setLeaveMessage] = useState('');
    const [cms, setCms] = useState<any>({});

    const handleClick = () => setShow(!show);

    const currency = useSelector((storeState: any) => storeState.session.currencySign);
    const cartId = useSelector((storeState: any) => storeState.cart.id_cart);
    const shopId = useSelector((storeState: any) => storeState.session.country.id_shop);
    const country = useSelector((storeState: any) => storeState.session.country);
    const user = useSelector((storeState: any) => storeState.session.user);
    const address = useSelector((storeState: any) => storeState.checkout.address);
    const carrier = useSelector((storeState: any) => storeState.checkout.address ? storeState.checkout.carrier[0] : '');
    const payment = useSelector((storeState: any) => storeState.checkout.payment);
    const product = useSelector((storeState: any) => storeState.checkout.product);
    const gift_wrap_id = useSelector((storeState: any) => storeState.checkout.id_gift);
    const gift_wrap= useSelector((storeState: any) => storeState.checkout.gift_wrap);
    const checkout= useSelector((storeState: any) => storeState.checkout);
    const total = useSelector((storeState: any) => storeState.checkout.total);

    useEffect(() => {

        const param = {
            gift: gift
        } 

        dispatch(getCartStep1(param))
        

    }, [])

    const toggleAddressModal = () => {
        setAdressModalVisible(!isAddressModalVisible);
    };

    const toggleCmsModal = async (key: any) => {
        setCmsModalVisible(!isCmsModalVisible);
        const response = await CmsService.getCmsDetails(key);
        const json = await response.json();
        setCms(json.data[0]);
    };

    const cartStep4 = async () => {
        console.log('param', cartId, paymentType, leaveMessage)
        const response = await CartService.cartStep4(cartId, paymentType, leaveMessage);
        const json = await response.json();

        // console.log('cartstep4', json.data)

        if (json.status == 200 && json.data) {
    
            setData(json.data);
            
            if (shopId == '1') {
                if (paymentType == '16') {
                    atome()
                } if (paymentType == '14') {
                    eghl(data)
                } else if (paymentType == '2' || paymentType == '3' || paymentType == '8') {
                    ipay(data)
                }
            } else if (shopId == '2') {
                if (paymentType == '4') {
                    eghl2(data)
                } else {
                    //enets
                }
            } else {
                if (paymentType == '1') {
                    // paypal
                } else {
                    // pay(data) // ipay88
                }
            }
          } else {
            // this.generalService.presentToast(response.data.message);
          }
    }

    const atome = async () => {

        const response = await PaymentService.atome(cartId);
        const json = await response.json();

        setUrl(json.data.redirect_url);
        setAppUrl(json.data.app_payment_url);
        setRefId(json.data.referenceId);

        handlePaymentURL(result == 'No' ? appUrl : url)
    }

    const paymentId =  () => {
    
        if (shopId == 1) { 
            if (paymentType == '2') {
                return paymentChild;
            }
        
            if (paymentType == '8') {
                return paymentChild;
            }
    
            if (paymentType == '3') { // Credit Card (MYR)
                return 2;
            }
    
        } else if(shopId == 2) { 
    
    
        } else if(shopId == 3) { 
    
            if(paymentType == '6') { //Credit Card (USD)
                return 25 ;
            }
    
        }
    
        return paymentType;
        
    };

    const eghl2 = async (data: any) => {

        const response = await PaymentService.eghl(data.id_order, user.id_customer);
        const json = await response.json();

        console.log('redirecteghl', json)

    }


    const ipay = (data: any) => {
        try {
            const merchantCode = 'M01333_S0001'
            const merchantKey = 'SSEXcXnvgK'

            const request: any = {
                paymentId: paymentId(),
                merchantKey: merchantKey,
                merchantCode: merchantCode,
                referenceNo: data.id_order,
                amount: data.totalPriceWt,
                currency: country.currency_iso_code,
                productDescription: "Reference No: " +data.id_order,
                userName: user.name,
                userEmail: user.email,
                userContact: "0123456789",
                remark: "Test",
                utfLang: "UTF-8",
                country: country.country_iso_code,
                backendUrl: "https://poplook.com/modules/ipay88induxive/backend_response.php",
            };
            
            const response = Pay(request);
            // console.log('result' ,response)

        } catch (e) {
            console.log(e);
        }
    };

    
    const eghl = (data: any) => {
        // console.log('eghl')

        try {
            const request : any = {
                TransactionType: 'SALE',
                Amount: data.totalPriceWt,
                CurrencyCode: country.currency_iso_code,
                PaymentID: cartId,
                OrderNumber: data.id_order,
                PaymentDesc: 'Reference No: ' +data.id_order,
                PymtMethod: 'ANY',
    
                CustEmail: user.email,
                CustName: user.name,
                CustPhone: '0123456789',
    
                MerchantName: 'Poplook',
                MerchantReturnURL: 'https://pay.e-ghl.com/IPGSG/Payment.aspx ',
    
                ServiceID: 'sit',
                Password: 'sit12345',
    
                LanguageCode: 'EN',
                PageTimeout: '600',
    
                Prod: false,
            }
            // console.log(request)
            const response = startPayment(request)
            // console.log('response' ,response)

        } catch (e) {
            console.log('error' ,e)
        }
    }

    return (
        <>
        <Flex flex={1} flexDirection="column" backgroundColor='white' margin={0}>
            <ScrollView>
                <View style={styles.container}>
                    {!address && 
                        <><TouchableOpacity onPress={toggleAddressModal}>
                            <Text style={styles.bold} marginY={3}>Please Add Address</Text>
                        </TouchableOpacity>
                       </> 
                    }
                    {address &&  
                        <><TouchableOpacity onPress={toggleAddressModal}>
                            <Address address={address} title='Shipping'></Address>
                        </TouchableOpacity>
                        </> 
                    }
                    <AddressModal 
                        visible={isAddressModalVisible}
                        onToggle={toggleAddressModal}
                        isCheckout={true}
                    />
                    <Divider/>

                {address && 
                    <><Text style={styles.bold} mt={2}>Shipping Method</Text>
                    <ShippingMethod carrier={carrier}></ShippingMethod>
                    <Divider/>
                    </>
                }

                <Text style={styles.bold} py={2}>Payment Method</Text>
                {/* <PaymentMethod payment={payment}></PaymentMethod> */}
                <Radio.Group name="paymentMethod" onChange={nextValue => {
                    setPaymentChild('')
                    setPaymentType(nextValue);
                    }}>
                    { payment.map((item: any) => {
                        return <>
                        <HStack>
                        <Radio value={item.id} my="1" backgroundColor={'white'} marginBottom={2} marginLeft={3} _text={{ color: 'black' }} size="sm">{item.name}</Radio><Spacer /><Box width="2/4" maxWidth="200">
                            
                            {item.id == 2 || item.id == 8 ?
                                <Select selectedValue={paymentChild} minWidth="190" placeholder="Select Payment Type" color={'black'} _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size={1} /> }} onValueChange={itemValue => setPaymentChild(itemValue)}>

                                {item.options.map((option: any) => {
                                    return (
                                        <Select.Item value={option.value} label={option.name} />

                                    );
                                })}
                                </Select>
                                
                            : ''}

                        </Box>
                        </HStack>
                        
                        </>
                    })}
                </Radio.Group>
                <Text color={'black'}>{paymentType} {paymentChild}</Text>
                <Spacer />

                <Checkbox value="terms" style={styles.checkbox} marginY={3}>
                    <Text color={'black'} fontSize={12}>I agree with the <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('term')}>Terms of Service</Link> and
                        <Link _text={{ color: '#1cad48', fontSize: 12 }} onPress={() => toggleCmsModal('privacypolicy')}> Privacy Policy</Link> and I adhere to them unconditionally.</Text>
                </Checkbox>
                <Divider/>

                <CmsModal 
                    visible={isCmsModalVisible}
                    onToggle={toggleCmsModal}
                    data={cms}
                />

               
                <Input marginY={3} placeholder="Enter voucher" InputRightElement={<Button size="sm" rounded="none" w="2/6" h="full" onPress={handleClick} backgroundColor={'#1cad48'}>APPLY</Button>}></Input>
                <HStack py={1}>
                    <Text style={styles.normal}>Gift Option</Text>
                    <Spacer/>
                    <Radio.Group
                    name="giftOption"
                    value={gift}
                    onChange={(nextValue) => {
                        setGift(nextValue);

                        const param = {
                            gift: gift,
                            gift_wrap_id: gift_wrap_id,
                            gift_message: giftMessage
                        } 

                        dispatch(getCartStep1(param))
                    }}
                    >
                    <HStack>
                    <Radio value="0" backgroundColor={'white'} marginBottom={2}  marginLeft={3} _text={{ color: 'black'}} size="sm">No</Radio>
                    <Radio value="1" backgroundColor={'white'} marginBottom={2}  marginLeft={3} _text={{ color: 'black'}} size="sm">Yes</Radio>
                    </HStack>
                    </Radio.Group>
                </HStack>

                { gift && (gift == '1') ? <>
                <VStack>
                <Box borderRadius={10}>
                    <HStack>
                        <AspectRatio w="40%" ratio={4/4}>
                            <Image resizeMode="cover" borderRadius={10} source={{uri: gift_wrap.product_val[gift_wrap_id].image_url_tumb[0]}}/>
                        </AspectRatio>
                
                        <VStack m={3} flexShrink={1}>
                            <Text color='black' fontSize={13}>{gift_wrap.product_val[gift_wrap_id].name}</Text>
                            <Text color='black' fontSize={13}>{currency} {Number(gift_wrap.product_val[gift_wrap_id].base_price).toFixed(2)}</Text>
                        </VStack>
                    </HStack>
                </Box>
                <TextArea marginY={3} value={giftMessage} onChangeText={text => setGiftMessage(text)} maxW="330" autoCompleteType={undefined} placeholder="Message on card" color={'black'}/>
                </VStack>
                </>: null}

                <HStack py={1}> 
                    <Text style={styles.normal}>Leave Message</Text>
                     <Spacer/>
                    <Radio.Group
                    name="message"
                    value={message}
                    onChange={(nextValue) => {
                        setMessage(nextValue);
                    }}
                    >
                    <HStack>
                    <Radio value="0" backgroundColor={'white'} marginBottom={2}  marginLeft={3} _text={{ color: 'black'}} size="sm">No</Radio>
                    <Radio value="1" backgroundColor={'white'} marginBottom={2}  marginLeft={3} _text={{ color: 'black'}} size="sm">Yes</Radio>
                    </HStack>
                    </Radio.Group>
                </HStack>

                { message && (message == '1') ? <>
                <VStack>
                <TextArea marginY={3} value={leaveMessage} onChangeText={text => setLeaveMessage(text)} maxW="330" autoCompleteType={undefined} placeholder="Type something here" color={'black'}/>
                </VStack>
                </>: null}

                <Divider/>
                
                <Text style={styles.bold} marginTop={3}>Shopping Bag</Text>  
                <ScrollView horizontal py={3}>
                    {product.map((item: any, index: any) => {
                        return <>
                            <Box key={index} marginRight={2}>
                                <AspectRatio w="100%" ratio={3/4} size={'130px'}>
                                    <ImageBackground
                                        source={{  uri: item.image_url }}
                                        style={{ flex: 1 }}
                                        borderRadius={10}
                                        resizeMode="cover">
                                            <View style={styles.quantity_view}>
                                                <Button size='sm' 
                                                    style={styles.quantity_chip}>
                                                    <Text 
                                                    style={styles.bold}>{'x' + item.quantity}</Text>
                                                </Button>
                                            </View>
                                        </ImageBackground>   
                                </AspectRatio>
                            </Box>
                            <Spacer />
                            </>;
                    })}
                </ScrollView>
                <Divider/>


                <HStack py={1}>
                    <Text style={styles.normal}>Retail Price :</Text>
                    <Spacer/>
                    <Text style={styles.normal}>{currency} {total}</Text>
                </HStack>
                <HStack py={1}>
                    <Text style={styles.normal}>Discount :</Text>
                    <Spacer/>
                    <Text style={styles.normal}>-</Text>
                </HStack>
                <HStack py={1}>
                    <Text style={styles.normal}>Store Credit :</Text>
                    <Spacer/>
                    <Text style={styles.normal}>-</Text>
                </HStack>
                <HStack py={1}>
                    <Text style={styles.normal}>Shipping fee :</Text>
                    <Spacer/>
                    <Text style={styles.normal}>-</Text>
                </HStack>
                </View>
            </ScrollView>

            <HStack style={{ marginHorizontal: 20 }}>
                <Text style={styles.total}>Total :</Text>
                <Spacer/>
                <Text style={styles.total}>{currency} {total}</Text>
            </HStack>

            <HStack style={{ height: 50, paddingVertical: 5, marginHorizontal: 20, marginVertical: 10 }}>
                <Button w={'100%'} style={styles.footer} onPress={() => cartStep4()}>PLACE ORDER</Button>  
            </HStack>
            
        </Flex>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
       paddingStart: 25,
       paddingEnd: 25,
       backgroundColor: 'white'
    },
    button: {
        borderRadius: 10,
        padding: 3,
        sizes: 'md', 
        backgroundColor: '#1cad48',
        marginTop: 8,
        marginBottom: 20
    },
    bold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    normal: {
        fontSize: 14,
        color: 'black'
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10
    },
    border: {
        borderBottomWidth: 1,
        borderColor: 'muted.100',
        paddingRight: 8
    },
    checkbox: {
        borderColor: 'black',
        backgroundColor: 'white'
    },
    footer: {
        backgroundColor: '#1cad48'
    },
    quantity_chip: {
        marginVertical: 3,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    quantity_view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    }
})


