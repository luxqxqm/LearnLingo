import { FiltersValues } from "../types/filters";
import { Teacher } from "../types/teacher";

export const filterTeachers = (
  teachers: Teacher[],
  filters: FiltersValues,
): Teacher[] => {
  return teachers.filter((teacher) => {
    const matchesLanguage =
      !filters.language ||
      teacher.languages.includes(filters.language);

    const matchesLevel =
      !filters.level ||
      teacher.levels.includes(filters.level);

    const matchesPrice =
      !filters.price ||
      teacher.price_per_hour === Number(filters.price);

    return matchesLanguage && matchesLevel && matchesPrice;
  });
};