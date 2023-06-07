import { StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, HStack, Spacer, Flex } from "native-base";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../Services/AuthService';
import { profile } from '../Redux/Slices/Sessions';

export default function PersonalInfoPage({ route, navigation }: { route: any, navigation: any }) {

    const dispatch = useDispatch()
    const details = useSelector((storeState: any) => storeState.session.user);
    const session = useSelector((storeState: any) => storeState.session);
    const infos = [
        { id: 0, title: "Email Address", key: "email" },
        { id: 1, title: "Password", key: "password" },
        { id: 2, title: "Name", key: "name" }
    ];


    const [isEnabled, setIsEnabled] = useState(details.newsletter == 1 ? true : false);
    const [isProtect, setIsProtect] = useState(details.optin == 1 ? true : false);
    const toggleSwitch = async () => {
        setIsEnabled(!isEnabled)
        const params: any = {
            id_customer: details.id_customer,
            newsletter: !isEnabled ? 1 : 0,
        };

        const response = await AuthService.updateUserInfo(params);
        const json = await response.json();
        console.log('json: ', json)
        if (json.code == 200) {
            dispatch(profile(json.data))
        }

    };


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

    const deleteAccount = () => {
        navigation.navigate('DeleteAccountPage', { screen: 'DeleteAccountPage'})
    }

    return (
        <>
            <Flex flex={1} bg={'white'}>
                <ScrollView>
                    <View style={styles.container}>
                        {infos.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={() => goToDetailsPage(item.id, item.title, item.key)}>
                                <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" >
                                    <Text color="black" fontSize={16}>{item.title}</Text>
                                    <Spacer />
                                    <IonIcon name="chevron-forward-outline" size={20} color="#777" />
                                </HStack>
                            </TouchableOpacity>
                        })}
                        <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" >
                            <Text color="black" fontSize={16}>Mailing List Preferences</Text>
                            <Spacer />
                            <Switch
                                trackColor={{ false: '#767577', true: '#1cad48' }}
                                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </HStack>
                        <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" >
                            <Text color="black" fontSize={16}>Personal Data Protection Notice</Text>
                            <Spacer />
                            <Switch
                                ios_backgroundColor="#3e3e3e"
                                value={isProtect}
                                disabled
                            />
                        </HStack>
                        {/* <TouchableOpacity onPress={() => deleteAccount()}>
                            <HStack borderBottomWidth="1" _dark={{ borderColor: "#dedede" }} borderColor="muted.100" py="3" >
                                <Text color="black" fontSize={16}>Request Account Deletion</Text>
                            </HStack>
                        </TouchableOpacity> */}
                    </View>

                </ScrollView>
            </Flex>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
})