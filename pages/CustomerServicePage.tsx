import { StyleSheet, TouchableOpacity, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, HStack, Spacer, Flex, Center, Icon } from "native-base";
import { useIsFocused } from '@react-navigation/native';
import Spinner from '../components/Spinner';
import CmsService from '../Services/CmsService';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function CustomerServicePage({ route , navigation} : { route: any,  navigation: any }) {
    
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataCS, setDataCS] = useState<any>([]);

    const fetchData = async () => {
        const response = await CmsService.getCsDetails();
        const json = await response.json();
        setDataCS(json.data)
        setIsLoading(false)
    }

    const goToDetailsPage = (id: any, title: any, data: any) => {

        const params = {
            id: id,
            title: title,
            data: data
        };

        navigation.navigate('CustomerServiceDetailsPage', { screen: 'CustomerServiceDetailsPage', params });


    }

    useEffect(() => {
        setIsLoading(true)
        if(isFocused) {
            fetchData().catch(console.error);
        }
    }, [])

    return <>

        {isLoading && 
            <>
                <Center flex={1} justifyContent={'center'} alignItems={'center'} bg={'white'}>
                    <Spinner spin={true} />
                </Center>
            </>
        }

        {!isLoading && 
            <>
                <Flex flex={1} bg={'white'}>
                    <ScrollView>
                        <View style={styles.container}>
                            {dataCS.map((item:any, index:any) => {
                            return <TouchableOpacity key={index} onPress={() => goToDetailsPage(item.id_cms, item.meta_title, item)}>
                                <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" alignItems="center">
                                    <Text color="black" fontSize={16}>{item.meta_title}</Text>
                                    <Spacer />
                                    <IonIcon name="chevron-forward-outline" size={20} color="#777" />
                                </HStack>
                            </TouchableOpacity>
                        })}
                        </View>
                        
                    </ScrollView>
                </Flex>
            </>
        }
    </>
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    footer: {
        backgroundColor: '#1cad48'
    }
})