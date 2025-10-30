import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

// Importe seus componentes de tela (Views)
import HomeScreen from '../views/HomeView';
import ProfileScreen from '../views/ProfileView';
import FavoritesScreen from '../views/FavoritesView';
import ProductDetailsView from '../views/ProductDetailsView';
import ScannerScreen from '../views/ScannerView';

// Importe ícones e cores
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

// ===================================================================
// DEFINIÇÃO CENTRALIZADA DOS TIPOS DE ROTA
// ===================================================================

// 1. Defina as telas que pertencem a qualquer StackNavigator no seu app
export type RootStackParamList = {
  HomeScreen: undefined;
  Favorites: undefined;
  ProductDetails: { productId: string };
  Scanner: undefined;
};

// 2. Defina as abas do seu BottomTabNavigator
// Use `NavigatorScreenParams` para informar ao TypeScript sobre os navegadores aninhados
export type RootTabParamList = {
  Home: NavigatorScreenParams<RootStackParamList>;
  Favoritos: NavigatorScreenParams<RootStackParamList>;
  Perfil: undefined;
};

// ===================================================================
// CRIAÇÃO DOS NAVEGADORES TIPADOS
// ===================================================================

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// ===================================================================
// COMPONENTES DE NAVEGAÇÃO
// ===================================================================

// Componente para a Pilha da Aba "Home"
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsView} />
    <Stack.Screen name="Scanner" component={ScannerScreen} />
  </Stack.Navigator>
);

// Componente para a Pilha da Aba "Favoritos"
const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsView} />
  </Stack.Navigator>
);

// Componente principal do Navegador de Abas
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.cardBackground, borderTopWidth: 0 },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="heart" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;