// views/ProductDetailsView.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';
import { API_BASE_URL } from '../constants/api';
import { Product } from '../models/Product';
import DietBadge from '../components/DietBadge';
import NutritionalInfoCard from '../components/NutritionalInfoCard';
import IngredientsList from '../components/IngredientsList';
import ReviewItem from '../components/ReviewItem';

type ParamList = {
  ProductDetails: { productId: string };
};

const ProductDetailsView = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'ProductDetails'>>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiInsights, setAiInsights] = useState('');
  const [showInsights, setShowInsights] = useState(false);

  // Função para mapear os dados da API para o formato do Product
  const mapApiDataToProduct = (apiData: any): Product => {
    return {
      id: apiData._id,
      name: apiData.name,
      ean: apiData.ean,
      description: apiData.description,
      price: 0, // A API não retorna preço, então definimos como 0
      imageUrl: apiData.imageUrl || 'https://via.placeholder.com/400x300',
      restaurantName: apiData.restaurantName,
      category: apiData.category,
      rating: 0, // A API não retorna rating, então definimos como 0
      reviewCount: 0, // A API não retorna reviewCount, então definimos como 0
      ingredients: apiData.ingredients ? 
        apiData.ingredients.map((ing: any) => 
          typeof ing === 'string' ? ing : ing.ingredient
        ) : [],
      allergens: apiData.allergens || [],
      nutritionalInfo: {
        calories: apiData.nutritionalInfo?.calories || 0,
        proteins: apiData.nutritionalInfo?.protein || 0,
        carbs: apiData.nutritionalInfo?.carbohydrates || 0,
        fats: apiData.nutritionalInfo?.fat || 0,
        sodium: apiData.nutritionalInfo?.sodium || 0
      },
      reviews: [], // A API não retorna reviews, então definimos como array vazio
      isVegetarian: apiData.isVegetarian || false,
      isVegan: apiData.isVegan || false,
      isGlutenFree: apiData.isGlutenFree || false,
      isLactoseFree: apiData.isLactoseFree || false
    };
  };

  // Função para verificar se o produto está favoritado
