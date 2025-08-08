import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Dimensions 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

const mockMessages = [
  {
    id: 1,
    name: "Emma Chen",
    lastMessage: "Hey! Want to study algorithms together?",
    timestamp: "2m",
    avatar: "https://picsum.photos/400/600?random=1",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    lastMessage: "The robotics project meeting is at 3pm",
    timestamp: "15m",
    avatar: "https://picsum.photos/400/600?random=2",
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: "Sofia Martinez",
    lastMessage: "Thanks for the data science notes! 📊",
    timestamp: "1h",
    avatar: "https://picsum.photos/400/600?random=3",
    unread: 0,
    online: false
  },
  {
    id: 4,
    name: "Marcus Johnson",
    lastMessage: "Security study group tomorrow?",
    timestamp: "3h",
    avatar: "https://picsum.photos/400/600?random=4",
    unread: 1,
    online: false
  },
  {
    id: 5,
    name: "Luna Kim",
    lastMessage: "I can help with calculus problems",
    timestamp: "1d",
    avatar: "https://picsum.photos/400/600?random=5",
    unread: 0,
    online: true
  }
];

export default function MessagesScreen() {
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState('');
  
  const filteredMessages = mockMessages.filter(message =>
    message.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.messageItem, { borderBottomColor: theme.border }]}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={[styles.name, { color: theme.textPrimary }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.timestamp, { color: theme.textTertiary }]}>
            {item.timestamp}
          </Text>
        </View>
        
        <View style={styles.messageFooter}>
          <Text 
            style={[
              styles.lastMessage, 
              { 
                color: item.unread > 0 ? theme.textPrimary : theme.textSecondary,
                fontWeight: item.unread > 0 ? '600' : 'normal'
              }
            ]} 
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          
          {item.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.unreadCount}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Messages</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {filteredMessages.length} conversation{filteredMessages.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.cardBackground }]}>
        <TextInput
          style={[styles.searchInput, { color: theme.textPrimary }]}
          placeholder="Search conversations..."
          placeholderTextColor={theme.textTertiary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Messages List */}
      <FlatList
        data={filteredMessages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  searchContainer: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  messagesList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  messageContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});