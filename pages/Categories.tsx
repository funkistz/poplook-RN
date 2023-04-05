import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CategoryService from '../Services/CategoryService';
import { Center, Box, Text } from 'native-base';
import Menus from '../components/Menus';

export default function CategoriesPage({ route, navigation }: { route: any, navigation: any }) {

    const [categories, setCategories] = useState(null);

    useEffect(() => {

        // const unsubscribe = navigation.addListener('focus', () => {

        const fetchData = async () => {
            const response = await CategoryService.getCategories();
            const json = await response.json();

            // console.log('data', json.data);
            setCategories(json.data);
        }
        fetchData().catch(console.error);
        // });

        // return unsubscribe;

    }, [])

    return (
        <Center style={{ height: "100%", width: "100%" }}>
            {!categories && <Text pt={10} color='black'>Loading...</Text>}
            {categories && <Menus categories={categories} ></Menus>}
        </Center>
    );
}