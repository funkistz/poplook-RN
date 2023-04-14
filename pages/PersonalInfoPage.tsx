import { StyleSheet, TouchableOpacity, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, HStack, Spacer } from "native-base";

export default function PersonalInfoPage({ route, navigation }: { route: any, navigation: any }) {

    const infos = [
        { id: 0, title: "Email Address", key: "email"},
        { id: 1, title: "Password", key: "password"},
        { id: 2, title: "Name", key:"name"}
    ];


    const [isEnabled, setIsEnabled] = useState(false);
    const [isProtect, setIsProtect] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {


    }, [])

    const goToDetailsPage = (id: any, title: any, key: any) => {

        const params = {
            title: title,
            id: id,
            key: key
        };

        navigation.navigate('PersonalInfoDetailPage', { screen: 'PersonalInfoDetailPage', params: params });
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {infos.map((item, index) => {
                        return <TouchableOpacity key={index} onPress={() => goToDetailsPage(item.id, item.title, item.key)}>
                            <HStack borderBottomWidth="1" _dark={{ borderColor: "grey" }} borderColor="muted.100" py="3" >
                                <Text color="black" fontSize={16}>{item.title}</Text>
                                <Spacer />
                            </HStack>
                        </TouchableOpacity>
                    })}
                    <HStack borderBottomWidth="1" _dark={{ borderColor: "grey" }} borderColor="muted.100" py="3" >
                        <Text color="black" fontSize={16}>Mailing List Preferences</Text>
                        <Spacer/>
                        <Switch
                            trackColor={{false: '#767577', true: '#1cad48'}}
                            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </HStack>
                    <HStack borderBottomWidth="1" _dark={{ borderColor: "grey" }} borderColor="muted.100" py="3" >
                        <Text color="black" fontSize={16}>Personal Data Protection Notice</Text>
                        <Spacer/>
                        <Switch
                            ios_backgroundColor="#3e3e3e"
                            value={isProtect}
                            disabled
                        />
                    </HStack>
                </View>
                
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
})