import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

// 1. A única propriedade que este componente precisa é a função 'onPress'
//    que será fornecida pela tela que o utiliza (a HomeScreen).
type ScanButtonProps = {
  onPress: () => void;
};

// 2. Recebemos a propriedade 'onPress' e a usamos diretamente.
const ScanButton: React.FC<ScanButtonProps> = ({ onPress }) => {
  return (
    // 3. O 'onPress' do TouchableOpacity executa a função que veio "de fora".
    //    Neste caso, será a função 'handleScan' da HomeScreen.
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="camera" size={22} color={Colors.text || '#fff'} />
      <Text style={styles.buttonText}>Escanear Código</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 28, // Bordas mais arredondadas para um visual moderno
    marginTop: 16,
    // Sombra para dar um efeito de elevação
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: Colors.text || '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ScanButton;