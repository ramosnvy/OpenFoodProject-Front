import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Feather inclui 'eye' e 'eye-off'
import { Colors } from '../constants/colors';

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

export default function InputField({ placeholder, secureTextEntry = false, ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={isPassword && !showPassword}
        {...props}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.toggle}
        >
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
    paddingRight: 50, // espaço para o ícone
  },
  toggle: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});
