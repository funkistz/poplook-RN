import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Input } from "native-base";

export default function InputLabel({ name, variant = 'underlined', placeholder, values, text, onChangeText, onBlur, touched, errors }: any) {

    useEffect(() => {


    }, [])

    return (
        <>
            <Input
                variant={variant}
                placeholder={placeholder}
                value={values[name]}
                onChangeText={onChangeText(name)}
                onBlur={() => onBlur(name)}
                style={styles.input}
                InputLeftElement={<Text color={'black'} fontWeight={'400'} fontSize={15}>{text}</Text>}
            />
            {touched[name] && errors[name] &&
                <Text style={{ fontSize: 10, color: '#FF0D10' }}>{errors[name]}</Text>
            }
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 15,
        paddingBottom: 10,
        paddingStart: 30,
        color: 'black',

    }
})