import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';


const { width } = Dimensions.get('window');

const data = [
    { imageUrl: 'https://poplook.com/modules/banners/banner_img/601d6a6f9b47e84291ecf0d9cca56e89.jpg' },
    { imageUrl: 'https://poplook.com/modules/banners/banner_img/601d6a6f9b47e84291ecf0d9cca56e89.jpg' },
    { imageUrl: 'https://poplook.com/modules/banners/banner_img/601d6a6f9b47e84291ecf0d9cca56e89.jpg' }
    // Add more images as needed
  ];

const MyImageCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const translateX = useSharedValue(0);

  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
      translateX.value = withSpring(-activeSlide * width);
    }
  };

  const handleNext = () => {
    if (activeSlide < data.length - 1) {
      setActiveSlide(activeSlide + 1);
      translateX.value = withSpring(-(activeSlide + 1) * width);
    }
  };

  const renderCarouselItem = ({ item, index } : any) => (
    <View style={styles.carouselItem}>
      <Image source={item.imageUrl} style={styles.image} />
    </View>
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <PanGestureHandler onHandlerStateChange={() => {}} onGestureEvent={() => {}}>
          <Animated.View style={[styles.carousel, animatedStyle]}>
            <Carousel
              data={data}
              renderItem={renderCarouselItem}
              sliderWidth={width}
              itemWidth={width}
              onSnapToItem={(index: any) => setActiveSlide(index)}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePrev} style={styles.controlButton}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.8}
        />
        <TouchableOpacity onPress={handleNext} style={styles.controlButton}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    width: width * 0.9,
    height: 200,
  },
  carousel: {
    flex: 1,
  },
  carouselItem: {
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    marginHorizontal: 10,
  },
  paginationContainer: {
    paddingVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: 'blue',
  },
});

export default MyImageCarousel;


