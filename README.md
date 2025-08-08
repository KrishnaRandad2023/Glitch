# StudyConnect - React Native Study Partner App

A Tinder-style mobile application built with React Native and Expo that helps students find study partners, join study groups, and connect with their academic community.

## 📱 Features

### 🔍 **Discover Screen**
- Swipe through student profiles to find study partners
- View academic information (major, GPA, year)
- Browse skills and study interests
- Tinder-style card interface with swipe gestures

### 💬 **Messages**
- Chat with matched study partners
- Real-time messaging interface
- Search conversations
- Online status indicators

### 📅 **Events**
- Browse study sessions, workshops, and hackathons
- Filter events by category (Study Groups, Workshops, Hackathons, Networking)
- Join events and view attendance
- Organized by date and location

### 👥 **Community**
- Community posts and discussions
- Study group discovery
- Academic leaderboard
- Share achievements and ask questions

### 🌙 **Dark Mode Support**
- Complete dark/light theme system
- Seamless theme switching
- System-aware status bar
- Consistent theming across all screens

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/studyconnect-app.git
   cd studyconnect-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For Web
   npm run web
   ```

## 📁 Project Structure

```
tinder-app/
├── App.js                 # Main app component with navigation
├── package.json           # Dependencies and scripts
├── babel.config.js        # Babel configuration
├── app.json              # Expo configuration
│
├── assets/               # Static assets
│   ├── data/
│   │   └── profiles.js   # Mock student profile data
│   └── images/
│       └── bg.png.js     # Image placeholders
│
├── components/           # Reusable UI components
│   ├── ActionButtons.js  # Swipe action buttons
│   ├── Icon.js          # Custom icon component
│   ├── SimpleCard.js    # Simple card component
│   ├── SwipeCard.js     # Advanced swipe card (with Reanimated)
│   └── SwipeCardSimple.js # Basic swipe card implementation
│
├── containers/           # Screen components
│   ├── Home.js          # Main discover/swipe screen
│   ├── Messages.js      # Chat and messaging
│   ├── Events.js        # Study events and workshops
│   ├── Community.js     # Community posts and groups
│   ├── Matches.js       # Matched connections
│   └── Profile.js       # User profile management
│
└── context/
    └── ThemeContext.js   # Theme management system
```

## 🛠 Technologies Used

- **React Native** 0.79.5 - Mobile app framework
- **Expo** ~53.0.20 - Development platform
- **React Navigation** 7.x - Navigation library
- **React Tinder Card** - Swipe card functionality
- **React Native Gesture Handler** - Advanced gesture handling
- **React Native Reanimated** - Smooth animations
- **Context API** - State management for theming

## 🎨 Design System

### Theme Structure
```javascript
// Light Theme
const lightTheme = {
  background: '#f8f9fa',
  cardBackground: '#ffffff',
  textPrimary: '#1a1a1a',
  textSecondary: '#6c757d',
  primary: '#7444C0',
  border: '#e9ecef',
  shadow: 'rgba(0,0,0,0.1)',
};

// Dark Theme
const darkTheme = {
  background: '#0d1117',
  cardBackground: '#21262d',
  textPrimary: '#f0f6fc',
  textSecondary: '#8b949e',
  primary: '#9d4edd',
  border: '#30363d',
  shadow: 'rgba(0,0,0,0.4)',
};
```

### Color Palette
- **Primary Purple**: `#7444C0` (Light) / `#9d4edd` (Dark)
- **Success Green**: `#4CAF50`
- **Warning Orange**: `#FF9800`
- **Info Blue**: `#2196F3`
- **Error Red**: `#F44336`

## 📱 Screenshots

*Add screenshots of your app here*

## 🔧 Configuration

### Expo Configuration (`app.json`)
```json
{
  "expo": {
    "name": "StudyConnect",
    "slug": "studyconnect-app",
    "orientation": "portrait",
    "newArchEnabled": true
  }
}
```

### Environment Setup
The app uses mock data for development. In production, you would:

1. Replace mock data with API calls
2. Implement real authentication
3. Add push notifications
4. Connect to a backend service

## 🚀 Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Roadmap

### Phase 1 ✅ (Completed)
- [x] Basic swipe functionality
- [x] Navigation system
- [x] Theme system with dark mode
- [x] Mock data integration
- [x] Community features
- [x] Events system

### Phase 2 🚧 (In Progress)
- [ ] User authentication
- [ ] Real-time messaging
- [ ] Push notifications
- [ ] Profile customization

### Phase 3 📝 (Planned)
- [ ] Backend integration
- [ ] Advanced matching algorithm
- [ ] Study session scheduling
- [ ] Achievement system
- [ ] Location-based features

## 🐛 Known Issues

- Image loading occasionally fails (fallback implemented)
- Swipe animations may lag on older devices
- Web version has limited gesture support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Native Community](https://reactnative.dev/)
- [Expo Team](https://expo.dev/)
- [Picsum Photos](https://picsum.photos/) for placeholder images
- Inspired by modern social networking apps

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: your-email@example.com
- Documentation: [Link to docs]

---

**Made with ❤️ for students, by students**