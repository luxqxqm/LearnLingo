"use client";

import { useState } from "react";

import styles from "./TeacherList.module.css";
import { FiltersValues } from "../../types/filters";
import { useTeachers } from "../../hooks/useTeachers";
import Filters from "../Filter/Filters";
import TeacherCard from "../TeacherCard/TeacherCard";

const initialFilters: FiltersValues = {
  language: "",
  level: "",
  price: "",
};

export default function TeacherList() {
  const [filters, setFilters] = useState<FiltersValues>(initialFilters);

  const {
    teachers,
    allTeachers,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useTeachers(filters);

  if (loading) {
    return <p>Loading teachers...</p>;
  }

  if (error && teachers.length === 0) {
    return <p>{error}</p>;
  }

  const filterTeachersData = allTeachers.length > 0 ? allTeachers : teachers;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Filters
          teachers={filterTeachersData}
          values={filters}
          onChange={setFilters}
        />

        {teachers.length === 0 ? (
          <p className={styles.empty}>No teachers found</p>
        ) : (
          <ul className={styles.list}>
            {teachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>
        )}

        {hasMore && (
          <div className={styles.loadMoreWrapper}>
            <button
              type="button"
              className={styles.loadMore}
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </main>
  );
}
