import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Flex, Center, Image, Box, VStack, IconButton, Icon, AspectRatio, Text, HStack, DeleteIcon, } from 'native-base';
// import ProductService from '../../Services/ProductService';
import { useNavigation } from '@react-navigation/native';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function Wishlist({ like = false, size }: { like: any, size: any }) {

    return (
        <>
            {like ? <IonIcon name='heart' size={size} color="red" /> : <IonIcon name='heart-outline' size={size} color="black" />}
            {/* <Ionicons name={ like ? "heart":"heart-outline"} size={size} color={ like ? "red":"black"} /> */}
        </>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
    },
})