import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../navigation/BottomTabNavigator';
import { Colors } from '../constants/colors';
import FavoriteCard from '../components/FavoriteCard';
import useFavorites from '../hooks/useFavorites';

type FavoritesScreenProps = StackScreenProps<RootStackParamList, 'Favorites'>;


interface FavoritesListProps {
  userToken: string;
  navigation: FavoritesScreenProps['navigation'];
  refreshTrigger: number; // << 4. Adicionamos a nova prop "gatilho"
}

const FavoritesList: React.FC<FavoritesListProps> = ({ userToken, navigation, refreshTrigger }) => {
  const { favorites, loading, error, refetch } = useFavorites(userToken);

  // 5. Este useEffect "escuta" o gatilho e chama o refetch quando ele muda.
  useEffect(() => {
    // Evita a primeira execução, que já é feita pelo useFavorites.
    if (refreshTrigger > 0) {
      console.log('Gatilho recebido na tela de Favoritos, recarregando...');
      refetch();
    }
  }, [refreshTrigger]); // Dependência: o gatilho

  // O resto do seu componente permanece IDÊNTICO
  const handleFavoritePress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const handleRetry = () => {
    refetch();
  };

  if (error) {
    Alert.alert(
      'Erro ao carregar favoritos',
      error,
      [{ text: 'Tentar novamente', onPress: handleRetry }, { text: 'OK' }]
    );
    return <View />; 
  }

  const renderItem = ({ item }: { item: any }) => (
    <FavoriteCard
      productId={item.id}
      name={item.name}
      // Corrigindo aqui para passar o ID correto, que parece ser 'item.id' e não 'item.ean'
      onPress={() => handleFavoritePress(item.id)} 
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum produto favoritado ainda</Text>
      <Text style={styles.emptySubText}>
        Adicione produtos aos favoritos para vê-los aqui
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando favoritos...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={favorites.length === 0 ? styles.emptyListContainer : undefined}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token); 
      } catch (e) {
        console.error("Falha ao carregar o userToken do AsyncStorage", e);
        setUserToken(null);
      }
    };
    loadUserToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setRefreshTrigger(prev => prev + 1);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>
      
      {userToken ? (
        <FavoritesList 
          userToken={userToken} 
          navigation={navigation}
          refreshTrigger={refreshTrigger} 
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </View>
  );
};

// Seus estilos (sem alterações)
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
      textAlign: 'center'
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
    emptyListContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: Colors.textSecondary,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubText: {
      fontSize: 14,
      color: Colors.textSecondary,
      textAlign: 'center',
      opacity: 0.7,
    },
});

export default FavoritesScreen;