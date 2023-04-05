import { ScrollView, Image, Center, Box, Text, Heading, Button, HStack, VStack } from 'native-base';
import { View, useWindowDimensions, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image';


const Table = () => {
    return <>
        <Center w={'90%'} borderWidth={2} borderColor={'#d1f456'}>
            <HStack style={{borderBottomWidth: 2, borderBottomColor: '#d1f456'}}>
                <VStack w={'55%'}>

                </VStack>
                <Box alignItems="center" w={'15%'} py={2}>
                    <Text  color='black' fontSize={11} >Bronze</Text>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <Text  color='black' fontSize={11} >Silver</Text>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <Text  color='black' fontSize={11} >Gold</Text>
                </Box>
            </HStack>

            <HStack>
                <VStack w={'55%'} py={2}>
                    <Text style={styles.tableText} >Birthday Discount</Text>
                </VStack>
                <Box alignItems="center" w={'15%'} py={2}>
                    <Text  color='black' fontSize={11} >10%</Text>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <Text  color='black' fontSize={11} >15%</Text>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <Text  color='black' fontSize={11} >20%</Text>
                </Box>
            </HStack>

            <HStack>
                <VStack w={'55%'} py={4}>
                    <Text style={styles.tableText} >Exclusive Promotions</Text>
                </VStack>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2} >
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
            </HStack>

            <HStack>
                <VStack w={'55%'} py={4}>
                    <Text style={styles.tableText} >Early Access to Sale</Text>
                </VStack>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circle}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2} >
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
            </HStack>

            <HStack>
                <VStack w={'55%'} py={4}>
                    <Text style={styles.tableText}>Early Access to Raya Launches</Text>
                </VStack>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circle}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2} >
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
            </HStack>

            <HStack>
                <VStack w={'55%'} py={4}>
                    <Text style={styles.tableText}>Level Up Gift</Text>
                </VStack>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circle}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2} >
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
            </HStack>

            <HStack>
                <VStack w={'55%'} py={4}>
                    <Text style={styles.tableText}>Mystery Money</Text>
                </VStack>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circle}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circle}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2} >
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
            </HStack>

            <HStack>
                <VStack w={'55%'} py={4}>
                    <Text style={styles.tableText}>Invites to Exclusive Events</Text>
                </VStack>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circle}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2}>
                    <TouchableHighlight style = {styles.circle}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
                <Box alignItems="center" w={'15%'} py={2} >
                    <TouchableHighlight style = {styles.circleFill}>
                        <Text></Text>
                    </TouchableHighlight>
                </Box>
            </HStack>
        </Center>
    
    </>
}

