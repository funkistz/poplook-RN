import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, Box, AspectRatio, Radio, Input, Divider, Checkbox, Link, VStack, Select, CheckIcon } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCartStep1, getCartStep2 } from '../Redux/Slices/Checkout';
import Address from '../components/Address';
import PaymentMethod from '../components/PaymentMethod';
import ShippingMethod from '../components/ShippingMethod';
import AddressModal from '../components/Modals/AddressList';
import { addressSelectedSelector } from '../Redux/Slices/AdressSelected';

export default function CheckoutPage({ route} : { route: any }) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [show, setShow] = React.useState(false);
    const [gift, setGift] = React.useState('');
    const [message, setMessage] = React.useState('one');
    const [paymentType, setPaymentType] = React.useState('');
    const [paymentChild, setPaymentChild] = React.useState('');

    const handleClick = () => setShow(!show);

    
    const currency = useSelector((storeState: any) => storeState.session.currencySign);
    const cartId = useSelector((storeState: any) => storeState.cart.id_cart);
    const address = useSelector((storeState: any) => storeState.checkout.address);
    const carrier = useSelector((storeState: any) => storeState.checkout.address ? storeState.checkout.carrier[0] : '');
    const payment = useSelector((storeState: any) => storeState.checkout.payment);
    const product = useSelector((storeState: any) => storeState.checkout.product);
    const gift_wrap_id = useSelector((storeState: any) => storeState.checkout.id_gift);
    const gift_wrap= useSelector((storeState: any) => storeState.checkout.gift_wrap);
    const checkout= useSelector((storeState: any) => storeState.checkout);
    const total = useSelector((storeState: any) => storeState.checkout.total);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {

        const param = {
            gift: gift
        } 
        dispatch(getCartStep1(param))
        console.log('carrier' ,checkout)
        console.log('giftid' ,gift_wrap_id)
        console.log('gift' ,gift_wrap)
        

    }, [])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {!address && 
                        <><TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.bold} marginY={3}>Please Add Address</Text>
                        </TouchableOpacity>
                       </> 
                    }
                    {address &&  
                        <><TouchableOpacity onPress={toggleModal}>
                            <Address address={address} title='Shipping'></Address>
                        </TouchableOpacity>
                        </> 
                    }
                    <AddressModal 
                        visible={isModalVisible}
                        onToggle={toggleModal}
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
                    <Text color={'black'} fontSize={12}>I agree with the <Link _text={{ color: '#1cad48', fontSize: 12 }}>Terms of Service</Link> and
                        <Link _text={{ color: '#1cad48', fontSize: 12 }}> Privacy Policy</Link> and I adhere to them unconditionally.</Text>
                </Checkbox>
                <Divider/>

               
                <Input marginY={3} placeholder="Enter voucher" InputRightElement={<Button size="sm" rounded="none" w="2/6" h="full" onPress={handleClick} backgroundColor={'#1cad48'}>APPLY</Button>}></Input>
                <HStack py={1}>
                    <Text style={styles.normal}>Gift Option{gift}</Text>
                    <Spacer/>
                    <Radio.Group
                    name="giftOption"
                    value={gift}
                    onChange={(nextValue) => {
                        setGift(nextValue);

                        const param = {
                            gift: gift
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
                        <AspectRatio w="40%" ratio={3/4}>
                            <Image resizeMode="cover" borderRadius={10} source={{uri: checkout.gift_wrap[gift_wrap_id].image_url_tumb[0]}}/>
                        </AspectRatio>
                
                        <VStack m={3} flexShrink={1}>
                            <Text color='black' fontSize={13}>{checkout.gift_wrap[gift_wrap_id].name}</Text>
                            <Text color='black' fontSize={13}>{currency} {checkout.gift_wrap[gift_wrap_id].base_price}</Text>
                        </VStack>
                    </HStack>
                </Box>
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
                <Divider/>
                

                <Text style={styles.bold} marginTop={3}>Shopping Bag</Text>  
                <ScrollView horizontal py={3}>
                    {product.map((item: any, index: any) => {
                        return <>
                            <Box key={index}>
                                <AspectRatio w="100%" ratio={3/4} size={'130px'}>
                                    <Image resizeMode="cover" borderRadius={10} source={{ uri: item.image_url }} />
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
                    <Text style={styles.normal}>{total}</Text>
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
        </>
    )
}

const styles = StyleSheet.create({
    container: {
       paddingStart: 25,
       paddingEnd: 25
    },
    button: {
        borderRadius: 10,
        padding: 3,
        sizes: 'md'
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
    border: {
        borderBottomWidth: 1,
        borderColor: 'muted.100',
        paddingRight: 8
    },
    checkbox: {
        borderColor: 'black',
        backgroundColor: 'white'
    }
    
})


