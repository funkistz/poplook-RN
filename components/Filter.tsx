import { Box, HStack, VStack, Skeleton, IconButton, Text, View, Icon, ScrollView } from 'native-base';
import { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function Filter({ clicked, removeItem, product, listSizeColor }: { clicked: any, removeItem: any, product: any, listSizeColor: any }) {


    // action
    const close = (item: any) => {
        removeItem(item);
    }

    const findName = (item: any) => {
        const find = listSizeColor.findIndex((x: any) => x.id_combination === item);

        const result = listSizeColor[find];

        return <>
            <Text style={styles.chipText}>{result.name}</Text>
        </>
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <HStack px="1" pt="3" pb={product.length > 0 ? 0 : 3} justifyContent="space-between" alignItems="center" w="100%" maxW="100%" backgroundColor={'white'}>
                <HStack alignItems="center" w="40%">
                    <Text fontSize="15" color="dark" pl={2}> Products</Text>
                </HStack>
                <HStack justifyContent="flex-end" w="30%" alignItems={'center'} mr={3}>
                    <TouchableOpacity onPress={clicked} >
                        <HStack>
                            <Text fontSize="15" color="dark" pr={2} >Filter</Text>
                            <Icon as={<IonIcon name='filter-outline' />} size="5" color={'black'} />
                        </HStack>
                    </TouchableOpacity>
                </HStack>
            </HStack>

            {product.length > 0 &&
                <HStack alignItems="center" w="100%" pl={3} maxW="100%" backgroundColor={'white'} pt={3} pb={3}>
                    <ScrollView horizontal={true}>
                        {product.map((item: any, index: any) => {
                            return (
                                <Chip mode='outlined' style={styles.chip} onClose={() => close(item)} key={index}>
                                    {findName(item)}
                                </Chip>
                            );
                        })}
                    </ScrollView>
                </HStack>}


        </>
    );
}

const styles = StyleSheet.create({
    button: {
        textAlign: 'center'
    },
    chip: {
        borderRadius: 15,
        marginVertical: 5,
        marginHorizontal: 3,
        padding: 0
    },
    chipText: {
        fontSize: 12,
        color: 'black',
    }
})