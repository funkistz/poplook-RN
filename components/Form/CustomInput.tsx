import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Input, Icon, Button, ScrollView, Box, Flex } from "native-base";
import { Formik } from 'formik'
import * as yup from 'yup'
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function CustomInput({ name, variant = 'unstyled', placeholder, values, onChangeText, onBlur, icon, touched,
errors, type = 'text', readOnly = false, showIcon = true, autoCapitalize = "" }: any) {

    useEffect(() => {


    }, [])

    return (
        <>
            <Box w="100%" style={{borderBottomColor: '#dedede', borderBottomWidth: 1}}>
                <Input
                        variant={variant}
                        placeholder={placeholder}
                        value={values[name]}
                        onChangeText={onChangeText(name)}
                        onBlur={() => onBlur(name)}
                        style={styles.input}
                        type={type}
                        isReadOnly={readOnly}
                        InputLeftElement={
                            showIcon && (
                                <Icon as={IonIcon} name={icon} size={5} ml="2" color="muted.900" />
                            )
                        }
                        autoCapitalize={autoCapitalize}

                    />
                        
                </Box>
                {touched[name] && errors[name] &&
                    <Text style={{ fontSize: 10, color: '#FF0D10' }}>{errors[name]}</Text>
                }
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#1cad48',
        paddingTop: 80,
        fontSize: 28,
        fontWeight: '600',
        paddingBottom: 20
    },
    input: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 10,
        color: 'black',
        height: 45,
    },
    container: {
        padding: 30
    },
    right_section: {
        paddingLeft: 190,
        color: 'black',
        fontWeight: '400',
        paddingTop: 30,
        fontSize: 16,
        paddingBottom: 22
    },
    left_section: {
        padding: 15,
        color: 'black',
        fontSize: 16,
        fontWeight: '400'
    },
    button: {
        borderRadius: 10,
        padding: 3,
        sizes: 'md'
    }
})