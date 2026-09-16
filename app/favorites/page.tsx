"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "../../providers/FavoritesProvider";
import { useAuth } from "../../hooks/useAuth";
import { Teacher } from "../../types/teacher";
import { getTeachers } from "../../lib/teachers";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const { favorites } = useFavorites();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchTeachers = async () => {
      try {
        const data = await getTeachers(100);

        const favoriteTeachers = data.filter((teacher) =>
          favorites.includes(teacher.id),
        );

        setTeachers(favoriteTeachers);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [user, favorites]);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view your favorite teachers.</p>;
  }

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  return (
    <main>
      <h1>Favorites</h1>

      {teachers.length === 0 ? (
        <p>You have no favorite teachers yet.</p>
      ) : (
        teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))
      )}
    </main>
  );
}
