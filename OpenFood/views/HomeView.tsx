import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../constants/colors';
import SearchInput from '../components/SearchInput';
import ScanButton from '../components/ScanButton';
import FavoriteList from '../components/FavoriteList';

// Define navigation param list types for proper TypeScript support
type RootStackParamList = {
  HomeScreen: undefined;
  ProductDetails: { productId: string };
  Scanner: undefined;
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

const mockFavorites = [
  { id: '1', name: 'Maçã Fuji' },
  { id: '2', name: 'Iogurte Natural' },
  { id: '3', name: 'Arroz Integral' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');

  const handleSearch = () => {
    if (barcode.trim()) {
      navigation.navigate('ProductDetails', { productId: barcode });
    }
  };

  const handleScan = () => {
    navigation.navigate('Scanner');
  };

  const handleFavoritePress = (id: string) => {
    navigation.navigate('ProductDetails', { productId: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Produto</Text>

      {/* Componente de entrada de código de barras */}
      <SearchInput value={barcode} onChangeText={setBarcode} onSearch={handleSearch} />

      {/* Componente de botão de escanear */}
      <ScanButton onPress={handleScan} />

      {/* Componente de lista de favoritos */}
      <Text style={styles.subtitle}>Favoritos</Text>
      <FavoriteList favorites={mockFavorites} onPressFavorite={handleFavoritePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
});

export default HomeScreen;