import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../constants/colors';
import FavoriteCard from '../components/FavoriteCard';
import useFavorites from '../hooks/useFavorites';

// Definindo o tipo para a navegação
type RootStackParamList = {
  Favorites: undefined;
  ProductDetails: { productId: string };
};

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Favorites'>;

type Props = {
  navigation: FavoritesScreenNavigationProp;
};

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const userToken = localStorage.getItem('userToken') || 'mamou';
  const { favorites, loading, error, refetch } = useFavorites(userToken);

  const handleFavoritePress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

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

  const renderItem = ({ item }: { item: any }) => (
    <FavoriteCard
      productId={item.id}
      name={item.name}
      onPress={() => handleFavoritePress(item.ean)}
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={favorites.length === 0 ? styles.emptyListContainer : undefined}
          ListEmptyComponent={renderEmptyComponent}
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