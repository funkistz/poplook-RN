import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Input, FormControl, Icon } from "native-base";
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function InputLabel({ name, variant = 'outline', placeholder, values, text, onChangeText, onBlur, touched, errors, icon, type= 'text' }: any) {

    useEffect(() => {


    }, [])

    return (
        <FormControl mb={1}>
            {!!text && <FormControl.Label _text={{ color: "#666" }}>{text}</FormControl.Label>}
            <Input
                type={type}
                variant={variant}
                placeholder={placeholder}
                value={values[name]}
                onChangeText={onChangeText(name)}
                onBlur={() => onBlur(name)}
                style={styles.input}
                size="lg"
                InputLeftElement={icon ? <Icon as={IonIcon} name={icon} ml={2} color='#000' /> : <></>}
            />
            {touched[name] && errors[name] &&
                <Text style={{ fontSize: 10, color: '#FF0D10' }}>{errors[name]}</Text>
            }
        </FormControl>
    );
}

const styles = StyleSheet.create({
    input: {
        // fontSize: 15,
        // marginBottom: 10,
        // paddingStart: 30,
        color: 'black',

    }
})