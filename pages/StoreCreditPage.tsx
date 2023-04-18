import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { Text, ScrollView, View, HStack, Button, Spacer, VStack, Flex, FlatList, Badge, useClipboard } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../Redux/Slices/Sessions';
import StoreCreditService from '../Services/StoreCreditService';
import { useIsFocused } from '@react-navigation/native';
import Spinner from '../components/Spinner';
import moment from 'moment';
import GeneralService from '../Services/GeneralService';

export default function StoreCreditPage({ route } : { route: any }) {


    const { user } = useSelector(userSelector);
    const isFocused = useIsFocused();
    const [list, setList] = useState<any>([]);
    const [currency, setCurrency] = useState<any>();
    const { value, onCopy } = useClipboard();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {

        const response = await StoreCreditService.getStoreCredit(user.id_customer);
        const json = await response.json();


        if(json.code == 200) {
            setList(json.data.lists)
            setCurrency(json.data.currency)
        } else {
            setList(null)
            setCurrency(null)
        }
        setIsLoading(false)
    }

    const clipboard = (code: any) => {
        onCopy(code);
        GeneralService.toast({ description: 'Copy to Clipboard' });
    }

    useEffect(() => {
        setIsLoading(true)
        if(isFocused) {
            fetchData().catch(console.error);
        }

    }, [])

    return (
        <>  
            <Flex flex={1} bg={'white'}>
                { isLoading && <>
                    <HStack backgroundColor={'white'} h={'100%'}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Spinner spin={isLoading}/>
                        </View>
                    </HStack>
                </>}

                { !isLoading && 
                    <>
                        {list && currency && list.length > 0 && 
                            <>
                                <FlatList 
                                        numColumns={1}
                                        data={list}
                                        px={2}
                                        mt={4}
                                        renderItem={
                                            ({item}:any) => 
                                            <TouchableOpacity onPress={() => clipboard(item.code)}>
                                                <HStack _dark={{ borderColor: "#dedede" }} borderColor="muted.100"  pb={4} m={4} alignItems="center" borderBottomWidth={1}>
                                                    <VStack>
                                                        <Text color="black" fontSize={16}>{item.code}</Text>
                                                        <Text color="black" fontSize={16} bold>{currency.sign} {item.reduction_amount}</Text>
                                                        <Text color={'gray.500'} fontSize={12}>Valid until: {moment(item.date_to ).format('DD MMMM YYYY h:mm:ss a')}</Text>
                                                    </VStack>
                                                    <Spacer />
                                                    {value == item.code &&  <Badge style={styles.badge} size={18} colorScheme="success" variant={'solid'}>Copied</Badge>}

                                                    {value != item.code &&  <Badge style={styles.badge} size={18}>Copy</Badge>}
                                                </HStack>
                                            </TouchableOpacity>
                                            }
                                    />
                            </> 
                        }

                        {list == null && 
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
            </Flex>
        </>
    )
}

const styles = StyleSheet.create({
    badge : {
        borderRadius: 10,
    }
})