export default function RewardsPage({ route , navigation} : { route: any,  navigation: any }) {

    const btnFaq = () => {
        navigation.navigate('FaqPage', { screen: 'FaqPage' });
    }


    return <>
        <View style={{backgroundColor: 'white'}}>
            <ScrollView>
                <FullWidthImage  source={{uri: "https://poplook.com/assets/img/loyalty/PL_REWARD_MAIN_TOP_BANNER.jpg"}}/>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>

                    <Box w={'90%'} py={5}>
                        <Center>
                            <Image style={styles.rewardsImg} source={{uri: "https://poplook.com/assets/img/loyalty/PL_REWARD_MAIN_06.png"}} alt='Early Access to Raya Launches' size="sm" />
                        </Center>
                        <Heading style={styles.rewardsHeader} >Early Access to Raya Launches</Heading>
                        <Text style={styles.rewardsText}> Our most anticipated collections every year, which also mean sold out sizes and styles. Enjoy early access and get first dibs on these pieces!</Text>
                    </Box>

                    <Box w={'90%'} py={5}>
                        <Center>
                            <Image style={styles.rewardsImg} source={{uri: "https://poplook.com/assets/img/loyalty/PL_REWARD_MAIN_08.png"}} alt='Early Access to Sale' size="sm" />
                        </Center>
                        <Heading style={styles.rewardsHeader} >Early Access to Sale</Heading>
                        <Text style={styles.rewardsText}> Get in on our biggest sales ahead of everyone else. When sizes are limited, early access is key!</Text>
                    </Box>

                    <Box w={'90%'} py={5}>
                        <Center>
                            <Image style={styles.rewardsImg} source={{uri: "https://poplook.com/assets/img/loyalty/PL_REWARD_MAIN_12.png"}} alt='Level Up Gift' size="sm" />
                        </Center>
                        <Heading style={styles.rewardsHeader} >Level Up Gift</Heading>
                        <Text style={styles.rewardsText}> You'll graduate to the next level once you've reached the spend ceiling for your current one—and you'll also receive a just-for-you token of our appreciation!</Text>
                    </Box>

                    <Box w={'90%'} py={5}>
                        <Center>
                            <Image style={styles.rewardsImg} source={{uri: "https://poplook.com/assets/img/loyalty/PL_REWARD_MAIN_14.png"}} alt='Mystery money' size="sm" />
                        </Center>
                        <Heading style={styles.rewardsHeader} >Mystery money</Heading>
                        <Text style={styles.rewardsText}> Receive surprise coupons throughout the year. But when exactly? And for how much? Well, that's for us to know and you to find out!</Text>
                    </Box>

                    <Box w={'90%'} py={5}>
                        <Center>
                            <Image style={styles.rewardsImg} source={{uri: "https://poplook.com/assets/img/loyalty/PL_REWARD_MAIN_18.png"}} alt='INVITES TO EXCLUSIVE EVENTS' size="sm" />
                        </Center>
                        <Heading style={styles.rewardsHeader} >INVITES TO EXCLUSIVE EVENTS</Heading>
                        <Text style={styles.rewardsText}> Be invited to our exclusive events.</Text>
                    </Box>

                    <Box w={'90%'} py={5}>
                        <Center>
                            <Image style={styles.rewardsImg} source={{uri: "https://poplook.com/assets/img/loyalty/PL_REWARD_MAIN_20.png"}} alt='EXCLUSIVE PROMOTIONS' size="sm" />
                        </Center>
                        <Heading style={styles.rewardsHeader} >EXCLUSIVE PROMOTIONS</Heading>
                        <Text style={styles.rewardsText}>Enjoy VIP-only exclusive discounts and promotions.</Text>
                    </Box>

                    <Box w={'90%'} py={5}>
                        <Center>
                            <Image style={styles.rewardsImg} source={{uri: "https://poplook.com/assets/img/loyalty/PL_REWARD_MAIN_24.png"}} alt='BIRTHDAY DISCOUNT' size="sm" />
                        </Center>
                        <Heading style={styles.rewardsHeader} >BIRTHDAY DISCOUNT</Heading>
                        <Text style={styles.rewardsText}>Let us celebrate your special day with a little extra something on us. We'll make sure you are celebrating in style.</Text>
                    </Box>


                    <Heading w={'90%'} style={styles.rewardsHeader} >LOOK FORWARD TO THESE REWARDS WHEN YOU SHOP</Heading>

                    <Table />

                    <View style={{width: '90%', marginVertical: 20 }}>
                        <FullWidthImage  source={{uri: "https://poplook.com/assets/img/loyalty_temp/RM_GRAPH.png"}}/>
                    </View>

                    
                    <Button
                        my={5}
                        h={12}
                        style={styles.button}
                        onPress={btnFaq} >
                            QUESTIONS? SEE OUR FAQ 
                    </Button>

                </View>
            </ScrollView>
        </View>
    </>
}

const styles = StyleSheet.create({
    button : {
        backgroundColor: 'black',
        width: '90%',
        marginHorizontal: 10,
        textTransform: 'uppercase',
    },
    rewardsImg : {
        width: 60,
        height: 60,
    },
    rewardsHeader : {
        textTransform: 'uppercase',
        color: '#333',
        marginVertical: 30,
        textAlign: 'center',
        fontSize: 16,
    },
    rewardsText : {
        fontSize: 15,
        textAlign: 'center',
        color: 'gray',
        lineHeight: 18,
        fontWeight: '300'
    },
    img : {
        width: 500,
    },

    circle: {
        borderRadius: Math.round(30 + 30) / 2,
        width: 30,
        height: 30,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',

    },

    circleFill: {
        borderRadius: Math.round(30 + 30) / 2,
        width: 30,
        height: 30,
        backgroundColor:'#d1f456',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',

    },

    tableText: {
        fontSize: 12,
        color: '#333',
        paddingLeft: 10,
        fontWeight: '500',
    }

})