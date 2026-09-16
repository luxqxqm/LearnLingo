"use client";

import { useState } from "react";
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
    <section>
      <Filters
        teachers={filterTeachersData}
        values={filters}
        onChange={setFilters}
      />

      {teachers.length === 0 ? (
        <p>No teachers found</p>
      ) : (
        teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))
      )}

      {hasMore && (
        <button type="button" onClick={loadMore} disabled={loadingMore}>
          {loadingMore ? "Loading..." : "Load more"}
        </button>
      )}

      {error && <p>{error}</p>}
    </section>
  );
}
