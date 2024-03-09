import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductCard";
import { Box } from 'native-base'

const ListComponent = ({ item, addtoWishlist } : any) => {
    return <>
        <Box w="50%">
            <ProductCard product={item} openWishlist={addtoWishlist}></ProductCard>
        </Box>
    </>
};

export default ListComponent;