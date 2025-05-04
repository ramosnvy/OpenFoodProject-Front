// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../components/Button'; 
import InputField from '../components/InputField';
import Icon from 'react-native-vector-icons/Feather'; 
import { Colors } from '../constants/colors';
import { useAuth } from '../hooks/useAuth'; // Importando o hook personalizado

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

  const handleLoginPress = () => {
    // Lógica de autenticação simples para testes
    if (email === 'teste' && password === '123') {
      setIsAuthenticated(true); // Altera o estado para logado
      navigation.navigate('Home'); // Navega para a tela principal
    } else {
      // Exemplo de lógica de erro
      alert('E-mail ou senha incorretos!');
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
