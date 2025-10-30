// components/ToggleVisibility.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const ToggleVisibility: React.FC<Props> = ({ value, onChangeText }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={togglePasswordVisibility}>
      <Text style={styles.text}>{value}</Text>
      <Ionicons
        name={isPasswordVisible ? 'eye-off' : 'eye'}
        size={24}
        color="gray"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginRight: 8,
  },
});

export default ToggleVisibility;
