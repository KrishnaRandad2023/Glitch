import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

const communityTabs = ['Posts', 'Study Groups', 'Leaderboard'];

const mockPosts = [
  {
    id: 1,
    author: "Emma Chen",
    authorAvatar: "https://picsum.photos/400/600?random=1",
    timeAgo: "2h",
    content: "Just finished implementing a binary search tree in Python! 🌳 Anyone want to review my code and share optimization tips?",
    likes: 24,
    comments: 8,
    tags: ["Python", "Data Structures"],
    liked: false
  },
  {
    id: 2,
    author: "Alex Rodriguez",
    authorAvatar: "https://picsum.photos/400/600?random=2",
    timeAgo: "4h",
    content: "Our robotics team won first place at the regional competition! 🤖🏆 Thanks to everyone who helped with testing.",
    likes: 89,
    comments: 23,
    tags: ["Robotics", "Competition"],
    liked: true
  },
  {
    id: 3,
    author: "Sofia Martinez",
    authorAvatar: "https://picsum.photos/400/600?random=3",
    timeAgo: "6h",
    content: "Created a data visualization dashboard for our statistics project. The correlation insights are fascinating! 📊",
    likes: 35,
    comments: 12,
    tags: ["Data Science", "Visualization"],
    liked: false
  }
];

const mockStudyGroups = [
  {
    id: 1,
    name: "Advanced Algorithms",
    description: "Weekly problem solving sessions",
    members: 24,
    subject: "Computer Science",
    meetingTime: "Wednesdays 6PM",
    image: "https://picsum.photos/400/400?random=10"
  },
  {
    id: 2,
    name: "Machine Learning Enthusiasts",
    description: "Exploring ML concepts together",
    members: 18,
    subject: "AI/ML",
    meetingTime: "Fridays 4PM",
    image: "https://picsum.photos/400/400?random=11"
  },
  {
    id: 3,
    name: "Calculus Study Circle",
    description: "Math problem solving support",
    members: 31,
    subject: "Mathematics",
    meetingTime: "Daily 7PM",
    image: "https://picsum.photos/400/400?random=12"
  }
];

const mockLeaderboard = [
  { rank: 1, name: "Marcus Johnson", points: 2540, avatar: "https://picsum.photos/400/600?random=4", badge: "🏆" },
  { rank: 2, name: "Luna Kim", points: 2380, avatar: "https://picsum.photos/400/600?random=5", badge: "🥈" },
  { rank: 3, name: "Emma Chen", points: 2150, avatar: "https://picsum.photos/400/600?random=1", badge: "🥉" },
  { rank: 4, name: "Sofia Martinez", points: 1940, avatar: "https://picsum.photos/400/600?random=3", badge: "" },
  { rank: 5, name: "Alex Rodriguez", points: 1820, avatar: "https://picsum.photos/400/600?random=2", badge: "" },
];

export default function CommunityScreen() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('Posts');

  const renderTabButton = (tab) => (
    <TouchableOpacity
      key={tab}
      style={[
        styles.tabButton,
        {
          backgroundColor: selectedTab === tab ? theme.primary : 'transparent',
          borderBottomColor: selectedTab === tab ? theme.primary : 'transparent'
        }
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[
        styles.tabText,
        { color: selectedTab === tab ? 'white' : theme.textSecondary }
      ]}>
        {tab}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => (
    <View style={[styles.postCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.authorAvatar }} style={styles.authorAvatar} />
        <View style={styles.authorInfo}>
          <Text style={[styles.authorName, { color: theme.textPrimary }]}>{item.author}</Text>
          <Text style={[styles.timeAgo, { color: theme.textTertiary }]}>{item.timeAgo}</Text>
        </View>
      </View>

      <Text style={[styles.postContent, { color: theme.textPrimary }]}>{item.content}</Text>

      <View style={styles.postTags}>
        {item.tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: theme.primary + '20' }]}>
            <Text style={[styles.tagText, { color: theme.primary }]}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={[styles.actionText, { color: item.liked ? '#E91E63' : theme.textSecondary }]}>
            {item.liked ? '❤️' : '🤍'} {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={[styles.actionText, { color: theme.textSecondary }]}>💬 {item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={[styles.actionText, { color: theme.textSecondary }]}>🔗 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStudyGroup = ({ item }) => (
    <TouchableOpacity style={[styles.studyGroupCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <View style={styles.groupInfo}>
        <Text style={[styles.groupName, { color: theme.textPrimary }]}>{item.name}</Text>
        <Text style={[styles.groupDescription, { color: theme.textSecondary }]}>{item.description}</Text>
        <Text style={[styles.groupSubject, { color: theme.primary }]}>{item.subject}</Text>
        <View style={styles.groupDetails}>
          <Text style={[styles.groupMembers, { color: theme.textTertiary }]}>👥 {item.members} members</Text>
          <Text style={[styles.groupTime, { color: theme.textTertiary }]}>⏰ {item.meetingTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderLeaderboardItem = ({ item }) => (
    <View style={[styles.leaderboardItem, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      <Text style={[styles.rank, { color: theme.textPrimary }]}>{item.badge || `#${item.rank}`}</Text>
      <Image source={{ uri: item.avatar }} style={styles.leaderAvatar} />
      <View style={styles.leaderInfo}>
        <Text style={[styles.leaderName, { color: theme.textPrimary }]}>{item.name}</Text>
        <Text style={[styles.leaderPoints, { color: theme.primary }]}>{item.points} points</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'Posts':
        return (
          <FlatList
            data={mockPosts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'Study Groups':
        return (
          <FlatList
            data={mockStudyGroups}
            renderItem={renderStudyGroup}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'Leaderboard':
        return (
          <FlatList
            data={mockLeaderboard}
            renderItem={renderLeaderboardItem}
            keyExtractor={(item) => item.rank.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Community</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Connect with your study community
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { borderBottomColor: theme.border }]}>
        {communityTabs.map(renderTabButton)}
      </View>

      {/* Content */}
      {renderContent()}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 20,
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  
  // Post styles
  postCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  postTags: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Study Group styles
  studyGroupCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  groupSubject: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  groupDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupMembers: {
    fontSize: 12,
  },
  groupTime: {
    fontSize: 12,
  },
  
  // Leaderboard styles
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
  },
  leaderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 12,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  leaderPoints: {
    fontSize: 14,
    fontWeight: '500',
  },
});