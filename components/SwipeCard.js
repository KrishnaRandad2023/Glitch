import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.7;

export default function SwipeCard({ profile, onSwipeLeft, onSwipeRight, isTop }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(isTop ? 1 : 0.95);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(1);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: (event) => {
      const shouldSwipeRight = translateX.value > screenWidth * 0.25;
      const shouldSwipeLeft = translateX.value < -screenWidth * 0.25;

      if (shouldSwipeRight) {
        translateX.value = withSpring(screenWidth * 2);
        runOnJS(onSwipeRight)(profile);
      } else if (shouldSwipeLeft) {
        translateX.value = withSpring(-screenWidth * 2);
        runOnJS(onSwipeLeft)(profile);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-screenWidth / 2, 0, screenWidth / 2],
      [-15, 0, 15],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
        { scale: scale.value },
      ],
    };
  });

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, screenWidth * 0.25],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  const nopeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-screenWidth * 0.25, 0],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image source={{ uri: profile.image }} style={styles.image} />
        
        {/* Like indicator */}
        <Animated.View style={[styles.likeIndicator, likeOpacity]}>
          <Text style={styles.likeText}>LIKE</Text>
        </Animated.View>

        {/* Nope indicator */}
        <Animated.View style={[styles.nopeIndicator, nopeOpacity]}>
          <Text style={styles.nopeText}>NOPE</Text>
        </Animated.View>

        {/* Profile info */}
        <View style={styles.profileInfo}>
          <View style={styles.nameAge}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.age}>{profile.age}</Text>
          </View>
          <Text style={styles.distance}>{profile.distance}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          
          {/* Tags */}
          <View style={styles.tagsContainer}>
            {profile.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileInfo: {
    padding: 20,
    height: '30%',
  },
  nameAge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  age: {
    fontSize: 20,
    color: '#666',
  },
  distance: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#7444C0',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 5,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  likeIndicator: {
    position: 'absolute',
    top: 50,
    left: 50,
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  likeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  nopeIndicator: {
    position: 'absolute',
    top: 50,
    right: 50,
    backgroundColor: 'rgba(244, 67, 54, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  nopeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
