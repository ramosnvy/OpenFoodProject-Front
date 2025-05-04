// models/Product.ts

export interface NutritionalInfo {
    calories: number;
    proteins: number; // em gramas
    carbs: number; // em gramas
    fats: number; // em gramas
    sodium: number; // em miligramas
  }
  
  export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    ean: string;
    description: string;
    price: number;
    imageUrl: string;
    restaurantName: string;
    category: string;
    rating: number;
    reviewCount: number;
    ingredients: string[];
    allergens: string[];
    nutritionalInfo: NutritionalInfo;
    reviews: Review[];
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    isLactoseFree: boolean;
  }
  
  // Mock de um produto para teste
  export const mockProduct: Product = {
    id: 'p1',
    name: 'X-Bacon',
    ean: "00000000",
    description: 'Hambúrguer congelado.',
    price: 26.90,
    imageUrl: 'https://via.placeholder.com/400x300',
    restaurantName: 'Sadia',
    category: 'Hambúrgueres',
    rating: 4.8,
    reviewCount: 254,
    ingredients: [
      'Pão brioche', 
      'Hambúrguer bovino 180g', 
      'Queijo cheddar', 
      'Bacon', 
      'Alface', 
      'Tomate', 
      'Cebola caramelizada', 
      'Ovo', 
      'Molho especial'
    ],
    allergens: ['Glúten', 'Lactose', 'Ovo', 'Soja'],
    nutritionalInfo: {
      calories: 750,
      proteins: 35,
      carbs: 46,
      fats: 48,
      sodium: 980
    },
    reviews: [
      {
        id: 'r1',
        userName: 'João Silva',
        rating: 5,
        comment: '....',
        date: '2025-04-01'
      },
      {
        id: 'r2',
        userName: 'Maria Oliveira',
        rating: 4,
        comment: 'Muito bom, mas um pouco gorduroso para o meu gosto.',
        date: '2025-03-28'
      }
    ],
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isLactoseFree: false
  };