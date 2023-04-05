import React, { useEffect, useState } from 'react';
import { Box, HStack, IconButton, Icon, StatusBar, Text, Center, Flex } from 'native-base';
import { IoArrowBack } from "react-icons/io5";

export default function LeftHeader({ navigation }: any) {

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <>
            {navigation.canGoBack() &&
                <IconButton icon={<IoArrowBack size={24} color="black" />} onPress={goBack} />
            }
        </>
    );
}