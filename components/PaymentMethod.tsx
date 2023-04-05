import React, { useEffect, useState } from 'react';
import { HStack , Radio, Spacer, Select, CheckIcon, Box, Text} from 'native-base';
import { StyleSheet } from 'react-native';

export default function PaymentMethod({ payment }: any) {

    const [paymentType, setPaymentType] = React.useState('');
    const [paymentChild, setPaymentChild] = React.useState('');

    return (
        <>
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
        </>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    normal: {
        fontSize: 14,
        color: 'black'
    },
    checkbox: {
        borderColor: 'black',
        backgroundColor: 'white'
    }
})