import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera, MediaType, ImagePickerResponse } from 'react-native-image-picker';
import { Colors } from '../constants/colors';

type ScanButtonProps = {
  onScanComplete?: (imageUri: string) => void;
  onError?: (error: string) => void;
};

const ScanButton: React.FC<ScanButtonProps> = ({ onScanComplete, onError }) => {
  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorMessage) {
        const errorMsg = `Erro na câmera: ${response.errorMessage}`;
        onError?.(errorMsg);
        Alert.alert('Erro', errorMsg);
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          onScanComplete?.(imageUri);
          // Aqui você pode processar a imagem para detectar códigos
          // Por exemplo, usar react-native-qrcode-local-image para QR codes
        }
      }
    });
  };

  return (
    <TouchableOpacity style={styles.scanButton} onPress={handleCameraLaunch}>
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