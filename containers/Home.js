import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import TinderCard from 'react-tinder-card';
import { useTheme } from '../context/ThemeContext';
import { studentProfiles } from '../assets/data/profiles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  
  const currentProfile = studentProfiles[currentIndex];
  const nextProfile = studentProfiles[currentIndex + 1];

  const swiped = (direction, profile) => {
    console.log('removing: ' + profile.name + ' to the ' + direction);
    setLastDirection(direction);
    
    // Move to next card immediately
    setCurrentIndex(prev => prev + 1);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>StudyConnect</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Discover your study partners</Text>
        </View>
        <TouchableOpacity 
          style={[styles.themeToggle, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.themeToggleText, { color: theme.textPrimary }]}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContainer}>
        {currentIndex < studentProfiles.length ? (
          <TinderCard
            key={`card-${currentIndex}`}
            onSwipe={(dir) => swiped(dir, currentProfile)}
            onCardLeftScreen={() => outOfFrame(currentProfile.name)}
            preventSwipe={['up', 'down']}
          >
            <View style={[
              styles.card, 
              { 
                backgroundColor: theme.cardBackground,
                shadowColor: theme.shadow 
              }
            ]}>
              <Image 
                source={{ uri: currentProfile.image }} 
                style={styles.cardImage}
                defaultSource={require('../assets/icon.png')}
              />
              
              <View style={styles.cardContent}>
                <View style={styles.nameRow}>
                  <Text style={[styles.name, { color: theme.textPrimary }]}>
                    {currentProfile.name}
                  </Text>
                  <Text style={[styles.year, { color: theme.textSecondary }]}>
                    {currentProfile.year}
                  </Text>
                </View>
                
                <Text style={[styles.major, { color: theme.primary }]}>
                  {currentProfile.major}
                </Text>
                
                <Text style={[styles.bio, { color: theme.textSecondary }]} numberOfLines={2}>
                  {currentProfile.bio}
                </Text>
                
                <Text style={[styles.gpa, { color: theme.textTertiary }]}>
                  GPA: {currentProfile.gpa}
                </Text>
                
                <View style={styles.skillsContainer}>
                  {currentProfile.skills.slice(0, 3).map((skill, skillIndex) => (
                    <View key={skillIndex} style={[styles.skillTag, { backgroundColor: theme.primary }]}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.lookingForContainer}>
                  {currentProfile.lookingFor.slice(0, 2).map((item, itemIndex) => (
                    <View key={itemIndex} style={[styles.lookingForTag, { borderColor: theme.border }]}>
                      <Text style={[styles.lookingForText, { color: theme.textSecondary }]}>
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </TinderCard>
        ) : (
          <View style={styles.endMessage}>
            <Text style={[styles.endTitle, { color: theme.textPrimary }]}>
              That's everyone!
            </Text>
            <Text style={[styles.endSubtitle, { color: theme.textSecondary }]}>
              Check back later for more study partners
            </Text>
          </View>
        )}
      </View>
      
      {currentIndex < studentProfiles.length && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[
            styles.actionButton, 
            { backgroundColor: '#ff4458', shadowColor: theme.shadow }
          ]}>
            <Text style={styles.actionButtonText}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[
            styles.actionButton, 
            { backgroundColor: '#42A5F5', shadowColor: theme.shadow }
          ]}>
            <Text style={styles.actionButtonText}>♡</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {lastDirection && (
        <Text style={[styles.lastSwipe, { color: theme.textSecondary }]}>
          You swiped {lastDirection}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeToggleText: {
    fontSize: 20,
  },
  cardContainer: {
    flex: 1,
    width: screenWidth,
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.6,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '65%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
    height: '35%',
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  year: {
    fontSize: 18,
    opacity: 0.7,
  },
  major: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  bio: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 18,
  },
  gpa: {
    fontSize: 12,
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  skillTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  skillText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  lookingForContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lookingForTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 6,
    marginBottom: 3,
  },
  lookingForText: {
    fontSize: 11,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
    gap: 40,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  lastSwipe: {
    position: 'absolute',
    bottom: 80,
    fontSize: 16,
    fontWeight: '600',
  },
  endMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight * 0.6,
  },
  endTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  endSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
