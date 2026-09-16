"use client";

import { createContext, useContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (teacherId: string) => boolean;
  toggleFavorite: (teacherId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

interface FavoritesStateProps {
  children: React.ReactNode;
  userId: string;
}

function FavoritesState({ children, userId }: FavoritesStateProps) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem(`favorites_${userId}`);

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const toggleFavorite = (teacherId: string) => {
    setFavorites((currentFavorites) => {
      const updatedFavorites = currentFavorites.includes(teacherId)
        ? currentFavorites.filter((id) => id !== teacherId)
        : [...currentFavorites, teacherId];

      localStorage.setItem(
        `favorites_${userId}`,
        JSON.stringify(updatedFavorites),
      );

      return updatedFavorites;
    });
  };

  const isFavorite = (teacherId: string) => {
    return favorites.includes(teacherId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <FavoritesContext.Provider
        value={{
          favorites: [],
          isFavorite: () => false,
          toggleFavorite: () => {},
        }}
      >
        {children}
      </FavoritesContext.Provider>
    );
  }

  return (
    <FavoritesState key={user.uid} userId={user.uid}>
      {children}
    </FavoritesState>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
};
