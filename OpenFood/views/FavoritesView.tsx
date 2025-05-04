import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import FavoriteCard from '../components/FavoriteCard'; // Seu componente de card de favorito

// Definindo o tipo do item
type Favorite = {
  id: string;
  name: string;
};

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
  // Lista mock de produtos (substitua com os dados reais)
  const favorites: Favorite[] = [
    { id: '1', name: 'Produto 1' },
    { id: '2', name: 'Produto 2' },
    { id: '3', name: 'Produto 3' },
  ];

  const renderItem = ({ item }: { item: Favorite }) => (
    <FavoriteCard
      productId={item.id}
      name={item.name}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default FavoritesScreen;
