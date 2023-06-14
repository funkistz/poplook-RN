import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect } from 'react';
import { Text, ScrollView, View, HStack, Spacer, Flex, Icon } from "native-base";
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';

export default function FollowUsPage() {

    useEffect(() => {

    }, [])

    const medias = [
        { id: 0, title: "Facebook", url: "https://www.facebook.com/poplook", icon: 'logo-facebook' },
        { id: 1, title: "Twitter", url: "https://www.twitter.com/poplookshop", icon: 'logo-twitter'},
        { id: 2, title: "Instagram", url: "https://www.instagram.com/poplook", icon: 'logo-instagram' },
        { id: 3, title: "Youtube", url: "https://www.youtube.com/c/POPLOOKChannel", icon: 'logo-youtube' },
        { id: 4, title: "Tiktok", url: "https://www.tiktok.com/@poplookshop", icon: 'tiktok' }
    ];

    const goToSocialMediaPage = (url: any) => {
        Linking.openURL(url); 
    }

    return (
        <>
            <Flex flex={1} bg={'white'}>
                <ScrollView>
                    <View style={styles.container}>
                        {medias.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={() => goToSocialMediaPage(item.url)}>
                                <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" >
                                    { item.id != 4 ? <Icon as={IonIcon} name={item.icon} size="6" color='black'/> : <Icons name={item.icon} size={25} color="black"/>}
                                    <Text color="black" fontSize={16}>   {item.title}</Text>
                                    <Spacer />
                                    <IonIcon name="chevron-forward-outline" size={20} color="#777" />
                                </HStack>
                            </TouchableOpacity>
                        })}
                    </View>
                </ScrollView>
            </Flex>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 22
    },
})