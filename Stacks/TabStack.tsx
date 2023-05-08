// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeBaseProvider, Box } from "native-base";
import { Flex, Center, Image, HStack, StatusBar, Text } from 'native-base';
import { Themed } from '../Providers/Themed';
import AppStack from '../Stacks/AppStack';
import { useSelector, useDispatch } from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EghlPaymentPage from '../pages/EghlPaymentPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const linking = {
  prefixes: ['mychat://', 'https://mychat.com'],
  config: {
    screens: {
      Home: 'home',
    },
  },
};

const themed = Themed();

const TabNavigator = () => {

  const sessions = useSelector((storeState: any) => storeState.session);

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      // header: AppBar,
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: any;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Categories') {
          iconName = focused
            ? 'grid'
            : 'grid-outline';
        } else if (route.name === 'Cart') {
          iconName = focused
            ? 'cart'
            : 'cart-outline';
        } else if (route.name === 'My Account') {
          iconName = focused
            ? 'person-circle'
            : 'person-circle-outline';
        } else if (route.name === 'Login') {
          iconName = focused
            ? 'settings'
            : 'settings-outline';
        }

        // You can return any component that you like here!
        return <IonIcon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#16a34a',
      tabBarInactiveTintColor: '#000000',
    })}>
      <Tab.Screen name="Home" children={props => <AppStack initialRoute='HomePage' {...props} />} />
      <Tab.Screen name="Categories" children={props => <AppStack initialRoute='CategoriesPage' {...props} />} />
      <Tab.Screen name="Cart" children={props => <AppStack initialRoute='CartPage' {...props} />} />
      {sessions && sessions.user &&
        <Tab.Screen name="My Account" children={props => <AppStack initialRoute='SettingPage' {...props} />} />
      }
      {!sessions || !sessions.user &&
        <Tab.Screen name="Login" children={props => <AppStack initialRoute='LoginPage' {...props} />} />
      }
    </Tab.Navigator>
  )
  ;
}

export default function TabStack() {


  return (
    <NativeBaseProvider theme={themed}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator}/>
      <Stack.Screen name='EghlPaymentPage' component={EghlPaymentPage} options={{ title: 'Payment' }} />
      </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
