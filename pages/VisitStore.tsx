import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, ScrollView, View, HStack, Center, Box } from "native-base";
import BannerService from '../Services/BannerService';
import FullWidthImage from 'react-native-fullwidth-image';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function VisitStorePage({ route } : { route: any }) {

    const [stores, setStores] = useState<any>([]);

    const details = [
    { id: 0, title: 'THE CURVE', address: 'Lot G17A Ground Floor, The Curve, Jalan PJU7/3, Mutiara Damansara, 47800 Petaling Jaya, Selangor', contact: '03-7610 4310' },
    { id: 1, title: 'SETIA CITY MALL', address: 'L1-42 & 43, Level 1, Setia City Mall, No. 7, Persiaran Setia Dagang, Bandar Setia Alam, Seksyen U13 Setia Alam, 40170, Shah Alam, Selangor Darul Ehsan', contact: '03-33590100' },
    { id: 2, title: 'KL EAST MALL', address: 'G1-03A, Ground Floor 1, KL East Mall, 823, Lingakaran Tengah 2, KL Timur, Kuala Lumpur, 53100 Malaysia', contact: '03-4162 7297' },
    { id: 3, title: 'AEON SHAH ALAM', address: 'No. 1, Jalan Akuatik 13/64, Seksyen 13, 40100 Shah Alam, Selangor', contact: '03-5524 1219' },
    { id: 4, title: 'SOGO', address: '3rd Floor Fashion Arena, Kompleks Sogo 90, Jalan Tuanku Abdul Rahman, 50100 Kuala Lumpur, Wilayah Persekutuan', contact: '03-26021050' },
    { id: 5, title: 'IOI PUTRAJAYA', address: 'L1-11C, IOI City Mall, Lebuh IRC, IOI Resort, 62502 Putrajaya', contact: '03-89574872' },
    { id: 6, title: 'AEON MALL TEBRAU', address: 'Lot No. F23, No.1, Jalan Desa Tebrau,Taman Desa Tebrau, 81100 Johor Bahru, Johor', contact: '07-2912404' }
    ]

    useEffect(() => {
        fetchData()

    }, [])

    const fetchData = async () => {
        const response = await BannerService.getStores();
        const json = await response.json();

        const startIndex = 1;
        const existingArray = json.data
        const newArray = details;
        const concatenatedArray = existingArray.slice(startIndex).map((obj: any, index: any) => ({ ...obj, ...newArray[index] }));

        setStores(concatenatedArray)
    }

    return (
        <>  
            <ScrollView p={6}>
                <View style={{ flex: 1, paddingVertical: 20, marginBottom: 10 }}>
                {stores.map((item: any, index: any) => {
                    return <>
                        <HStack>
                            <Box w={'100%'} mb={5}>
                                <Center>
                                    <FullWidthImage  source={{ uri: item.href }} key={index}/>
                                    
                                </Center>
                            </Box>
                        </HStack>
                        <HStack justifyContent={'center'}>
                            <Text color={'black'} fontWeight={'bold'}>{ item.title }</Text>
                        </HStack>
                        <HStack justifyContent={'center'}>
                            <Text color={'black'} textAlign={'center'}>{ item.address }</Text>
                        </HStack>
                        <HStack justifyContent={'center'} mb={5}>
                            <Text color={'black'}><IonIcon name="call" size={18} color="black" /> { item.contact }</Text>
                        </HStack>
                    </>
                    })
                }
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    badge : {
        borderRadius: 10,
    },
    rewardsImg : {
        width: 60,
        height: 60,
    },
})


