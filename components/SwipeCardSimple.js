import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.7;
const SWIPE_THRESHOLD = 120;

export default function SwipeCardSimple({ profile, onSwipeLeft, onSwipeRight, isTop }) {
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const likeOpacity = useRef(new Animated.Value(0)).current;
  const nopeOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderGrant: () => {
      position.setOffset({
        x: position.x._value,
        y: position.y._value,
      });
      position.setValue({ x: 0, y: 0 });
    },

    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
      
      // Rotate card
      rotate.setValue(gesture.dx * 0.1);
      
      // Show like/nope indicators
      if (gesture.dx > 0) {
        likeOpacity.setValue(Math.min(gesture.dx / SWIPE_THRESHOLD, 1));
        nopeOpacity.setValue(0);
      } else {
        nopeOpacity.setValue(Math.min(Math.abs(gesture.dx) / SWIPE_THRESHOLD, 1));
        likeOpacity.setValue(0);
      }
    },

    onPanResponderRelease: (event, gesture) => {
      position.flattenOffset();
      
      if (gesture.dx > SWIPE_THRESHOLD) {
        // Swipe right (like)
        Animated.parallel([
          Animated.timing(position, {
            toValue: { x: screenWidth * 2, y: gesture.dy },
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(rotate, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(() => onSwipeRight(profile));
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        // Swipe left (nope)
        Animated.parallel([
          Animated.timing(position, {
            toValue: { x: -screenWidth * 2, y: gesture.dy },
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(rotate, {
            toValue: -1,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(() => onSwipeLeft(profile));
      } else {
        // Snap back
        Animated.parallel([
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }),
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: false,
          }),
          Animated.timing(likeOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(nopeOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();
      }
    },
  });

  const rotateCard = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const cardStyle = {
    ...position.getLayout(),
    transform: [{ rotate: rotateCard }],
    opacity: isTop ? 1 : 0.8,
    zIndex: isTop ? 2 : 1,
  };

  return (
    <Animated.View
      style={[styles.card, cardStyle]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      <Image 
        source={{ uri: profile.image }} 
        style={styles.image}
        defaultSource={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==' }}
        onError={(error) => console.log('Image loading error:', error)}
      />
      
      {/* Like indicator */}
      <Animated.View style={[styles.likeIndicator, { opacity: likeOpacity }]}>
        <Text style={styles.likeText}>LIKE</Text>
      </Animated.View>

      {/* Nope indicator */}
      <Animated.View style={[styles.nopeIndicator, { opacity: nopeOpacity }]}>
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
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#f0f0f0',
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
