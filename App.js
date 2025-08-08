import React from "react";
import { Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Make path explicit and add a safe fallback for debugging
import HomeScreen from "./containers/Home.js";
import ChatScreen from "./containers/Messages";
import EventsScreen from "./containers/Events";
import CommunityScreen from "./containers/Community";
import Icon from "./components/Icon";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const Tab = createBottomTabNavigator();

function AppNavigator() {
	const { theme, isDarkMode } = useTheme();
	// Debug: log what HomeScreen resolves to at runtime
	console.log('Debug(HomeScreen):', typeof HomeScreen, HomeScreen && HomeScreen.name);
	const DiscoverPlaceholder = () => <Text>Discover (placeholder)</Text>;
	// Only use HomeScreen if it's actually a function (valid React component)
	const DiscoverComponent = typeof HomeScreen === 'function' ? HomeScreen : DiscoverPlaceholder;
	
	// Create navigation theme based on current theme
	const navigationTheme = {
		...(isDarkMode ? DarkTheme : DefaultTheme),
		colors: {
			...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
			primary: theme.primary,
			background: theme.background,
			card: theme.headerBackground,
			text: theme.textPrimary,
			border: theme.border,
			notification: theme.primary,
		},
	};
	
	return (
		<>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<NavigationContainer theme={navigationTheme}>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						headerShown: true,
						headerStyle: {
							backgroundColor: theme.headerBackground,
						},
						headerTintColor: theme.textPrimary,
						headerTitleStyle: {
							fontWeight: 'bold',
							color: theme.textPrimary,
						},
						tabBarIcon: ({ focused }) => {
							const iconFocused = focused ? theme.primary : theme.textTertiary;
							let iconName;

							if (route.name === 'Discover') {
								iconName = 'explore';
							} else if (route.name === 'Chat') {
								iconName = 'chat';
							} else if (route.name === 'Events') {
								iconName = 'heart';
							} else if (route.name === 'Community') {
								iconName = 'user';
							}

							return <Icon name={iconName} color={iconFocused} size={20} />;
						},
						tabBarActiveTintColor: theme.primary,
						tabBarInactiveTintColor: theme.textTertiary,
						tabBarShowLabel: false,
						tabBarStyle: {
							backgroundColor: theme.headerBackground,
							borderTopWidth: 0,
							marginBottom: 0,
							shadowOpacity: 0.05,
							shadowRadius: 10,
							shadowColor: theme.shadow,
							shadowOffset: { height: 0, width: 0 }
						}
					})}
				>
					{/* Use children render to avoid passing an invalid component prop */}
					<Tab.Screen name="Discover">
						{() => <DiscoverComponent />}
					</Tab.Screen>
					<Tab.Screen name="Chat" component={ChatScreen} />
					<Tab.Screen name="Events" component={EventsScreen} />
					<Tab.Screen name="Community" component={CommunityScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		</>
	);
}

export default function App() {
	return (
		<ThemeProvider>
			<AppNavigator />
		</ThemeProvider>
	);
}
