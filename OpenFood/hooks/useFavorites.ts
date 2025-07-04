// hooks/useFavorites.ts
import { useState, useEffect } from 'react';

export interface Product {
  _id: string;
  name: string;
  ean: string;
  description: string;
  imageUrl: string;
  restaurantName: string;
  category: string;
  ingredients: Array<{
    ingredient: string;
    percent: number;
  }>;
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
    sodium: number;
  };
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isLactoseFree: boolean;
}

export interface Favorite {
  _id: string;
  user: string;
  product: Product;
  createdAt: string;
}

export interface FavoriteItem {
  id: string;
  name: string;
  ean: string;
  imageUrl: string;
}

const useFavorites = (userToken: string) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    if (!userToken) {
      setError('Token de usuário não fornecido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
    console.log(userToken);
      const response =  await fetch(`http://192.168.70.97:3000/api/favorites/${userToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }});

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data: Favorite[] = await response.json();
      
      // Mapear os dados para o formato esperado pelo componente
      const mappedFavorites: FavoriteItem[] = data.map(favorite => ({
        id: favorite.product._id,
        name: favorite.product.name,
        ean: favorite.product.ean,
        imageUrl:favorite.product.imageUrl
      }));

      setFavorites(mappedFavorites);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar favoritos');
      console.error('Erro ao buscar favoritos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userToken]);

  return {
    favorites,
    loading,
    error,
    refetch: fetchFavorites
  };
};

export default useFavorites;