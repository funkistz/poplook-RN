
import React, { useEffect, useState } from 'react';
import { Text, Input, FormControl, Icon, Select } from "native-base";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native';

function FormSelect({ name, variant = 'outline', placeholder, values, text, onChange, onBlur, touched, errors, icon, data, isRequired = false }: any) {
    return (<SafeAreaView style={{ flex: 1 }}>
        <FormControl isRequired={isRequired}>
            <FormControl.Label _text={{ color: "#666" }}>{text}</FormControl.Label>
            <Select size="lg"
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <IonIcon name='checkmark-outline' size={5} />
                }}
                placeholder={placeholder}
                selectedValue={values[name]}
                onValueChange={(value) => { onChange(name, value); }}
                onTouchEnd={() => onBlur(name)}
                color='#000'
            >
                {!!data && data.map((data1: any) => {
                    return <Select.Item label={data1.label} value={data1.value} />;
                })}

            </Select>
            <FormControl.ErrorMessage leftIcon={<IonIcon name='alert-outline' />}>
                Please make a selection!
            </FormControl.ErrorMessage>
        </FormControl>
    </SafeAreaView>);
}

export default FormSelect;