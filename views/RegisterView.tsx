import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Colors } from '../constants/colors';
import { API_BASE_URL } from '../constants/api';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RegisterScreenProps = {
  navigation: any;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Versão com dados fixos
const handleRegister = async () => {
    try {
    // Validação básica
    if (!email || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const userData = {
      email: email,
      password: password
    };

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      console.log('Usuário registrado com sucesso:', data);
      // Limpar campos do formulário se necessário
      setEmail('');
      setPassword('');
      navigation.navigate('Login');
    } else {
      console.error('Erro no registro:', data.message || 'Erro desconhecido');
      alert(data.message || 'Erro ao criar conta');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro de conexão. Tente novamente.');
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ícone de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FeatherIcon name="arrow-left" size={28} color={Colors.primary} />
      </TouchableOpacity>

      {/* Ícone Temático */}
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons name="food-apple" size={48} color={Colors.primary} />
        <Text style={styles.logoText}>OpenFood</Text>
      </View>

      <Text style={styles.header}>Criar Conta</Text>

      <InputField
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputField
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Criar Conta" onPress={handleRegister} />
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
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 8,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 4,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 32,
  },
});

export default RegisterScreen;
