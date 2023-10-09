import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyImageCarousel from '../components/Carousel2';

function App() {
  return (
    <View style={styles.container}>
      <MyImageCarousel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;