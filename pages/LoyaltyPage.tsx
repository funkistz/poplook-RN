import { useIsFocused } from '@react-navigation/native';
import { Box, Center, Heading, Text, Image, Button, useColorModeValue, ScrollView, Divider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Pressable, Animated, Dimensions, TouchableOpacity } from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { userSelector } from '../Redux/Slices/Sessions';
import LoyaltyService from '../Services/LoyaltyService';
import Svg, { G, Circle } from "react-native-svg";
import Spinner from '../components/Spinner';


export default function LoyaltyPage({ route, navigation }: { route: any, navigation: any }) {

    // data user
    const { user } = useSelector(userSelector);
    const session = useSelector((storeState: any) => storeState.session);
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>({
        customer_id: 0,
        percentage: 0,
        shop_id: 1,
        spendmore: 0,
        tier: 0
    });

    // Donut Graph
    const radius = 70;
    const circleCircumference = 2 * Math.PI * radius;
    const [percentage, setPercentage] = useState(0);
    const [animatedValue] = useState(new Animated.Value(0));
    const strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;



    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(1);
    const [routes] = React.useState([{
        key: 'first',
        title: 'Benefits'
    }, {
        key: 'second',
        title: 'Details'
    }]);

    const fetchLoyalty = async () => {
        const response = await LoyaltyService.getLoyalty(user.id_customer);
        const json = await response.json();
        console.log('json', json);
        Animated.timing(animatedValue, {
            toValue: (json.data.percentage / 100) * 100,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        setData(json.data)
        setIsLoading(false)
    }

    const moreRewards = () => {
        navigation.navigate('RewardsPage', { screen: 'RewardsPage' });
    }

    const FirstRoute = () => <>
    <ScrollView>
        <Center flex={1} backgroundColor={'white'}>
            <Text color='black' fontSize={18}> Get to know your</Text>
            <Heading size={'xl'} color='black' my={3}>Benefits</Heading>
            <Text color='black' fontSize={18}> Starts collecting your points now!</Text>

                {data.tier == 1 && 
                    <>
                        <Image mt={30} style={{width: '100%', height: 110}} source={{uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_07.jpg"}} alt="Rewards" size="sm" />
                        
                        <View style={{flexDirection: 'row'}}>
                            <Heading my={10} size={'md'} color='black' style={{textTransform: 'uppercase'}}>Welcome to </Heading>
                            <Heading my={10} size={'md'} color='#CD7F32' style={{textTransform: 'uppercase'}}>Bronze</Heading>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                            <Box w={'30%'} px={1}>
                                <Center>
                                    <Image style={styles.rewardsImg} source={{uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_10.jpg"}} alt="Birthday Discount" size="sm" />
                                    <Text style={styles.rewardsText}>Birthday Discount</Text>
                                </Center>
                            </Box>
                            <Box w={'30%'} px={1}>
                                <Center w={'100%'}>
                                    <Image style={styles.rewardsImg} source={{uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_11.jpg"}} alt="Exclusive Promotions" size="sm" />
                                    <Text style={styles.rewardsText}>Exclusive Promotions</Text>
                                </Center>
                            </Box>
                        </View>
                    </>
                }

            {data.tier == 2 &&
                <>
                    <Image mt={30} style={{ width: '100%', height: 110 }} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_SILVER_07.jpg" }} alt="Rewards" size="sm" />
                    <View style={{ flexDirection: 'row' }}>
                        <Heading my={10} size={'md'} color='black' style={{ textTransform: 'uppercase' }}>Welcome to </Heading>
                        <Heading my={10} size={'md'} color='#808080' style={{ textTransform: 'uppercase' }}>Silver</Heading>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Box w={'30%'} px={1}>
                            <Center>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_21.jpg" }} alt="Early access to sale" size="sm" />
                                <Text style={styles.rewardsText}>Early access to sale</Text>
                            </Center>
                        </Box>
                        <Box w={'30%'} px={1}>
                            <Center w={'100%'}>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_10.jpg" }} alt="Birthday Discount" size="sm" />
                                <Text style={styles.rewardsText}>Birthday Discount</Text>
                            </Center>
                        </Box>
                        <Box w={'30%'} px={1}>
                            <Center>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_22.jpg" }} alt="Early Access to Raya Launches" size="sm" />
                                <Text style={styles.rewardsText}>Early Access to Raya Launches</Text>
                            </Center>
                        </Box>
                        <Box w={'30%'} px={1} pt={2}>
                            <Center w={'100%'}>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_11.jpg" }} alt="Exclusive Promotions" size="sm" />
                                <Text style={styles.rewardsText}>Exclusive Promotions</Text>
                            </Center>
                        </Box>
                        <Box w={'30%'} px={1} pt={2}>
                            <Center w={'100%'}>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_23.jpg" }} alt="evel up gift" size="sm" />
                                <Text style={styles.rewardsText}>Level up gift</Text>
                            </Center>
                        </Box>
                    </View>
                </>
            }

            {data.tier == 3 &&
                <>
                    <Image mt={30} style={{ width: '100%', height: 110 }} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_GOLD_07.jpg" }} alt="Rewards" size="sm" />
                    <View style={{ flexDirection: 'row' }}>
                        <Heading my={10} size={'md'} color='black' style={{ textTransform: 'uppercase' }}>Welcome to </Heading>
                        <Heading my={10} size={'md'} color='#ffd700' style={{ textTransform: 'uppercase' }}>Gold</Heading>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Box w={'25%'} px={1}>
                            <Center>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_21.jpg" }} alt="Early access to sale" size="sm" />
                                <Text style={styles.rewardsText}>Early access to sale</Text>
                            </Center>
                        </Box>
                        <Box w={'25%'} px={1}>
                            <Center w={'100%'}>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_10.jpg" }} alt="Birthday Discount" size="sm" />
                                <Text style={styles.rewardsText}>Birthday Discount</Text>
                            </Center>
                        </Box>
                        <Box w={'25%'} px={1}>
                            <Center>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_22.jpg" }} alt="Early Access to Raya Launches" size="sm" />
                                <Text style={styles.rewardsText}>Early Access to Raya Launches</Text>
                            </Center>
                        </Box>
                        <Box w={'25%'} px={1} pt={2}>
                            <Center w={'100%'}>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_11.jpg" }} alt="Exclusive Promotions" size="sm" />
                                <Text style={styles.rewardsText}>Exclusive Promotions</Text>
                            </Center>
                        </Box>
                        <Box w={'25%'} px={1} pt={2}>
                            <Center w={'100%'}>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_23.jpg" }} alt="Level up gift" size="sm" />
                                <Text style={styles.rewardsText}>Level up gift</Text>
                            </Center>
                        </Box>
                        <Box w={'25%'} px={1} pt={2}>
                            <Center w={'100%'}>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_24.jpg" }} alt="Mystery Money" size="sm" />
                                <Text style={styles.rewardsText}>Mystery Money</Text>
                            </Center>
                        </Box>
                        <Box w={'25%'} px={1} pt={2}>
                            <Center w={'100%'}>
                                <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_25.jpg" }} alt="Invites to exlusive events" size="sm" />
                                <Text style={styles.rewardsText}>Invites to exlusive events</Text>
                            </Center>
                        </Box>
                    </View>
                </>
            }

            <Button
                // mt={10}
                mt={5}
                h={12}
                style={styles.button}
                onPress={moreRewards} >
                MORE ABOUT THE REWARDS
            </Button>
        </Center>
        </ScrollView>
    </>;

    const SecondRoute = () =>
        <>
        <ScrollView>
            <Center flex={1} backgroundColor={'white'}>
                <Text color='black' fontSize={24}>Your Details</Text>
                <Text mt={2} w={'80%'} textAlign={'center'} color='black' fontSize={14}> Every purchase this year gets you closer to the next level</Text>

                <View style={styles.graphWrapper}>
                    <Svg height="200" width="200" viewBox="0 0 180 180">
                        <G rotation={-90} originX="90" originY="90">
                            <Circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#F1F6F9"
                                fill="transparent"
                                strokeWidth="10"
                            />
                            <Circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#d1f456"
                                fill="transparent"
                                strokeWidth="10"
                                strokeDasharray={circleCircumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                            />
                        </G>
                    </Svg>
                    <Text style={styles.text}>{Math.round(percentage)}%</Text>
                </View>

                {/* Badge */}
                {data.tier == 1 &&
                    <>
                        <View style={styles.spend}>
                            <Text color='black' fontSize={14}>Spend </Text>
                            <Text color='black' bold fontSize={14}>{session.country.currency_sign} {Number.isInteger(data.spendmore) ? data.spendmore : data.spendmore.toFixed(2)} </Text>
                            <Text color='black' fontSize={14}>to level up! </Text>
                        </View>

                        <View style={{flexDirection: 'row', marginVertical: 20}}>
                            <Heading size={'md'} color='black' style={{textTransform: 'uppercase'}}>Towards </Heading>
                            <Heading size={'md'} color='black' style={{textTransform: 'uppercase'}}>Silver</Heading>
                        </View>


                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Box w={'20%'} flex={1} justifyContent="center">
                                <Divider style={styles.divider} />
                            </Box>
                            <Box w={'60%'}>
                                <Text style={styles.levelup}> Level up to unlock</Text>
                            </Box>
                            <Box w={'20%'} flex={1} justifyContent="center">
                                <Divider style={styles.divider} />
                            </Box>
                        </View>
                    </>
                }
                {data.tier == 2 &&
                    <>

                        <View style={styles.spend}>
                            <Text color='black' fontSize={14}>Spend </Text>
                            <Text color='black' bold fontSize={14}>{session.country.currency_sign} {Number.isInteger(data.spendmore) ? data.spendmore : data.spendmore.toFixed(2)} </Text>
                            <Text color='black' fontSize={14}>to level up! </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Heading size={'md'} color='black' style={{ textTransform: 'uppercase' }}>Towards </Heading>
                            {/* <Heading size={'md'} color='#ffd700' style={{textTransform: 'uppercase'}}>Gold</Heading> */}
                            <Heading size={'md'} color='black' style={{ textTransform: 'uppercase' }}>Gold</Heading>
                        </View>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Box w={'20%'} flex={1} justifyContent="center">
                                <Divider style={styles.divider} />
                            </Box>
                            <Box w={'60%'}>
                                <Text style={styles.levelup}> Level up to unlock</Text>
                            </Box>
                            <Box w={'20%'} flex={1} justifyContent="center">
                                <Divider style={styles.divider} />
                            </Box>
                        </View>
                    </>
                }
                {data.tier == 3 &&
                    <>
                        <Center style={{ marginVertical: 30 }}>
                            <Heading size={'lg'} color='#d1f456' style={{ textTransform: 'uppercase' }}>Congratulation! </Heading>
                            <Heading size={'sm'} bold color='black' >Your are a POPLOOK. </Heading>
                            <Heading size={'sm'} bold color='black' >VVIP</Heading>
                        </Center>

                        <Text color='black' fontSize={14} >We hope you enjoy all your exclusive perks</Text>
                        <Heading size={'md'} color='#d1f456'>Happy Shopping!</Heading>
                    </>
                }


                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 30 }}>
                    {data.tier == 1 &&
                        <>
                            <Box w={'30%'} px={1}>
                                <Center>
                                    <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_21.jpg" }} alt="Early access to sale" size="sm" />
                                    <Text style={styles.rewardsText}>Early access to sale</Text>
                                </Center>
                            </Box>
                            <Box w={'30%'} px={1}>
                                <Center>
                                    <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_22.jpg" }} alt="Early Access to Raya Launches" size="sm" />
                                    <Text style={styles.rewardsText}>Early Access to Raya Launches</Text>
                                </Center>
                            </Box>
                            <Box w={'30%'} px={1} pt={2}>
                                <Center w={'100%'}>
                                    <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_23.jpg" }} alt="evel up gift" size="sm" />
                                    <Text style={styles.rewardsText}>Level up gift</Text>
                                </Center>
                            </Box>
                        </>
                    }

                    {data.tier == 2 &&
                        <>
                            <Box w={'30%'} px={1} pt={2}>
                                <Center w={'100%'}>
                                    <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_24.jpg" }} alt="Mystery Money" size="sm" />
                                    <Text style={styles.rewardsText}>Mystery Money</Text>
                                </Center>
                            </Box>
                            <Box w={'30%'} px={1} pt={2}>
                                <Center w={'100%'}>
                                    <Image style={styles.rewardsImgSilver} source={{ uri: "https://poplook.com/assets/img/loyalty/PL_LP_DASHBOARD_FA_BRONZE_25.jpg" }} alt="Invites to exlusive events" size="sm" />
                                    <Text style={styles.rewardsText}>Invites to exlusive events</Text>
                                </Center>
                            </Box>
                        </>
                    }
                </View>
            </Center>
        </ScrollView>
        </>;

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    animatedValue.addListener(({ value }) => {
        setPercentage(value);
    });

    useEffect(() => {
        setIsLoading(true)
        if (isFocused) {
            fetchLoyalty().catch(console.error);
        }

    }, [])

    useEffect(() => {

    }, [data])


    return <>
        {isLoading &&
            <>
                <Center flex={1} justifyContent={'center'} alignItems={'center'} bg={'white'}>
                    <Spinner spin={true} />
                </Center>
            </>
        }

        {!isLoading &&
            <>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#f2f2f2', marginHorizontal: 20 , marginVertical: 20, borderRadius: 10 , height: 40}} 
                            indicatorStyle={styles.indicator}
                            labelStyle={{ fontWeight: '600', fontSize: 11, height: 40 }}
                            activeColor={'black'}
                            inactiveColor={'black'} 
                            pressColor='#f2f2f2'
                            contentContainerStyle={{justifyContent: "center"}}
                        />
                        } />
                </View>
            </>
        }

    </>
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        width: '90%',
        marginHorizontal: 10,
    },
    rewardsImg: {
        width: 100,
        height: 50,
    },
    rewardsText: {
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
        color: 'black',
        lineHeight: 15,
    },

    rewardsImgSilver: {
        width: 80,
        height: 50,
    },

    levelup: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        textTransform: 'uppercase',
        paddingVertical: 10,
        position: 'relative',
        borderRadius: 10,
    },
    graphWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    text: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 40,
        color: "#394867",
        paddingTop: 20,
    },
    spend: {
        flexDirection: 'row',
        backgroundColor: '#d1f456',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    divider: {
        backgroundColor: '#d1f456',
        height: 5,
    },
    indicator: {
        backgroundColor: 'white', 
        borderRadius: 10, 
        height: 34, 
        marginBottom: 3 ,
        marginVertical:10, 
        borderLeftWidth: 3, 
        borderLeftColor: '#f2f2f2',
        borderRightWidth: 3, 
        borderRightColor: '#f2f2f2'
    }
})