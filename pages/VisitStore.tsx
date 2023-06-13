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
import BannerService from '../Services/BannerService';

export default function VisitStorePage({ route } : { route: any }) {

    const [stores, setStores] = useState<any>([]);

    useEffect(() => {
        const stores = async () => {
            const response = await BannerService.getStores();
            const json = await response.json();

            setStores(json.data);

            console.log('stores', json.data)

        }
        stores().catch(console.error);

    }, [])

    return (
        <>  
            <Flex flex={1} bg={'white'}>
                
               


            </Flex>
        </>
    )
}

const styles = StyleSheet.create({
    badge : {
        borderRadius: 10,
    }
})


