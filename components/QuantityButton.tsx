// components/QuantityButton.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

interface QuantityButtonProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, quantity <= minQuantity && styles.buttonDisabled]} 
        onPress={onDecrease}
        disabled={quantity <= minQuantity}
      >
        <Icon 
          name="minus" 
          size={18} 
          color={quantity <= minQuantity ? Colors.textLight : Colors.text} 
        />
      </TouchableOpacity>
      
      <Text style={styles.quantity}>{quantity}</Text>
      
      <TouchableOpacity style={styles.button} onPress={onIncrease}>
        <Icon name="plus" size={18} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 4,
    overflow: 'hidden',
  },
  button: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  buttonDisabled: {
    backgroundColor: Colors.divider,
  },
  quantity: {
    minWidth: 36,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default QuantityButton;