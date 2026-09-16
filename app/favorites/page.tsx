"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";
import { useAuth } from "../../hooks/useAuth";
import { Teacher } from "../../types/teacher";
import { useFavorites } from "../../providers/FavoritesProvider";
import { getTeachers } from "../../lib/teachers";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const { favorites } = useFavorites();

  const [teachers, setTeachers] = useState<Teacher[] | null>(null);

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
      } catch {
        setTeachers([]);
      }
    };

    fetchTeachers();
  }, [user, favorites]);

  if (authLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.message}>Loading...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.message}>
            Please log in to view your favorite teachers.
          </p>
        </div>
      </main>
    );
  }

  if (teachers === null) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.message}>Loading favorites...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {teachers.length === 0 ? (
          <p className={styles.message}>You have no favorite teachers yet.</p>
        ) : (
          <ul className={styles.list}>
            {teachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
