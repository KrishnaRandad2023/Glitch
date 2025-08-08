import React from 'react';
import { Text } from 'react-native';

const iconMap = {
  explore: '🔍',
  heart: '❤️',
  chat: '💬',
  user: '👤',
};

export default function Icon({ name, color, size }) {
  return (
    <Text style={{ fontSize: size || 20, color: color || '#000' }}>
      {iconMap[name] || '❓'}
    </Text>
  );
}
