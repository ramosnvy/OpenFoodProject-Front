import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

type ScanButtonProps = {
  onPress: () => void;
};

const ScanButton: React.FC<ScanButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.scanButton} onPress={onPress}>
      <Icon name="camera" size={22} color="#fff" />
      <Text style={styles.scanText}>Escanear Código</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
  },
  scanText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ScanButton;
