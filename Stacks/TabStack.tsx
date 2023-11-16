// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeBaseProvider, Box, Center, Image, Text  } from "native-base";
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
import ProductDetailPage from '../pages/ProductDetail';
import RightHeader from '../components/Header/RightHeader';
import CustomHeader from '../components/Header/CustomHeader';
import LeftHeader from '../components/Header/LeftHeader';

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
  const cart = useSelector((storeState: any) => storeState.cart);
  console.log('cart', cart);

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
        // } else if (route.name === 'Banner') {
        //   iconName = focused
        //     ? 'bookmark'
        //     : 'bookmark-outline';
        } else if (route.name === 'Categories') {
          iconName = focused
            ? 'grid'
            : 'grid-outline';
        // } else if (route.name === 'Category') {
        //   iconName = focused
        //     ? 'grid'
        //     : 'grid-outline';
        } else if (route.name === 'Cart') {
          iconName = focused
            ? 'cart'
            : 'cart-outline';
        } else if (route.name === 'My Account') {
          iconName = focused
            ? 'person-circle'
            : 'person-circle-outline';
        }

        // You can return any component that you like here!
        return <IonIcon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#16a34a',
      tabBarInactiveTintColor: '#000000',
      lazy: true
    })}>
      <Tab.Screen name="Home" children={props => <AppStack initialRoute='HomePage' {...props} />} />
      {/* <Tab.Screen name="Banner" children={props => <AppStack initialRoute='BannerPage' {...props} />} /> */}
      <Tab.Screen name="Categories" children={props => <AppStack initialRoute='CategoriesPage' {...props} />} />
      {/* <Tab.Screen name="Category" children={props => <AppStack initialRoute='CategoryPage2' {...props} />} /> */}

      {totalItem > 0 &&
        <Tab.Screen
          name="Cart"
          options={{
            tabBarBadge: totalItem,
            tabBarBadgeStyle: { backgroundColor: '#1cad48', color: 'white', fontSize: 10 }
          }}
          children={props => <AppStack initialRoute='CartPage' {...props} />}
        />
      }
      {totalItem <= 0 &&
        <Tab.Screen name="Cart" children={props => <AppStack initialRoute='CartPage' {...props} />} />
      }

      <Tab.Screen name="My Account" children={props => <AppStack initialRoute='SettingPage' {...props} />} />
      {/* <Tab.Screen name="Login" children={props => <AppStack initialRoute='LoginPage' {...props} />} /> */}

      {/* {sessions && sessions.user &&
        <Tab.Screen name="My Account" children={props => <AppStack initialRoute='SettingPage' {...props} />} />
      }
      {!sessions || !sessions.user &&
        <Tab.Screen name="Login" children={props => <AppStack initialRoute='LoginPage' {...props} />} />
      } */}
    </Tab.Navigator>
  )
    ;
}

export default function TabStack({ navigation }: { navigation: any }) {


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
          <Stack.Screen name='ProductDetailPage' component={ProductDetailPage} 
              options={{
                headerTintColor: 'black',
                headerRight: () => (<CustomHeader></CustomHeader>),
                // headerLeft: () => (<LeftHeader navigation={navigation}></LeftHeader>),
                headerBackTitle: '',
                headerShown: true,
                title: ''
              }}
          /> 
          {/* <Stack.Screen name='IntroPage' component={IntroPage} options={{ title: 'Poplook', headerShown: true }} /> */}
          <Stack.Screen
                name="IntroPage"
                component={IntroPage}
                options={{
                  headerTitle: () => (
                      <>
                          <Box>
                              <Center>
                                  <Image style={{ width: 100, height: 29 }} source={{uri: "https://poplook.com/assets/img/logo.png"}} alt='Poplook Logo' size="sm" />
                              </Center>
                          </Box>
                      </>
                  ),
                  headerShown: true,
                  headerTitleAlign: "center",
                }}
            />
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