const checkIfFavorited = async (barcode: string) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const response = await fetch(`${API_BASE_URL}/api/favorites/${userToken}`, {
      method: 'GET'
    });

    if (response.ok) {
      const data = await response.json();

      console.log('Lista de favoritos:', data);
      
      // Verifica se existe algum produto com EAN igual ao barcode
      const isFavorited = data.some((favorite: any) => favorite.product.ean === barcode);
      
      setIsFavorite(isFavorited);
    } else {
      // Se a resposta não foi ok, considera como não favoritado
      setIsFavorite(false);
    }
  } catch (error) {
    console.error('Erro ao verificar se produto está favoritado:', error);
    // Em caso de erro, considera como não favoritado
    setIsFavorite(false);
  }
};

  // Função para carregar o produto da API
  const loadProduct = async (barcode: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/products/${barcode}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Produto não encontrado');
        }
        throw new Error('Erro ao carregar produto');
      }

      const apiData = await response.json();
      const productPayload = apiData.product ?? apiData;
      const mappedProduct = mapApiDataToProduct(productPayload);
      setProduct(mappedProduct);
      setAiInsights(typeof apiData.aiInsights === 'string' ? apiData.aiInsights : '');
      setShowInsights(false);
      
      // Verificar se o produto está favoritado após carregar
      await checkIfFavorited(mappedProduct.ean);
    } catch (err) {
      console.error('Erro ao carregar produto:', err);
      setAiInsights('');
      setShowInsights(false);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      Alert.alert(
        'Erro',
        'Não foi possível carregar o produto. Verifique sua conexão e tente novamente.',
        [
          { text: 'Voltar', onPress: () => navigation.goBack() },
          { text: 'Tentar novamente', onPress: () => loadProduct(barcode) }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const productId = route.params?.productId;
    if (productId) {
      loadProduct(productId);
    } else {
      setError('ID do produto não fornecido');
      setLoading(false);
    }
  }, [route.params?.productId]);

  const toggleFavorite = async () => {
    try {
      // Recuperar dados do usuário do AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (!userToken) {
        Alert.alert(
          'Erro',
          'Você precisa estar logado para favoritar produtos.',
          [{ text: 'OK' }]
        );
        return;
      }

      if (!product?.id) {
        Alert.alert('Erro', 'Produto não encontrado.');
        return;
      }


      if(isFavorite){
        const response = await fetch(`${API_BASE_URL}/api/favorites/${userToken}/${product.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'}
      });

     setIsFavorite(false);

      }else{
      const favoriteData = {
        userId: userToken,
        productId: product.id
      };

      const response = await fetch(`${API_BASE_URL}/api/favorites/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify(favoriteData)
      });

      console.log( JSON.stringify(favoriteData));
      const data = await response.json();

      if (response.ok) {
        // Atualiza o estado local apenas se a requisição foi bem-sucedida
        setIsFavorite(!isFavorite);
        console.log('Favorito atualizado:', data);
        
        // Feedback visual opcional
        Alert.alert(
          'Sucesso',
          isFavorite ? 'Produto removido dos favoritos' : 'Produto adicionado aos favoritos',
          [{ text: 'OK' }]
        );
      } else {
        console.error('Erro ao atualizar favorito:', data.message || 'Erro desconhecido');
        Alert.alert(
          'Erro',
          data.message || 'Não foi possível atualizar os favoritos.',
          [{ text: 'OK' }]
        );
      }
    }
    } catch (error) {
      console.error('Erro na requisição de favoritos:', error);
      Alert.alert(
        'Erro',
        'Erro de conexão. Verifique sua internet e tente novamente.',
        [{ text: 'OK' }]
      );
    }
  };

  // Tela de carregamento
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={Colors.buttonText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carregando...</Text>
          <View style={styles.favoriteButton} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Carregando produto...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Tela de erro
  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={Colors.buttonText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Erro</Text>
          <View style={styles.favoriteButton} />
        </View>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={48} color={Colors.error} />
          <Text style={styles.errorText}>{error || 'Produto não encontrado'}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => route.params?.productId && loadProduct(route.params.productId)}
          >
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={Colors.buttonText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{product.name}</Text>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Icon 
            name={isFavorite ? "heart" : "heart"} 
            size={24} 
            color={isFavorite ? Colors.success : Colors.white}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Imagem do produto */}
        <Image 
          source={{ uri: product.imageUrl }} 
          style={styles.productImage} 
          resizeMode="cover"
        />
        
        {/* Informações básicas */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.eanContainer}>
            <Icon name="hash" size={14} color={Colors.textSecondary} />
            <Text style={styles.eanText}>EAN: {product.ean}</Text>
          </View>
          
          <Text style={styles.restaurantName}>{product.restaurantName}</Text>
          
          {/* Só mostra rating se tiver dados */}
          {product.reviewCount > 0 && (
            <View style={styles.ratingContainer}>
              <Icon name="star" size={18} color={Colors.secondary} />
              <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({product.reviewCount} avaliações)</Text>
            </View>
          )}
          
          {/* Só mostra preço se tiver valor */}
          {product.price > 0 && (
            <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          )}
          
          <Text style={styles.description}>{product.description}</Text>
          
          {/* Badges de dieta */}
          <View style={styles.badgesContainer}>
            <DietBadge type="vegetarian" active={product.isVegetarian} />
            <DietBadge type="vegan" active={product.isVegan} />
            <DietBadge type="glutenFree" active={product.isGlutenFree} />
            <DietBadge type="lactoseFree" active={product.isLactoseFree} />
          </View>

          {aiInsights ? (
            <TouchableOpacity
              style={styles.insightsButton}
              onPress={() => setShowInsights((prev) => !prev)}
              activeOpacity={0.85}
            >
              <Icon name="activity" size={16} color={Colors.buttonText} />
              <Text style={styles.insightsButtonText}>
                {showInsights ? 'Ocultar insights da IA' : 'Ver insights da IA'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {showInsights && aiInsights ? (
          <View style={styles.insightsCard}>
            <Text style={styles.insightsTitle}>Insights da IA</Text>
            {aiInsights
              .split('\n')
              .map((line) => line.trim())
              .filter((line) => line.length > 0)
              .map((line, index) => (
                <Text key={`insight-${index}`} style={styles.insightsParagraph}>
                  {line}
                </Text>
              ))}
          </View>
        ) : null}

        {/* Lista de Ingredientes */}
        {product.ingredients.length > 0 && (
          <IngredientsList 
            ingredients={product.ingredients} 
            allergens={product.allergens} 
          />
        )}
        
        {/* Informações Nutricionais */}
        <NutritionalInfoCard nutritionalInfo={product.nutritionalInfo} />
        
        {/* Avaliações - só mostra se tiver reviews */}
        {product.reviews.length > 0 && (
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Avaliações</Text>
            {product.reviews.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 24,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 56,
    paddingHorizontal: 16,
    elevation: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.buttonText,
    marginLeft: 16,
    textAlign: 'center',
  },
  favoriteButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 250,
  },
  productInfo: {
    padding: 16,
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    elevation: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  eanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eanText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  restaurantName: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  insightsButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  insightsButtonText: {
    marginLeft: 8,
    color: Colors.buttonText,
    fontSize: 14,
    fontWeight: '600',
  },
  insightsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
    elevation: 2,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  insightsParagraph: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  reviewsSection: {
    padding: 16,
    marginBottom: 24,
  },
});

export default ProductDetailsView;
