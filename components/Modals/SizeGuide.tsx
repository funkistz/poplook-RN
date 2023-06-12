import React, { useEffect } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { HStack, Text, Icon } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FullWidthImage from 'react-native-fullwidth-image';

const win = Dimensions.get('window');

export default function SizeGuideModal({ visible, onToggle }: { visible: boolean, onToggle: any }) {

    useEffect(() => {

    }, [])

    return (
        <>
            <Modal
                presentationStyle='pageSheet'
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={onToggle}
            >
                <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 30 }}>
                    <HStack>
                        <HStack w={'90%'}>
                            <Text bold style={{ color: 'black', fontSize: 18, paddingStart: 10}}>Size Guide</Text>
                        </HStack>
                        <HStack w={'10%'}>
                            <TouchableOpacity onPress={onToggle}>
                                <Icon
                                    size="6"
                                    color="black"
                                    as={<IonIcon name="close-outline" />}
                                />
                            </TouchableOpacity>
                        </HStack>
                    </HStack>
                    <FullWidthImage  source={{uri: "https://poplook.com/assets/img/product/size_guide_20191031.jpg"}}/>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    chip: {
        marginHorizontal: 2,
        marginBottom: 8,
    },
    text: {
        flexDirection: 'row',
        fontSize: 13,
        color: 'black',
    },
    stock: {
        color: 'white',
        backgroundColor: '#1cad48',
        textAlign: 'center',
        borderRadius: 10,
    },
    container: {
        flexDirection: 'column',
        padding: 1
    },
});