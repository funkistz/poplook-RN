import { useEffect } from 'react';
import { Themed } from './Providers/Themed';
import { store } from './Redux/app';
import { Provider } from 'react-redux'
import TabStack from './Stacks/TabStack';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './Redux/app';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RNInsider from 'react-native-insider';
import InsiderCallbackType from 'react-native-insider/src/InsiderCallbackType';
// import { ExecutionEnvironment } from 'expo-constants';
import { Alert, Platform, PermissionsAndroid } from 'react-native';

export default function App() {

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //  console.log("new message" , remoteMessage);
  //   // show the message to the user or use it to update to your local store
  //  return unsubscribe;
  // }, []);

  useEffect(() => {

    // console.log('ExecutionEnvironment', ExecutionEnvironment.Standalone);


    RNInsider.init(
      'poplook',
      'group.com.tiseno.Poplook',
      (type: any, data: any) => {
        switch (type) {
          case InsiderCallbackType.NOTIFICATION_OPEN:
            console.log('[INSIDER][NOTIFICATION_OPEN]: ', data);
            Alert.alert('[INSIDER][NOTIFICATION_OPEN]:', JSON.stringify(data));
            break;
          case InsiderCallbackType.INAPP_BUTTON_CLICK:
            console.log('[INSIDER][INAPP_BUTTON_CLICK]: ', data);
            Alert.alert(
              '[INSIDER][INAPP_BUTTON_CLICK]: ',
              JSON.stringify(data),
            );
            break;
          case InsiderCallbackType.TEMP_STORE_PURCHASE:
            console.log('[INSIDER][TEMP_STORE_PURCHASE]: ', data);
            Alert.alert(
              '[INSIDER][TEMP_STORE_PURCHASE]: ',
              JSON.stringify(data),
            );
            break;
          case InsiderCallbackType.TEMP_STORE_ADDED_TO_CART:
            console.log('[INSIDER][TEMP_STORE_ADDED_TO_CART]: ', data);
            Alert.alert(
              '[INSIDER][TEMP_STORE_ADDED_TO_CART]: ',
              JSON.stringify(data),
            );
            break;
          case InsiderCallbackType.TEMP_STORE_CUSTOM_ACTION:
            console.log('[INSIDER][TEMP_STORE_CUSTOM_ACTION]: ', data);
            Alert.alert(
              '[INSIDER][TEMP_STORE_CUSTOM_ACTION]: ',
              JSON.stringify(data),
            );
            break;
        }
      },
    );

    RNInsider.registerWithQuietPermission(false);

    return () => {

    }
  }, [])

  async function requestLocationPermission() {
    try {
      if (Platform.OS != "android") return;

      const fineLocationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Application Camera Permission",
          message: "The application requires access to the camera.",
          buttonNeutral: "Ask Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (fineLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
        const bgLocationGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: "Background Location Permission for App",
            message:
              "The app requires background location permission to provide you better service using your location in the background.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Deny",
            buttonPositive: "Allow",
          }
        );

        if (bgLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permissions successfully granted");
        } else {
          console.log("Background location permission not granted");
        }
      } else {
        console.log("Location permission not granted");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const initInsider = () => {
    // FIXME-INSIDER: Please change with your partner name and app group.
    RNInsider.init(
      "poplook",
      "group.com.tiseno.Poplook",
      (type: any, data: any) => {
        switch (type) {
          case InsiderCallbackType.NOTIFICATION_OPEN:
            console.log("[INSIDER][NOTIFICATION_OPEN]: ", data);
            Alert.alert("[INSIDER][NOTIFICATION_OPEN]:", JSON.stringify(data));
            break;
          case InsiderCallbackType.TEMP_STORE_CUSTOM_ACTION:
            console.log("[INSIDER][TEMP_STORE_CUSTOM_ACTION]: ", data);
            Alert.alert(
              "[INSIDER][TEMP_STORE_CUSTOM_ACTION]: ",
              JSON.stringify(data)
            );
            break;
        }
      }
    );

    RNInsider.registerWithQuietPermission(false);
    RNInsider.setActiveForegroundPushView();
    RNInsider.startTrackingGeofence();
    RNInsider.enableIDFACollection(false);
    RNInsider.enableIpCollection(false);
    RNInsider.enableLocationCollection(false);
    RNInsider.enableCarrierCollection(false);

    console.log("[INSIDER] initialized");
  };

  requestLocationPermission();
  initInsider();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TabStack />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}