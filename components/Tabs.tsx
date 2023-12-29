import { Center, Box } from 'native-base';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useColorModeValue, Pressable, Text, ScrollView, HStack } from 'native-base';
import { Animated, useWindowDimensions, TouchableOpacity, StyleSheet } from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image'
import { useNavigation } from '@react-navigation/native';
import TextWithStyle from '../components/Banner/TextWithStyle';

export default function Tabs({ routes, scenes }: { routes: any, scenes: any }) {

  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const navigation: any = useNavigation();

  const onIndexChange = (index: any) => {

    console.log('onIndexChange', routes[index]);

    if (routes[index].type == 'link') {
      goToCategory(routes[index].id, routes[index].title);
    } else {
      setIndex(index);
    }

  }

  const goToCategory = (id: any, title: any) => {

    const params = {
      category_id: id,
      category_name: title
    };

    navigation.navigate('Categories', { screen: 'CategoryPage', params: params });
  };

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: any) => i);

    return (<HStack bg="black">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          props.navigationState.routes.map((route: any, i: any) => {

            if (route.type == 'link') {
              // console.log('rendertabbar', route);
            }

            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex: any) =>
                inputIndex === i ? 1 : 0.5
              ),
            });
            const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
            const borderColor = index === i ? 'white' : useColorModeValue('black', 'black');

            if (!route) {
              return;
            }

            return (
              <TouchableOpacity key={i} onPress={() => { onIndexChange(i); }}>
                {route.active &&
                   <Box p={4} borderBottomWidth="3" borderColor={borderColor} bg="red">
                   <TextWithStyle data={route.data}></TextWithStyle>
                   {/* <Animated.Text style={{
                     color,
                     opacity
                   }}>{route.title}</Animated.Text> */}
                 </Box>
                }
               
              </TouchableOpacity>
            );
          })
        }
      </ScrollView >
    </HStack >
    );
  };

  return (
    <>
      <TabView style={{ height: "100%", width: "100%" }}
        lazy={true}
        navigationState={{ index, routes }}
        renderScene={SceneMap(scenes)}
        renderTabBar={renderTabBar}
        onIndexChange={onIndexChange}
        // onTabPress={({ route, preventDefault }) => onTabPress(route)}
        initialLayout={{ width: layout.width }}
        swipeEnabled={false}
      />
    </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    height: 15
  },
});

