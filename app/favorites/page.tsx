"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import { Teacher } from "../../types/teacher";
import { useAuth } from "../../hooks/useAuth";
import { getTeachers } from "../../lib/teachers";
import { useFavorites } from "../../providers/FavoritesProvider";
import Loader from "../../components/Loader/Loader";
import Icon from "../../components/Icon/Icon";
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
          <Loader text="Loading..." />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <div className={styles.icon}>
              <Icon name="like" width={32} height={32} />
            </div>

            <h1 className={styles.emptyTitle}>Log in to see your favorites</h1>

            <p className={styles.emptyText}>
              Save your favorite teachers and easily find them whenever you need
              them.
            </p>

            <Link href="/teachers" className={styles.emptyButton}>
              Find a teacher
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (teachers === null) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <Loader text="Loading favorites..." />
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {teachers.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.icon}>
              <Icon name="like" width={32} height={32} />
            </div>

            <h1 className={styles.emptyTitle}>No favorite teachers yet</h1>

            <p className={styles.emptyText}>
              You haven`t added any teachers to your favorites yet. Find a
              teacher and save them here.
            </p>

            <Link href="/teachers" className={styles.emptyButton}>
              Find a teacher
            </Link>
          </div>
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
