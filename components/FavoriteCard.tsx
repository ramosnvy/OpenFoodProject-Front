import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

type FavoriteCardProps = {
  productId: string; // Adicionando o productId
  name: string;
  onPress: () => void;
};

const FavoriteCard: React.FC<FavoriteCardProps> = ({ productId, name, onPress }) => {
  return (
    <TouchableOpacity style={styles.favoriteCard} onPress={onPress}>
      <View style={styles.imagePlaceholder}>
        <Icon name="image" size={32} color="#ccc" />
      </View>
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{name}</Text>
        <Text style={styles.favoriteDetails}>Ver detalhes</Text>
      </View>
      <Icon name="chevron-right" size={24} color={Colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  favoriteDetails: {
    fontSize: 14,
    color: Colors.primary,
    marginTop: 4,
  },
});

export default FavoriteCard;
