import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.65;
const SWIPE_THRESHOLD = 120;

export default function SimpleCard({ profile, onSwipeLeft, onSwipeRight, isTop }) {
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const likeOpacity = useRef(new Animated.Value(0)).current;
  const nopeOpacity = useRef(new Animated.Value(0)).current;

  // Reset animations when component mounts or profile changes
  useEffect(() => {
    console.log('SimpleCard: Resetting animations for profile', profile.name, 'isTop:', isTop);
    position.setValue({ x: 0, y: 0 });
    rotate.setValue(0);
    likeOpacity.setValue(0);
    nopeOpacity.setValue(0);
  }, [profile.id, isTop]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => isTop,
    onMoveShouldSetPanResponder: () => isTop,
    
    onPanResponderGrant: () => {
      position.setOffset({
        x: position.x._value,
        y: position.y._value,
      });
      position.setValue({ x: 0, y: 0 });
    },

    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
      
      // Rotate card (reduced rotation for more polish)
      rotate.setValue(gesture.dx * 0.05);
      
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
            duration: 250,
            useNativeDriver: false,
          }),
          Animated.timing(rotate, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false,
          }),
        ]).start(() => {
          // Reset position after animation
          position.setValue({ x: 0, y: 0 });
          rotate.setValue(0);
          onSwipeRight(profile);
        });
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        // Swipe left (nope)
        Animated.parallel([
          Animated.timing(position, {
            toValue: { x: -screenWidth * 2, y: gesture.dy },
            duration: 250,
            useNativeDriver: false,
          }),
          Animated.timing(rotate, {
            toValue: -1,
            duration: 250,
            useNativeDriver: false,
          }),
        ]).start(() => {
          // Reset position after animation
          position.setValue({ x: 0, y: 0 });
          rotate.setValue(0);
          onSwipeLeft(profile);
        });
      } else {
        // Snap back
        Animated.parallel([
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }),
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
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
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  const cardStyle = {
    ...position.getLayout(),
    transform: [{ rotate: rotateCard }],
    opacity: isTop ? 1 : 0.8,
    zIndex: isTop ? 2 : 1,
  };

  return (
    <View style={styles.cardWrapper}>
      <Animated.View 
        style={[styles.card, cardStyle]}
        {...(isTop ? panResponder.panHandlers : {})}
      >
        {/* Connect indicator */}
        <Animated.View style={[styles.likeIndicator, { opacity: likeOpacity }]}>
          <Text style={styles.likeText}>CONNECT</Text>
        </Animated.View>

        {/* Pass indicator */}
        <Animated.View style={[styles.nopeIndicator, { opacity: nopeOpacity }]}>
          <Text style={styles.nopeText}>PASS</Text>
        </Animated.View>

        {/* Profile image area */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>👤</Text>
          <Text style={styles.imageUrl}>
            {profile.image.substring(0, 30)}...
          </Text>
        </View>

        {/* Profile info */}
        <View style={styles.profileInfo}>
          <View style={styles.nameYear}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.year}>{profile.year}</Text>
          </View>
          <Text style={styles.major}>
            {profile.major} • GPA: {profile.gpa}
          </Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          
          {/* Skills */}
          <Text style={styles.sectionTitle}>Skills:</Text>
          <View style={styles.tagsContainer}>
            {profile.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>

          {/* Looking For */}
          <Text style={styles.sectionTitle}>Looking for:</Text>
          <View style={styles.tagsContainer}>
            {profile.lookingFor.map((item, index) => (
              <View key={index} style={styles.lookingForTag}>
                <Text style={styles.lookingForText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Action buttons on card */}
          {isTop && (
            <View style={styles.cardButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.passButton]} 
                onPress={() => onSwipeLeft(profile)}
              >
                <Text style={styles.buttonText}>⏭️</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.connectButton]} 
                onPress={() => onSwipeRight(profile)}
              >
                <Text style={styles.buttonText}>🤝</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  imagePlaceholderText: {
    fontSize: 60,
    marginBottom: 15,
    opacity: 0.3,
  },
  imageUrl: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    opacity: 0.5,
  },
  profileInfo: {
    padding: 20,
    height: '35%',
    justifyContent: 'flex-start',
  },
  nameYear: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  year: {
    fontSize: 16,
    color: '#7444C0',
    fontWeight: '600',
  },
  major: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  bio: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  skillTag: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  skillText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  lookingForTag: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  lookingForText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  passButton: {
    backgroundColor: '#FF9800',
  },
  connectButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 18,
  },
  likeIndicator: {
    position: 'absolute',
    top: 60,
    left: 40,
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    zIndex: 3,
    transform: [{ rotate: '-15deg' }],
  },
  likeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nopeIndicator: {
    position: 'absolute',
    top: 60,
    right: 40,
    backgroundColor: 'rgba(255, 152, 0, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    zIndex: 3,
    transform: [{ rotate: '15deg' }],
  },
  nopeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});