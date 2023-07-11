import React, { useEffect, useState } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Text, ScrollView, View, HStack, Center, Box } from "native-base";
import BannerService from '../Services/BannerService';
import FullWidthImage from 'react-native-fullwidth-image';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function VisitStorePage({ route } : { route: any }) {

    const [stores, setStores] = useState<any>([]);

    const details = [
    { id: 0, title: 'THE CURVE', address: 'Lot G17A Ground Floor, The Curve, Jalan PJU7/3, Mutiara Damansara, 47800 Petaling Jaya, Selangor', contact: '03-76104310', direction: 'https://www.google.com/maps/place/Poplook/@3.1583586,101.6118199,18z/data=!4m6!3m5!1s0x31cc4f2c66ba371b:0x74e2db52c2fa07cc!8m2!3d3.1583101!4d101.6125244!16s%2Fg%2F11g6nh0302?entry=ttu' },
    { id: 1, title: 'SETIA CITY MALL', address: 'L1-42 & 43, Level 1, Setia City Mall, No. 7, Persiaran Setia Dagang, Bandar Setia Alam, Seksyen U13 Setia Alam, 40170, Shah Alam, Selangor Darul Ehsan', contact: '03-33590100', direction: 'https://www.google.com/maps/dir//Poplook,+Setia+City+Mall,+L1-42+%26+43,+Level+1+No+7,+Persiaran+Setia+Dagang+Seksyen+U13,+Setia+Alam,+40170+Shah+Alam,+Selangor/@3.1090469,101.4613571,19z/data=!4m8!4m7!1m0!1m5!1m1!1s0x31cc53e9c98e0f01:0x3d4ecd63298a28af!2m2!1d101.4612447!2d3.1089231?entry=ttu' },
    { id: 2, title: 'KL EAST MALL', address: 'G1-03A, Ground Floor 1, KL East Mall, 823, Lingakaran Tengah 2, KL Timur, Kuala Lumpur, 53100 Malaysia', contact: '03-41627297', direction: 'https://www.google.com/maps/place/Poplook/@3.2250946,101.7296822,21z/data=!4m5!3m4!1s0x31cc3944580161e9:0x41d70fa65132a268!8m2!3d3.225096!4d101.7296004' },
    { id: 3, title: 'AEON SHAH ALAM', address: 'No. 1, Jalan Akuatik 13/64, Seksyen 13, 40100 Shah Alam, Selangor', contact: '03-55241219', direction: 'https://www.google.com/maps/search/POPLOOK+AEON+MALL+SHAH+ALAM,+Jalan+Akuatik+13%2F64,+Seksyen+13,+Shah+Alam,+Selangor/@3.0925083,101.4876045,14z/data=!3m1!4b1'},
    { id: 4, title: 'SOGO', address: '3rd Floor Fashion Arena, Kompleks Sogo 90, Jalan Tuanku Abdul Rahman, 50100 Kuala Lumpur, Wilayah Persekutuan', contact: '03-26021050', direction: 'https://www.google.com/maps/place/Poplook/@3.1531919,101.6947538,17z/data=!3m1!4b1!4m5!3m4!1s0x31cc49375fa111cd:0x3835434960da81c3!8m2!3d3.1531919!4d101.6969425' },
    { id: 5, title: 'IOI PUTRAJAYA', address: 'L1-11C, IOI City Mall, Lebuh IRC, IOI Resort, 62502 Putrajaya', contact: '03-89574872', direction: 'https://www.google.com/maps/place/Poplook+@+IOI+City+Mall/@2.969528,101.710773,17z/data=!4m5!3m4!1s0x31cdcbbb4944d941:0x67856eb83064eb9f!8m2!3d2.969528!4d101.7129617' },
    { id: 6, title: 'AEON MALL TEBRAU', address: 'Lot No. F23, No.1, Jalan Desa Tebrau,Taman Desa Tebrau, 81100 Johor Bahru, Johor', contact: '07-2912404', direction: 'https://www.google.com/maps/place/%C3%86ON+Mall+Tebrau+City/@1.5497211,103.7942258,17z/data=!4m6!3m5!1s0x31da6d5d43ea04b1:0xab1c2215020bf517!8m2!3d1.5490981!4d103.7964063!15sChhwb3Bsb29rIGFlb24gbWFsbCB0ZWJyYXVaGiIYcG9wbG9vayBhZW9uIG1hbGwgdGVicmF1kgEPc2hvcHBpbmdfY2VudGVy4AEA?coh=164777&entry=tt&shorturl=1' }
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

    const phoneCall = (number: any) => {

        const phoneNumber = `tel:${number}`;
        Linking.openURL(phoneNumber);

    };

    const getDirection = (location: any) => {

        const direction = location;
        Linking.openURL(direction);

    };

    return (
        <>  
            <ScrollView p={6}>
                <View style={{ flex: 1, paddingVertical: 5, marginBottom: 10 }}>
                {stores.map((item: any, index: any) => {
                    return <>
                        <HStack>
                            <Box w={'100%'} mb={2}>
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
                        <HStack justifyContent={'center'}>
                            <IonIcon name="call" size={18} color="#1cad48" />
                            <Text underline onPress={() => phoneCall(item.contact)} color={'#1cad48'}> { item.contact }</Text>
                        </HStack>
                        <HStack justifyContent={'center'} mb={8} mt={1}>
                            <IonIcon name="location" size={18} color="#1cad48"/>
                            <Text underline onPress={() => getDirection(item.direction)} color={'#1cad48'}>Direction</Text>
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


