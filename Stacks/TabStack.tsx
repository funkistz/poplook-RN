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
import AddressDetailPage from '../pages/AddressDetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import AddressListPage from '../pages/AddressListPage';
import Ipay88PaymentPage from '../pages/Ipay88PaymentPage';
import ForceUpdatePage from '../pages/ForceUpdatePage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import IntroPage from '../pages/IntroPage';

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
  const totalItem = useSelector((storeState: any) => storeState.cart.total_item);
  console.log('cart', totalItem);

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

      {!!totalItem && totalItem > 0 &&
        <Tab.Screen
          name="Cart"
          options={{
            tabBarBadge: totalItem,
            tabBarBadgeStyle: { backgroundColor: '#1cad48', color: 'white' }
          }}
          children={props => <AppStack initialRoute='CartPage' {...props} />}
        />
      }
      {!totalItem || totalItem <= 0 &&
        <Tab.Screen name="Cart" children={props => <AppStack initialRoute='CartPage' {...props} />} />
      }

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name='EghlPaymentPage' component={EghlPaymentPage} options={{ title: 'Payment' }} />
          <Stack.Screen name='Ipay88PaymentPage' component={Ipay88PaymentPage} options={{ title: 'Payment' }} />
          <Stack.Screen name='AddressDetailExPage' component={AddressDetailPage} options={{ title: 'Add New Address', headerShown: true }} />
          <Stack.Screen name='CheckoutExPage' component={CheckoutPage} options={{ title: 'Order Confirmation', headerShown: true }} />
          <Stack.Screen name='AddressListExPage' component={AddressListPage} options={{ title: 'My Addresses', headerShown: true }} />
          <Stack.Screen name='ForceUpdatePage' component={ForceUpdatePage} options={{ title: 'Force Update', headerShown: true }} />
          <Stack.Screen name='OrderSuccessPage' component={OrderSuccessPage} options={{ title: 'Order Confirmation', headerShown: true }} />
          <Stack.Screen name='IntroPage' component={IntroPage} options={{ title: 'Poplook', headerShown: true }} />
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
