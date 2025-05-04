// components/NutritionalInfoCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { NutritionalInfo } from '../models/Product';

interface NutritionalInfoCardProps {
  nutritionalInfo: NutritionalInfo;
}

const NutritionalInfoCard: React.FC<NutritionalInfoCardProps> = ({ nutritionalInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações Nutricionais</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Calorias</Text>
        <Text style={styles.infoValue}>{nutritionalInfo.calories} kcal</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Proteínas</Text>
        <Text style={styles.infoValue}>{nutritionalInfo.proteins}g</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Carboidratos</Text>
        <Text style={styles.infoValue}>{nutritionalInfo.carbs}g</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Gorduras</Text>
        <Text style={styles.infoValue}>{nutritionalInfo.fats}g</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Sódio</Text>
        <Text style={styles.infoValue}>{nutritionalInfo.sodium}mg</Text>
      </View>
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
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
});

export default NutritionalInfoCard;