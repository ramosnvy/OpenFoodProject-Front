import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';

// 1. Importações necessárias
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';

// 2. Importando os tipos do nosso navegador centralizado
import { RootStackParamList } from '../navigation/BottomTabNavigator'; // <-- Verifique o caminho
import { Colors } from '../constants/colors';
import FavoriteCard from '../components/FavoriteCard';
import useFavorites from '../hooks/useFavorites';

// Tipagem para as props de navegação desta tela
type FavoritesScreenProps = StackScreenProps<RootStackParamList, 'Favorites'>;

// ===================================================================
// Componente Interno para exibir a lista de favoritos
// ===================================================================
interface FavoritesListProps {
  userToken: string;
  navigation: FavoritesScreenProps['navigation']; // Passando a navegação para o filho
}

const FavoritesList: React.FC<FavoritesListProps> = ({ userToken, navigation }) => {
  // O hook agora é chamado aqui, com a certeza de que 'userToken' é uma string
  const { favorites, loading, error, refetch } = useFavorites(userToken);

  const handleFavoritePress = (productId: string) => {
    // Usamos a prop de navegação para ir aos detalhes do produto
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
    // Retorna a tela de vazia em caso de erro para não quebrar a UI
    return <View />; 
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


// ===================================================================
// Componente Principal da Tela
// ===================================================================
const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>
      
      {userToken ? (
        // Passamos o token e a navegação para o componente filho
        <FavoritesList userToken={userToken} navigation={navigation} />
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