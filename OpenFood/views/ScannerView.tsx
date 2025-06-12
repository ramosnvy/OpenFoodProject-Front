import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

// Importações corretas da câmera e do hook de permissão
import { CameraView, useCameraPermissions } from 'expo-camera';

// Importações para conectar esta tela ao nosso sistema de navegação
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/BottomTabNavigator'; // <-- CONFIRA SE ESTE CAMINHO ESTÁ CORRETO

// Define as props que esta tela recebe do StackNavigator. Essencial para o TypeScript.
type ScannerProps = StackScreenProps<RootStackParamList, 'Scanner'>;

export default function ScannerScreen({ navigation }: ScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Se a permissão ainda não foi determinada, mostra uma tela vazia
  if (!permission) {
    return <View />;
  }

  // Se a permissão foi negada, mostra um botão para solicitar
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Precisamos de permissão para acessar a câmera.</Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  // Função que lida com o código escaneado
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true); // Evita escanear múltiplas vezes
      // Navega para a tela de detalhes, substituindo a tela do scanner
      navigation.replace('ProductDetails', {
        productId: data,
      });
    }
  };

  // Se a permissão foi concedida, mostra a câmera
  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "code128"], // Configure os tipos de código
        }}
      />
      {scanned && (
        <Button title={'Escanear Novamente?'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});