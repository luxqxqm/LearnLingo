"use client";

import { useEffect, useState } from "react";
import { Teacher } from "../types/teacher";
import { FiltersValues } from "../types/filters";
import { getTeachers } from "../lib/teachers";
import { filterTeachers } from "../lib/filterTeachers";


interface UseTeachersResult {
  teachers: Teacher[];
  allTeachers: Teacher[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

const TEACHERS_PER_PAGE = 4;

export const useTeachers = (
  filters: FiltersValues,
): UseTeachersResult => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const hasFilters =
    Boolean(filters.language) ||
    Boolean(filters.level) ||
    Boolean(filters.price);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      setError(null);

      try {
        if (hasFilters) {
          const data = await getTeachers(100);

          const filteredTeachers = filterTeachers(data, filters);

          setAllTeachers(data);
          setTeachers(filteredTeachers.slice(0, TEACHERS_PER_PAGE));
          setHasMore(filteredTeachers.length > TEACHERS_PER_PAGE);

          return;
        }

      const data = await getTeachers(100);

          setAllTeachers(data);
          setTeachers(data.slice(0, TEACHERS_PER_PAGE));
          setHasMore(data.length > TEACHERS_PER_PAGE);
      } catch {
        setError("Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [filters, hasFilters]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);

    try {
      if (hasFilters) {
        const filteredTeachers = filterTeachers(
          allTeachers,
          filters,
        );

        setTeachers((currentTeachers) => [
          ...currentTeachers,
          ...filteredTeachers.slice(
            currentTeachers.length,
            currentTeachers.length + TEACHERS_PER_PAGE,
          ),
        ]);

        setHasMore(
          teachers.length + TEACHERS_PER_PAGE <
            filteredTeachers.length,
        );

        return;
      }

      const lastTeacher = teachers[teachers.length - 1];

      const data = await getTeachers(
        TEACHERS_PER_PAGE,
        lastTeacher.id,
      );

      setTeachers((currentTeachers) => [
        ...currentTeachers,
        ...data,
      ]);

      setHasMore(data.length === TEACHERS_PER_PAGE);
    } catch {
      setError("Failed to load more teachers");
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    teachers,
    allTeachers,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
};