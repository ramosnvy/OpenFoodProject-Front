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
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';
import { Product, mockProduct } from '../models/Product';
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
  
  useEffect(() => {
    // Em um aplicativo real, buscaríamos o produto pelo ID
    // Aqui, estamos usando o mockProduct como exemplo
    setProduct(mockProduct);
  }, [route.params?.productId]);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
        <Text style={styles.headerTitle}>{product.name}</Text>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Icon 
            name={isFavorite ? "heart" : "heart"} 
            size={24} 
            color={isFavorite ? Colors.primaryLight : Colors.white}
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
          
          <View style={styles.ratingContainer}>
            <Icon name="star" size={18} color={Colors.secondary} />
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} avaliações)</Text>
          </View>
          
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          
          <Text style={styles.description}>{product.description}</Text>
          
          {/* Badges de dieta */}
          <View style={styles.badgesContainer}>
            <DietBadge type="vegetarian" active={product.isVegetarian} />
            <DietBadge type="vegan" active={product.isVegan} />
            <DietBadge type="glutenFree" active={product.isGlutenFree} />
            <DietBadge type="lactoseFree" active={product.isLactoseFree} />
          </View>
        </View>
        
        {/* Lista de Ingredientes */}
        <IngredientsList 
          ingredients={product.ingredients} 
          allergens={product.allergens} 
        />
        
        {/* Informações Nutricionais */}
        <NutritionalInfoCard nutritionalInfo={product.nutritionalInfo} />
        
        {/* Avaliações */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Avaliações</Text>
          {product.reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </View>
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