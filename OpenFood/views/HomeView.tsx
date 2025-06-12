import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../constants/colors';
import SearchInput from '../components/SearchInput';
import ScanButton from '../components/ScanButton';
import FavoriteList from '../components/FavoriteList';
import useFavorites from '../hooks/useFavorites';

// Define navigation param list types for proper TypeScript support
type RootStackParamList = {
  HomeScreen: undefined;
  ProductDetails: { productId: string };
  Scanner: undefined;
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  
  const userToken = localStorage.getItem('userToken') || 'mamou';
  const { favorites, loading, error, refetch } = useFavorites(userToken);

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

  // Função para tentar novamente em caso de erro
  const handleRetry = () => {
    refetch();
  };

  // Exibir erro se houver
  if (error) {
    Alert.alert(
      'Erro ao carregar favoritos',
      error,
      [
        { text: 'Tentar novamente', onPress: handleRetry },
        { text: 'OK', style: 'cancel' }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Produto</Text>
      
      {/* Componente de entrada de código de barras */}
      <SearchInput
        value={barcode}
        onChangeText={setBarcode}
        onSearch={handleSearch}
      />
      
      {/* Componente de lista de favoritos */}
      <Text style={styles.subtitle}>Favoritos</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      ) : (
        <FavoriteList
          favorites={favorites}
          onPressFavorite={handleFavoritePress}
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.primary,
  },
});

export default HomeScreen;