// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../components/Button'; 
import InputField from '../components/InputField';
import Icon from 'react-native-vector-icons/Feather'; 
import { Colors } from '../constants/colors';
import { API_BASE_URL } from '../constants/api';
import { useAuth } from '../hooks/useAuth'; // Importando o hook personalizado
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  Home: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { setIsAuthenticated } = useAuth(); // Usando o hook para acessar o contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLoginPress = async () => {
  try {
    // Validação básica
    if (!email || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const loginData = {
      email: email,
      password: password
    };

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (response.ok) {
      // Login bem-sucedido
      console.log('Login realizado com sucesso:', data);
      
      // Salvar ID do usuário retornado pela API
      if (data.id || data.userId || data.user?.id) {
        const userId = data.id || data.userId || data.user?.id;
        await AsyncStorage.setItem('userId', userId.toString());
        console.log('ID do usuário salvo:', userId);
      }
      
      // Se houver token, também salva
      if (data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        console.log('Token salvo:', data.token);
      }
      
      // Salvar outros dados do usuário se necessário
      if (data.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        console.log('Dados do usuário salvos:', data.user);
      }
      
      setIsAuthenticated(true); // Altera o estado para logado
      navigation.navigate('Home'); // Navega para a tela principal
    } else {
      // Erro no login
      console.error('Erro no login:', data.message || 'Erro desconhecido');
      alert(data.message || 'E-mail ou senha incorretos!');
    }
  } catch (error) {
    // Erro de rede ou outro erro
    console.error('Erro na requisição:', error);
    alert('Erro de conexão. Tente novamente.');
  }
};

// Função auxiliar para recuperar o ID do usuário salvo
const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    console.error('Erro ao recuperar ID do usuário:', error);
    return null;
  }
};

// Função auxiliar para recuperar o token salvo
const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    return null;
  }
};

// Função auxiliar para recuperar dados do usuário
const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados do usuário:', error);
    return null;
  }
};

// Função para limpar dados do usuário no logout
const clearUserData = async () => {
  try {
    await AsyncStorage.multiRemove(['userId', 'userToken', 'userData']);
    console.log('Dados do usuário limpos com sucesso');
  } catch (error) {
    console.error('Erro ao limpar dados do usuário:', error);
  }
};

  const handleForgotPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="coffee" size={50} color={Colors.primary} />
        <Text style={styles.title}>Bem-vindo ao OpenFood</Text>
      </View>

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
      <Button title="Login" onPress={handleLoginPress} />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.footerText}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.footerText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 10,
  },
});

export default LoginScreen;
