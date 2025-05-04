// BottomNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../views/HomeView';
import ProfileScreen from '../views/ProfileView';
import FavoritesScreen from '../views/FavoritesView';
import ProductDetailsView from '../views/ProductDetailsView';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack for Home tab with route to ProductDetails
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsView} />
  </Stack.Navigator>
);

// Stack for Favorites tab with route to ProductDetails
const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsView} />
  </Stack.Navigator>
);

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.cardBackground,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack} // Using Stack for Home instead of direct HomeScreen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;