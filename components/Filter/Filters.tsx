"use client";

import { FiltersValues } from "../../types/filters";
import { Teacher } from "../../types/teacher";

interface FiltersProps {
  teachers: Teacher[];
  values: FiltersValues;
  onChange: (values: FiltersValues) => void;
}

export default function Filters({ teachers, values, onChange }: FiltersProps) {
  const languages = Array.from(
    new Set(teachers.flatMap((teacher) => teacher.languages)),
  );

  const levels = Array.from(
    new Set(teachers.flatMap((teacher) => teacher.levels)),
  );

  const prices = Array.from(
    new Set(teachers.map((teacher) => teacher.price_per_hour)),
  ).sort((a, b) => a - b);

  const handleChange = (field: keyof FiltersValues, value: string) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  return (
    <div>
      <select
        value={values.language}
        onChange={(event) => handleChange("language", event.target.value)}
      >
        <option value="">All languages</option>

        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>

      <select
        value={values.level}
        onChange={(event) => handleChange("level", event.target.value)}
      >
        <option value="">All levels</option>

        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <select
        value={values.price}
        onChange={(event) => handleChange("price", event.target.value)}
      >
        <option value="">All prices</option>

        {prices.map((price) => (
          <option key={price} value={price}>
            ${price}
          </option>
        ))}
      </select>
    </div>
  );
}
