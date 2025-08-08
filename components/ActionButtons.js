import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ActionButtons({ onLike, onDislike, onSuperLike }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.dislikeButton]} onPress={onDislike}>
        <Text style={styles.buttonText}>✕</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.superLikeButton]} onPress={onSuperLike}>
        <Text style={[styles.buttonText, styles.superLikeText]}>★</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={onLike}>
        <Text style={styles.buttonText}>♥</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dislikeButton: {
    backgroundColor: '#ff4458',
  },
  likeButton: {
    backgroundColor: '#4fc3f7',
  },
  superLikeButton: {
    backgroundColor: '#42a5f5',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  superLikeText: {
    color: '#ffd700',
  },
});
