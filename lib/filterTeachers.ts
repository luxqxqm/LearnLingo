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

    const price = teacher.price_per_hour;
    const maxPrice = Number(filters.price);

    const matchesPrice =
      !filters.price ||
      (maxPrice === 10 && price <= 10) ||
      (maxPrice === 20 && price > 10 && price <= 20) ||
      (maxPrice === 30 && price > 20 && price <= 30) ||
      (maxPrice === 40 && price > 30 && price <= 40);

    return matchesLanguage && matchesLevel && matchesPrice;
  });
};