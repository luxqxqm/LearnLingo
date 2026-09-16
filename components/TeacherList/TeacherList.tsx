"use client";

import { useState } from "react";

import styles from "./TeacherList.module.css";
import { FiltersValues } from "../../types/filters";
import { useTeachers } from "../../hooks/useTeachers";
import Loader from "../Loader/Loader";
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
    return <Loader text="Loading teachers..." />;
  }

  if (error && teachers.length === 0) {
    return <p>{error}</p>;
  }

  const filterTeachersData = allTeachers.length > 0 ? allTeachers : teachers;

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Teachers</h1>

        <Filters
          teachers={filterTeachersData}
          values={filters}
          onChange={setFilters}
        />

        {teachers.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.icon}>
              <span>⌕</span>
            </div>

            <h2 className={styles.emptyTitle}>No teachers found</h2>

            <p className={styles.emptyText}>
              We couldn`t find any teachers matching your selected filters. Try
              changing your search criteria.
            </p>

            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearFilters}
            >
              Clear filters
            </button>
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

        {hasMore && teachers.length > 0 && (
          <div className={styles.loadMoreWrapper}>
            <button
              type="button"
              className={styles.loadMore}
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <span className={styles.buttonLoader}>
                  <span className={styles.buttonSpinner} />
                  Loading...
                </span>
              ) : (
                "Load more"
              )}
            </button>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </main>
  );
}
