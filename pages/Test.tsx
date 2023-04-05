import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import BannerService from '../services/BannerService';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
    image: {
        width: '200',
        height: win.height,
    },
});

export default function TestPage() {

    const [banners, setBanners] = useState([]);

    useEffect(() => {


        // BannerService.getBanners();

        const fetchData2 = async () => {
            const response = await BannerService.getBanners();
            const json = await response.json();

            console.log(json.data);
            setBanners(json.data);
        }
        fetchData2().catch(console.error);

    }, [])


    return (
        <></>
    );
}