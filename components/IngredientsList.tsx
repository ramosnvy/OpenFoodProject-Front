// components/IngredientsList.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

interface IngredientsListProps {
  ingredients: string[];
  allergens?: string[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ 
  ingredients, 
  allergens = [] 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredientes</Text>
      
      {ingredients.map((ingredient, index) => {
        const isAllergen = allergens.some(allergen => 
          ingredient.toLowerCase().includes(allergen.toLowerCase())
        );
        
        return (
          <View key={index} style={styles.ingredientRow}>
            <Icon 
              name="check" 
              size={16} 
              color={Colors.primary} 
              style={styles.icon} 
            />
            <Text style={styles.ingredient}>
              {ingredient}
              {isAllergen && (
                <Text style={styles.allergenText}> (Contém alérgeno)</Text>
              )}
            </Text>
          </View>
        );
      })}
      
      {allergens.length > 0 && (
        <View style={styles.allergensContainer}>
          <Text style={styles.allergensTitle}>Alérgenos:</Text>
          <Text style={styles.allergensText}>
            {allergens.join(', ')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  ingredient: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  allergenText: {
    color: Colors.error,
    fontWeight: '500',
  },
  allergensContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: Colors.divider,
    borderRadius: 6,
  },
  allergensTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  allergensText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default IngredientsList;