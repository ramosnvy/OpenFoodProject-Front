import React from 'react';
import { FlatList, Text } from 'react-native';
import FavoriteCard from './FavoriteCard'; // ajuste o caminho se necessário

interface Favorite {
  id: string;
  name: string;
  ean: string;
}

interface FavoriteListProps {
  favorites: Favorite[];
  onPressFavorite: (ean: string) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({ favorites, onPressFavorite }) => {
  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <>
          <FavoriteCard
            productId={item.id}
            name={item.name}
            onPress={() => onPressFavorite(item.ean)}
          />
        </>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default FavoriteList;
