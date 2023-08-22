import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Center, Button, Container, Divider, Flex, Heading, HStack, IconButton, Spacer, Stack, Text, VStack, FormControl, Input, ScrollView, Icon, FlatList, Box, SectionList } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

export default function FilterModal({ visible, onToggle, submitBtn, sortData, attributeData, colorData, sortClick, attributeClick, clearAllClick, selectedSort, selectedAttribute, selectedColor }:
    {
        visible: boolean, onToggle: any, submitBtn: any,
        sortData: any, attributeData: any, colorData: any,
        sortClick: any, attributeClick: any, clearAllClick: any,
        selectedSort: any, selectedAttribute: any, selectedColor: any
    }) {

    // const getTextColor = (item: any) => {

    //     // return (sizeSelected != id_product_attribute) ? '#000' : '#fff';
    // }

    const sizes = useSelector((storeState: any) => storeState.filter.sizes);
    const colors = useSelector((storeState: any) => storeState.filter.colors);

    const [section1, setSection1] = useState([]);
    const [section2, setSection2] = useState([]);
    const [section3, setSection3] = useState([]);

    // Action
    const submit = () => {
        submitBtn(true)
    }

    const categorizeData = () => {

        const section1Data: any = [];
        const section2Data: any = [];
        const section3Data: any = [];
    
        sizes.forEach((item: any) => {
            if (item.section === 1) {
                section1Data.push(item);
            } else if (item.section === 2) {
                section2Data.push(item);
            } else if (item.section === 3) {
                section3Data.push(item);
            }
        });

        setSection1(section1Data);
        setSection2(section2Data);
        setSection3(section3Data);
    };


    useEffect(() => {
        categorizeData()
    }, [])


    return (
        <>
            <Modal
                presentationStyle='pageSheet'
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={onToggle}
            >
                <Flex flex={1} safeAreaBottom>

                    <View style={{ flex: 1 }} >
                        <HStack px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="100%" color="purple.100">
                            <HStack alignItems="center" w="30%"></HStack>
                            <Center w="40%">
                                <Text fontSize="16" fontWeight="500" color="black" >
                                    FILTER/SORT
                                </Text>
                            </Center>
                            <HStack justifyContent="flex-end" w="30%">
                                <IconButton
                                    onPress={onToggle}
                                    mr={3}
                                    _pressed={{
                                        backgroundColor: "white"
                                    }}
                                >
                                    <IonIcon name='close-outline' size={20} color='black' />
                                </IconButton>
                            </HStack>
                        </HStack>
                    </View>

                    <View style={{ flex: 10, paddingHorizontal: 10, }} >
                        <ScrollView>
                            <Text fontSize={16} color={'muted.700'} ml={3} my={3}>{sortData.title} </Text>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {sortData.data.map((item: any, index: any) => {
                                    return <Box w={'70%'} px={1} key={index}>
                                        <Button size='sm' variant="outline"
                                            style={selectedSort == item.id ? styles.btnClicked : styles.btn}
                                            onPress={() => sortClick(item.id)}
                                            _pressed={{
                                                backgroundColor: "white"
                                            }}
                                        >
                                            <Text style={selectedSort == item.id ? styles.TextClicked : styles.Text}> {item.name}</Text>
                                        </Button>
                                    </Box>
                                })}
                            </View>

                            <Text fontSize={16} color={'muted.700'} ml={3} my={3}>Select Size: </Text>

                            <Text fontSize={14} color={'muted.700'} ml={3} mb={1}>Women</Text>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {section1.map((item: any, index: any) => {
                                    return <Box w={'25%'} px={1} key={index}>
                                        <Button size='sm' variant="outline"
                                            style={selectedAttribute.includes(item.id_combination) ? styles.btnClicked : styles.btn}
                                            onPress={() => attributeClick({ data: item.id_combination, type: 'attribute' })} _pressed={{backgroundColor: "white" }} >
                                            <Text style={selectedAttribute.includes(item.id_combination) ? styles.TextClicked : styles.Text}> {item.name}</Text>
                                        </Button>
                                    </Box>
                                })}
                            </View>

                            <Text fontSize={14} color={'muted.700'} ml={3} mt={2} mb={1}>Kids</Text>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {section2.map((item: any, index: any) => {
                                    return <Box w={'25%'} px={1} key={index}>
                                        <Button size='sm' variant="outline"
                                            style={selectedAttribute.includes(item.id_combination) ? styles.btnClicked : styles.btn}
                                            onPress={() => attributeClick({ data: item.id_combination, type: 'attribute' })} _pressed={{backgroundColor: "white" }} >
                                            <Text style={selectedAttribute.includes(item.id_combination) ? styles.TextClicked : styles.Text}> {item.name}</Text>
                                        </Button>
                                    </Box>
                                })}
                            </View>

                            <Text fontSize={14} color={'muted.700'} ml={3} mt={2} mb={1}>Shoes</Text>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {section3.map((item: any, index: any) => {
                                    return <Box w={'25%'} px={1} key={index}>
                                        <Button size='sm' variant="outline"
                                            style={selectedAttribute.includes(item.id_combination) ? styles.btnClicked : styles.btn}
                                            onPress={() => attributeClick({ data: item.id_combination, type: 'attribute' })} _pressed={{backgroundColor: "white" }} >
                                            <Text style={selectedAttribute.includes(item.id_combination) ? styles.TextClicked : styles.Text}> {item.name}</Text>
                                        </Button>
                                    </Box>
                                })}
                            </View>

                            <Text fontSize={16} color={'muted.700'} ml={3} my={3}>Select Color: </Text>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {colors.map((item: any, index: any) => {
                                    return <Box w={'25%'} px={1} key={index}>
                                        <Button size='sm' variant="outline"
                                            style={selectedColor.includes(item.id_combination) ? styles.btnClicked : styles.btn}
                                            onPress={() => attributeClick({ data: item.id_combination, type: 'color' })} _pressed={{backgroundColor: "white" }} >
                                            <Text style={selectedColor.includes(item.id_combination) ? styles.TextClicked : styles.Text}> {item.name}</Text>
                                        </Button>
                                    </Box>

                                })}
                            </View>
                        </ScrollView>
                    </View>

                    <View style={{ flex: 1, marginBottom: 10 }} >
                        <HStack px={2} pt={3} justifyContent="space-between" alignItems="center" w="100%" maxW="100%">
                            <HStack alignItems="center" w="50%">
                                <Button
                                    variant="outline"
                                    mb={10}
                                    w="95%"
                                    h={12}
                                    style={styles.btnFooter}
                                    bg={'muted.100'}
                                    borderColor='muted.100'
                                    _text={{ fontSize: 14, fontWeight: 600, color: 'black' }}
                                    onPress={() => clearAllClick()}
                                    _pressed={{  backgroundColor: 'muted.100' }}
                                >Clear All
                                </Button>
                            </HStack>
                            <HStack justifyContent="flex-end" w="50%">
                                <Button
                                    bg={'#1cad48'}
                                    mb={10}
                                    w="95%"
                                    h={12}
                                    color={"black"}
                                    style={styles.btnFooter}
                                    _text={{ fontSize: 14, fontWeight: 600 }}
                                    _pressed={{  backgroundColor: '#1cad48' }}
                                    onPress={submit}
                                >Apply
                                </Button>
                            </HStack>
                        </HStack>

                    </View>
                </Flex>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    btnFooter: {
        borderRadius: 8,
        padding: 6,
        sizes: 'md'
    },

    btn: {
        marginVertical: 3,
        borderRadius: 8,
        alignItems: 'center',
        borderColor: '#ccc'
    },

    btnClicked: {
        marginVertical: 3,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#000',
    },
    Text: {
        fontSize: 12,
        color: '#000',

    },
    TextClicked: {
        fontSize: 12,
        color: '#fff',

    }



});