import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, TextInput, Dimensions } from 'react-native';
import { Center, Button, Container, Divider, Flex, Heading, HStack, IconButton, Spacer, Stack, Text, VStack, FormControl, Input, ScrollView, Icon, FlatList, Box, Badge } from 'native-base';
import { Chip, List } from 'react-native-paper';
import ProductService from '../../Services/ProductService';
import Spinner from '../Spinner';
import SizeList from '../Products/SizeList';

export default function StoreAvailabilityModal({ visible, onToggle, size, reference, product }: { visible: boolean, onToggle: any, size: any, reference: any, product: any }) {

    const win = Dimensions.get('window');

    const [available, setAvailable] = useState<any>([]);
    const [select, setSelect] = useState<any>('');
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    // }, [])

    useEffect(() => {

        setAvailable([])
        setSelect('')

        if (visible) {
            if (size.length == 0) {
                setIsLoading(true)
                getAvailability({ presta_reference: reference })
            }
        }
    }, [onToggle])


    const chooseSize = async (data: any) => {
        setSelect(data)
        setIsLoading(true)
        const params = {
            presta_reference: reference,
            size: data
        }

        getAvailability(params);
    }

    const getAvailability = async (params: any) => {
        const response = await ProductService.getStoreAvailability(params);
        const json = await response.json();

        if (json) {
            
            setIsLoading(false)
            setAvailable(json.length === 0  ? null : json)
        }

    }

    const getTextColor = (id_product_attribute: any) => {

        return (select != id_product_attribute) ? '#000' : '#fff';
    }

    useEffect(() => {

        
    }, [select])

    return (
        <>
            <Modal
                presentationStyle='pageSheet'
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={onToggle}
            >
                <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
                    <Text bold style={{ color: 'black', fontSize: 18 }}>Check in-store availability</Text>
                    <Text bold style={{ color: 'black', fontSize: 16 }} mt={2}>{product.name}</Text>
                    {size.length > 0 &&
                        <>
                            <Text color={'black'} my={4}>Please Select Size: </Text>
                            <Flex direction="row" flexWrap="wrap" justifyContent="flex-start" bg={'red'}>
                                {size && size.length > 0 && size.map((res: any, index: any) => {
                                    return <Button onPress={() => chooseSize(res.attribute_name)} key={index} style={styles.chip} variant="outline" size='sm'
                                        bg={(select == res.attribute_name) ? '#000' : '#fff'}
                                        borderColor={(select == res.attribute_name) ? '#000' : '#ccc'}
                                        width={(res.attribute_name.includes("Year") ? (win.width / 5) + 2 : (win.width / 6 - 2))}
                                        _text={{ color: getTextColor(res.attribute_name), fontSize: 13 }}
                                        >
                                        {res.attribute_name}
                                    </Button>
                                })}
                            </Flex>
                        </>
                    }

                    <Text style={{ color: 'gray', fontSize: 12, lineHeight: 16 }} mt={3}>*Availability is as 10 am this morning. Please call store to reserve this item.</Text>

                    {available &&
                        <>
                            <Box>
                                

                                {(!isLoading && available.length > 0) &&

                                    <>
                                        <Box style={{ height: 600 }}>
                                            <Text color={'black'} mt={4} pb={3}>Available at:</Text>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                {available.map((res: any) => {
                                                    return <>
                                                        <Divider bg={'blueGray.200'} />
                                                        <HStack mt={2}>
                                                            <Box w={'80%'}>
                                                                <Text color={'black'}>{res.store}</Text>
                                                            </Box>
                                                            <Box w={'20%'}>
                                                            </Box>
                                                        </HStack>
                                                        <Text style={{ color: 'gray', fontSize: 14 }} my={5}>{res.store_address}</Text>
                                                    </>

                                                })}
                                            </ScrollView>
                                        </Box>

                                    </>

                                }

                                {isLoading &&
                                    <>
                                        <Center>
                                            <Spinner spin={isLoading}></Spinner>
                                        </Center>
                                    </>
                                }

                            </Box>
                        </>
                    }

                    {!isLoading && available === null &&
                                    <>
                                        <Center>
                                            <Text color='gray.700' mt={4}>Not available in-stores</Text>
                                        </Center>
                                    </>
                                }
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    chip: {
        marginHorizontal: 2,
        marginBottom: 8,
    },
    text: {
        flexDirection: 'row',
        fontSize: 13,
        color: 'black',
    },

    stock: {
        color: 'white',
        backgroundColor: '#1cad48',
        textAlign: 'center',
        borderRadius: 10,
    }
});