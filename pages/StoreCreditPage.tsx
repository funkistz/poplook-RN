import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Image, Linking } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, VStack, Box, AspectRatio, Container, FormControl, Radio, Stack, Input, Divider, Checkbox, Link, Select, CheckIcon, Center } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../Redux/Slices/Sessions';
import StoreCreditService from '../Services/StoreCreditService';
import { useIsFocused } from '@react-navigation/native';
import Spinner from '../components/Spinner';

export default function StoreCreditPage({ route } : { route: any }) {


    const { user } = useSelector(userSelector);
    const isFocused = useIsFocused();
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {

        const response = await StoreCreditService.getStoreCredit({id_customer: user.id_customer });
        const json = await response.json();

        console.log('json', json)

        if(json.code == 404) {
            setData([]);
        } else {
            setData([...json.data.lists])
        }

        setIsLoading(false)
        console.log('isLoading: ', isLoading)
    }

    useEffect(() => {
        console.log('isLoading: ', true)
        if(isFocused) {
            console.log('Enter StoreCreditService......', user)
            fetchData().catch(console.error);
        }

    }, [])

    return (
        <>

            { isLoading && <Spinner spin={!isLoading}/>}

            { !isLoading && 
                <>
                    {data && data.length > 0 && 
                        <>
                            <Text color={'black'} mt={5}>Ada</Text>
                        </> 
                    }

                    {data && data.length == 0 && 
                        <>
                            <View style={{flex:1,justifyContent: "center",alignItems: "center", backgroundColor: 'white'}}>
                                <View style={{flexDirection: 'row', marginBottom: 2}}>
                                    <Text color='black' bold fontSize={20}>No Result</Text>
                                </View>
                                <Text color='black' fontSize={13}>Sorry, you do not have any available </Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text color='black' fontSize={13}>store credit code.</Text>
                                </View>
                            </View>
                        </> 
                    }
                    
                </>
            }


            
        </>
    )
}

const styles = StyleSheet.create({
    
})


