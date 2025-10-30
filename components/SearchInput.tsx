import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText, onSearch }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Digite o código de barras"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <Icon name="search" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    color: Colors.text,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    padding: 12,
  },
});

export default SearchInput;
