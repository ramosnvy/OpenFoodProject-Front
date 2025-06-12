
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/BottomTabNavigator';
import { Colors } from '../constants/colors';
import SearchInput from '../components/SearchInput';
import ScanButton from '../components/ScanButton';
import FavoriteList from '../components/FavoriteList';
import useFavorites from '../hooks/useFavorites';

interface FavoritesSectionProps {
  userToken: string;
  onFavoritePress: (id: string) => void;
  refreshTrigger: number; // << 3. Adicionamos a nova prop "gatilho"
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ 
  userToken, 
  onFavoritePress,
  refreshTrigger // << 3. Recebemos o gatilho
}) => {
  const { favorites, loading, error, refetch } = useFavorites(userToken);


  useEffect(() => {

    if (refreshTrigger > 0) {
      console.log('Gatilho de atualização recebido, recarregando favoritos...');
      refetch();
    }
  }, [refreshTrigger]); 

  // O resto do seu componente permanece IDÊNTICO
  if (error) {
    Alert.alert(
      'Erro ao carregar favoritos',
      error,
      [{ text: 'Tentar novamente', onPress: refetch }, { text: 'OK' }]
    );
    return <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>Não foi possível carregar os favoritos.</Text>;
  }

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Text style={styles.subtitle}>Favoritos</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      ) : (
        <FavoriteList
          favorites={favorites}
          onPressFavorite={onFavoritePress}
        />
      )}
    </TouchableOpacity>
  );
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [userToken, setUserToken] = useState<string | null>(null);
  
  // 1. Criamos um estado que servirá de "gatilho" (trigger). Começa em 0.
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error("Falha ao carregar o userToken do AsyncStorage", e);
        setUserToken(null);
      }
    };
    loadUserToken();
  }, []);
  
  // 2. Usamos o useFocusEffect para mudar o gatilho toda vez que a tela é acessada.
  useFocusEffect(
    useCallback(() => {
      // Incrementa o gatilho para fazer o useEffect do filho disparar
      setRefreshTrigger(prev => prev + 1);
    }, [])
  );


  const handleSearch = () => {
    if (barcode.trim()) {
      navigation.navigate('ProductDetails', { productId: barcode });
    }
  };

  const handleScan = () => {
    navigation.navigate('Scanner');
  };

  const handleFavoritePress = (id: string) => {
    navigation.navigate('ProductDetails', { productId: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Produto</Text>
      
      <SearchInput
        value={barcode}
        onChangeText={setBarcode}
        onSearch={handleSearch}
      />
      <ScanButton onPress={handleScan} />

      {userToken && (
        <FavoritesSection 
          userToken={userToken}
          onFavoritePress={handleFavoritePress}
          // 5. Passamos o gatilho para o componente filho.
          refreshTrigger={refreshTrigger}
        />
      )}
    </View>
  );
};

// Seus estilos (sem alterações)
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors.primaryDark,
      marginBottom: 20,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '600',
      color: Colors.primary,
      marginBottom: 8,
      marginTop: 24,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 150,
    },
    loadingText: {
      marginTop: 8,
      fontSize: 16,
      color: Colors.primary,
    },
});
  
export default HomeScreen;