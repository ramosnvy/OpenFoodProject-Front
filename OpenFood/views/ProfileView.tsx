// views/ProfileView.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import ProfilePicture from '../components/ProfilePicture';
import Button from '../components/Button';
import { Colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { logout } = useAuth();
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState('25');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('Vegetariano');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const handleEditProfile = () => {
    Alert.alert('Perfil', 'Informações atualizadas com sucesso!');
  };

  const handleLogout = () => {
    // Simplesmente chame logout - o RootNavigator fará a troca para AuthNavigator
    logout();
  };

  const handleImagePress = () => {
    Alert.alert('Trocar foto', 'Aqui você pode escolher uma nova foto.');
  };

  return (
    <View style={styles.container}>
      <ProfilePicture imageUri={imageUri} onPress={handleImagePress} />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Restrições Alimentares"
        value={dietaryRestrictions}
        onChangeText={setDietaryRestrictions}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Salvar Alterações" onPress={handleEditProfile} />
      <Button title="Deslogar" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
    borderColor: Colors.inputBorder,
    borderWidth: 1,
  },
});

export default ProfileScreen;