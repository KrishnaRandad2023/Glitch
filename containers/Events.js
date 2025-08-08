import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ScrollView,
  Dimensions 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

const eventCategories = ['All', 'Study Groups', 'Workshops', 'Hackathons', 'Networking'];

const mockEvents = [
  {
    id: 1,
    title: "Advanced React Workshop",
    category: "Workshops",
    date: "Tomorrow",
    time: "2:00 PM",
    location: "Engineering Building, Room 201",
    attendees: 24,
    maxAttendees: 30,
    description: "Learn advanced React patterns and hooks",
    organizer: "Emma Chen",
    type: "workshop"
  },
  {
    id: 2,
    title: "Data Science Study Group",
    category: "Study Groups",
    date: "Today",
    time: "6:00 PM",
    location: "Library Study Room 5",
    attendees: 8,
    maxAttendees: 12,
    description: "Weekly meetup for data science enthusiasts",
    organizer: "Sofia Martinez",
    type: "study-group"
  },
  {
    id: 3,
    title: "AI/ML Hackathon 2025",
    category: "Hackathons",
    date: "This Weekend",
    time: "9:00 AM",
    location: "Computer Science Building",
    attendees: 156,
    maxAttendees: 200,
    description: "48-hour hackathon focused on AI and Machine Learning",
    organizer: "Tech Society",
    type: "hackathon"
  },
  {
    id: 4,
    title: "Cybersecurity Career Fair",
    category: "Networking",
    date: "Next Week",
    time: "10:00 AM",
    location: "Main Campus Center",
    attendees: 89,
    maxAttendees: 150,
    description: "Connect with cybersecurity professionals",
    organizer: "Career Services",
    type: "networking"
  },
  {
    id: 5,
    title: "Calculus Problem Solving",
    category: "Study Groups",
    date: "Friday",
    time: "4:00 PM",
    location: "Mathematics Building, Room 105",
    attendees: 15,
    maxAttendees: 20,
    description: "Collaborative calculus problem solving session",
    organizer: "Luna Kim",
    type: "study-group"
  }
];

export default function EventsScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredEvents = selectedCategory === 'All' 
    ? mockEvents 
    : mockEvents.filter(event => event.category === selectedCategory);

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'workshop': return '#FF9800';
      case 'study-group': return '#4CAF50';
      case 'hackathon': return '#E91E63';
      case 'networking': return '#2196F3';
      default: return theme.primary;
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        { 
          backgroundColor: selectedCategory === item ? theme.primary : theme.cardBackground,
          borderColor: theme.border
        }
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryText,
        { 
          color: selectedCategory === item ? 'white' : theme.textSecondary 
        }
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.eventCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
      activeOpacity={0.7}
    >
      <View style={styles.eventHeader}>
        <View style={styles.eventTitleRow}>
          <Text style={[styles.eventTitle, { color: theme.textPrimary }]} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={[styles.eventTypeBadge, { backgroundColor: getEventTypeColor(item.type) }]}>
            <Text style={styles.eventTypeText}>
              {item.category.replace(' ', '')}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.eventDescription, { color: theme.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

      <View style={styles.eventDetails}>
        <View style={styles.eventInfo}>
          <Text style={[styles.eventDate, { color: theme.primary }]}>
            {item.date} • {item.time}
          </Text>
          <Text style={[styles.eventLocation, { color: theme.textTertiary }]} numberOfLines={1}>
            📍 {item.location}
          </Text>
          <Text style={[styles.eventOrganizer, { color: theme.textTertiary }]}>
            👤 {item.organizer}
          </Text>
        </View>

        <View style={styles.eventStats}>
          <Text style={[styles.attendeeCount, { color: theme.textSecondary }]}>
            {item.attendees}/{item.maxAttendees}
          </Text>
          <Text style={[styles.attendeeLabel, { color: theme.textTertiary }]}>
            attending
          </Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.joinButton, { backgroundColor: theme.primary }]}>
        <Text style={styles.joinButtonText}>Join Event</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Events</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Study events and workshops
        </Text>
      </View>

      {/* Category Filter */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={eventCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.eventsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.eventsListContent}
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
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  eventsList: {
    flex: 1,
  },
  eventsListContent: {
    padding: 16,
  },
  eventCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventHeader: {
    marginBottom: 12,
  },
  eventTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  eventTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventTypeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  eventInfo: {
    flex: 1,
  },
  eventDate: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 13,
    marginBottom: 2,
  },
  eventOrganizer: {
    fontSize: 13,
  },
  eventStats: {
    alignItems: 'flex-end',
  },
  attendeeCount: {
    fontSize: 16,
    fontWeight: '600',
  },
  attendeeLabel: {
    fontSize: 12,
  },
  joinButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});