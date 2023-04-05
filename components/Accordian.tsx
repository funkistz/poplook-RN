import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { Box, HStack, VStack } from 'native-base';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Accordion = ({ title, children }: { title: any, children: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleAccordion} activeOpacity={1} style={styles.titleContainer}>
                <VStack>
                    <HStack>
                        <Box width={'90%'} backgroundColor='red' pt={1}>
                            <Text style={styles.title}>{title}</Text>
                        </Box>
                        <Box width={'10%'} backgroundColor='red'>
                            {isExpanded ? <FaChevronUp size={30} color="#333" /> : <FaChevronDown size={30} color="#333" />}
                        </Box>
                    </HStack>
                </VStack>
            </TouchableOpacity>
            {isExpanded && <View style={styles.content}>{children}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    titleContainer: {
        padding: 0,
        margin: 0,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    content: {
        // padding: 10,
        // backgroundColor: 'pink',
        // width: '100%',
        paddingBottom: 20,
    },
});

export default Accordion;
