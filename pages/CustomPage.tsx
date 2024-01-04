import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../Services/BannerService';
import { ScrollView } from 'native-base';
import BlockCreator from '../components/Banner/BlockCreator';

export default function CustomPage({ route, navigation } : { route: any, navigation: any }) {

    const [pages, setPages] = useState<any>([]);

    useEffect(() => {

        navigation.setOptions({ title: route.params.params.page_name });
    
        const getCustomPage = async () => {
            const response = await BannerService.getCustomPage(route.params.params.page_url);
            let json = await response.data

            setPages(json.data.data);
        }

        getCustomPage().catch(console.error);

            
    }, [])

    return (
        <ScrollView w='100%'>

            {pages.map((data: any, index: any) => {

                return <BlockCreator data={data} key={index}/>

            })}
    
        </ScrollView>
      );
}

const styles = StyleSheet.create({
});



