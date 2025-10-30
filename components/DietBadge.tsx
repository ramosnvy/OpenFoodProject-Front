// components/DietBadge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/colors';

type BadgeType = 'vegetarian' | 'vegan' | 'glutenFree' | 'lactoseFree';

interface DietBadgeProps {
  type: BadgeType;
  active: boolean;
}

const DietBadge: React.FC<DietBadgeProps> = ({ type, active }) => {
  const getBadgeInfo = () => {
    switch (type) {
      case 'vegetarian':
        return {
          label: 'Vegetariano',
          icon: 'leaf',
          color: active ? Colors.success : Colors.textLight,
        };
      case 'vegan':
        return {
          label: 'Vegano',
          icon: 'award',
          color: active ? Colors.success : Colors.textLight,
        };
      case 'glutenFree':
        return {
          label: 'Sem Glúten',
          icon: 'alert-circle',
          color: active ? Colors.success : Colors.textLight,
        };
      case 'lactoseFree':
        return {
          label: 'Sem Lactose',
          icon: 'droplet',
          color: active ? Colors.success : Colors.textLight,
        };
      default:
        return {
          label: '',
          icon: 'info',
          color: Colors.textLight,
        };
    }
  };

  const { label, icon, color } = getBadgeInfo();

  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Icon name={icon} size={14} color={color} style={styles.icon} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DietBadge;