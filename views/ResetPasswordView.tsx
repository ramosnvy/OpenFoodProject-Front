import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Colors } from '../constants/colors';

type ResetPasswordScreenProps = {
  navigation: any;
};

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Aqui você pode adicionar lógica para redefinir a senha
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={28} color={Colors.primary} />
      </TouchableOpacity>


      <Text style={styles.header}>Redefinir Senha</Text>
      <InputField
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Redefinir Senha" onPress={handleResetPassword} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    paddingTop: 60, // espaço para o botão de voltar
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 6,
    color: Colors.primary,
    fontSize: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 40,
  },
});

export default ResetPasswordScreen;
