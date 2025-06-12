import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';

// Importe os tipos e componentes
import { RootStackParamList } from '../navigation/BottomTabNavigator'; // <-- Verifique o caminho
import { Colors } from '../constants/colors';
import SearchInput from '../components/SearchInput';
import ScanButton from '../components/ScanButton';
import FavoriteList from '../components/FavoriteList';
import useFavorites from '../hooks/useFavorites';

// ===================================================================
// Componente Interno para Exibir os Favoritos
// Ele só será chamado quando 'userToken' for uma string válida.
// ===================================================================
const FavoritesSection: React.FC<{ userToken: string }> = ({ userToken }) => {
  // 1. O hook agora é chamado aqui, com a certeza de que `userToken` é uma string.
  const { favorites, loading, error, refetch } = useFavorites(userToken);

  if (error) {
    Alert.alert(
      'Erro ao carregar favoritos',
      error,
      [{ text: 'Tentar novamente', onPress: refetch }, { text: 'OK' }]
    );
  }

  return (
    <>
      <Text style={styles.subtitle}>Favoritos</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      ) : (
        <FavoriteList
          favorites={favorites}
          onPressFavorite={(id) => { /* Adicione a navegação se necessário */ }}
        />
      )}
    </>
  );
};

// ===================================================================
// Componente Principal da Tela
// ===================================================================
type HomeScreenProps = StackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const loadUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token || 'mamou');
      } catch (e) {
        console.error("Falha ao carregar o userToken do AsyncStorage", e);
        setUserToken('mamou');
      }
    };
    loadUserToken();
  }, []);

  const handleSearch = () => {
    if (barcode.trim()) {
      navigation.navigate('ProductDetails', { productId: barcode });
    }
  };

  const handleScan = () => {
    navigation.navigate('Scanner');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Produto</Text>
      
      <SearchInput
        value={barcode}
        onChangeText={setBarcode}
        onSearch={handleSearch}
      />
      <ScanButton onPress={handleScan} />

      {/* 2. Lógica de renderização condicional: */}
      {userToken ? (
        // Se o token já foi carregado, renderiza a seção de favoritos
        <FavoritesSection userToken={userToken} />
      ) : (
        // Enquanto o token não for carregado, mostra um loading
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </View>
  );
};

// Seus estilos
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
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '600',
      color: Colors.primary,
      marginBottom: 8,
      marginTop: 24,
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