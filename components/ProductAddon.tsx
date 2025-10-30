// components/ProductAddon.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

interface ProductAddonProps {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  onToggle: (id: string) => void;
}

const ProductAddon: React.FC<ProductAddonProps> = ({
  id,
  name,
  price,
  selected,
  onToggle,
}) => {
  const handlePress = () => {
    onToggle(id);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, selected && styles.containerSelected]} 
      onPress={handlePress}
    >
      <View style={styles.leftContent}>
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && <Icon name="check" size={14} color={Colors.buttonText} />}
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.price}>
        + R$ {price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  containerSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.cardBackground,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  name: {
    fontSize: 16,
    color: Colors.text,
  },
  price: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});

export default ProductAddon;