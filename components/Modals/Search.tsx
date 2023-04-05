import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Center, Button, Container, Divider, Flex, Heading, HStack, IconButton, Spacer, Stack, Text, VStack, FormControl, Input, ScrollView, Icon } from 'native-base';
import IonIcon from 'react-native-ionicons'

export default function SearchModal({ visible, onToggle, searchKeyword }: { visible: boolean, onToggle: any, searchKeyword: any }) {


    const [keyword, setKeyword] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true);

    const change = (prop: string) => {
        setKeyword(prop)
        if (prop.length > 2) {
            setDisabledBtn(false)
        } else {
            setDisabledBtn(true)
        }
        searchKeyword(prop);
    }

    const reset = () => {
        setKeyword('');
        setDisabledBtn(true)
    }

    useEffect(() => {
    }, [])

    const submit = () => {
        searchKeyword(keyword, true)
        reset()
    }

    return (
        <>
            <Modal
                presentationStyle='pageSheet'
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={onToggle}
            >
                <View style={{ flex: 1 }} >
                    <Flex direction="row-reverse">
                        <Button
                            variant="unstyled"
                            onPress={onToggle}
                            mr={3}
                            mt={1}
                            size="16"
                            bg="transparent"
                            _text={{
                                color: "coolGray.800"
                            }}
                        >
                            Cancel
                        </Button>
                    </Flex>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 9 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 9 }}>
                            <VStack space={4} alignContent="flex-start" mb={'auto'} alignItems="center">
                                <FormControl mt={3} w={"95%"}>
                                    <Input
                                        variant="filled"
                                        bg={"gray.100"}
                                        placeholder={"Search"}
                                        borderColor={"gray.100"}
                                        onChangeText={change}
                                        value={keyword}
                                        h={10}
                                        autoFocus
                                        _input={{
                                            color: "black"
                                        }}
                                        _focus={{
                                            borderColor: "transparent",
                                            backgroundColor: "gray",
                                        }}
                                        InputLeftElement={
                                            <Icon ml="2"
                                                size="4"
                                                color="gray.400"
                                                as={
                                                    <IonIcon name="search-outline" />
                                                }
                                            />
                                        }
                                        InputRightElement={
                                            <TouchableOpacity onPress={reset}>
                                                <Icon
                                                    m="2"
                                                    mr="3"
                                                    size="6"
                                                    color="gray.400"
                                                    as={<IonIcon name="close-outline" />}
                                                />
                                            </TouchableOpacity>
                                        }
                                    />
                                </FormControl>
                            </VStack>
                            <VStack space={4} alignContent="flex-end" alignItems="center">
                                <Button
                                    bg={'#1cad48'}
                                    style={styles.search}
                                    _text={{ fontSize: 14, fontWeight: 600 }}
                                    isDisabled={disabledBtn}
                                    onPress={submit}
                                >Search
                                </Button>
                            </VStack>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        backgroundColor: 'pink',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    button: {
        borderRadius: 10,
        padding: 6,
        sizes: 'md',
    },
    search: {
        borderRadius: 10,
        padding: 6,
        sizes: 'md',
        marginBottom: 70,
        width: '95%',
        height: 45,
    },
});