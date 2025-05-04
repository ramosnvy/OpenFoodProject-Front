import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import FavoriteCard from './FavoriteCard';

type FavoriteListProps = {
  favorites: Array<{ id: string, name: string }>;
  onPressFavorite: (id: string) => void;
};

const FavoriteList: React.FC<FavoriteListProps> = ({ favorites, onPressFavorite }) => {
  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FavoriteCard
          productId={item.id} // Adicionando productId aqui
          name={item.name}
          onPress={() => onPressFavorite(item.id)}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default FavoriteList;
