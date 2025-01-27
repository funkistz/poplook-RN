import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CategoryService from '../Services/CategoryService';
import { Center, Box, Text } from 'native-base';
import Menus from '../components/Menus';

export default function CategoriesPage({ route, navigation }: { route: any, navigation: any }) {

    const [categories, setCategories] = useState<any>(null);

    const categoriesTemp = JSON.stringify(categories);
    const categoriesJson = useMemo(() => JSON.parse(categoriesTemp), [categoriesTemp])


    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            const fetchData = async () => {
                const response = await CategoryService.getCategories();
                const json = await response.json();

                console.log('tempCat', json.data);

                setCategories(json.data);
            }
            fetchData().catch(console.error);
        });

        return unsubscribe;

    }, [])

    const isEqual = function (obj1: any, obj2: any) {
        const obj1Keys = Object.keys(obj1);
        const obj2Keys = Object.keys(obj2);

        if (obj1Keys.length !== obj2Keys.length) {
            return false;
        }

        for (let objKey of obj1Keys) {
            if (obj1[objKey] !== obj2[objKey]) {
                if (typeof obj1[objKey] == "object" && typeof obj2[objKey] == "object") {
                    if (!isEqual(obj1[objKey], obj2[objKey])) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }

        return true;
    };

    return (
        <Center style={{ height: "100%", width: "100%" }}>
            {!categoriesJson && <Text pt={10} color='black'>Loading...</Text>}
            {categoriesJson && <Menus categories={categoriesJson} ></Menus>}
        </Center>
    );
}