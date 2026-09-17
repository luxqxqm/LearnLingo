"use client";

import { useEffect, useRef, useState } from "react";

import { FiltersValues } from "../../types/filters";
import { Teacher } from "../../types/teacher";

import styles from "./Filters.module.css";

interface FiltersProps {
  teachers: Teacher[];
  values: FiltersValues;
  onChange: (values: FiltersValues) => void;
}

type FilterKey = keyof FiltersValues;

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  className: string;
  onChange: (value: string) => void;
}

const priceOptions = ["10", "20", "30", "40"];

function Dropdown({
  label,
  value,
  options,
  placeholder,
  className,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`${styles.field} ${className}`}>
      <span className={styles.label}>{label}</span>

      <div className={styles.dropdown}>
        <button
          type="button"
          className={`${styles.select} ${isOpen ? styles.selectOpen : ""}`}
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
        >
          <span>{value || placeholder}</span>

          <span
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
          />
        </button>

        {isOpen && (
          <div className={styles.menu}>
            <button
              type="button"
              className={`${styles.option} ${
                !value ? styles.optionActive : ""
              }`}
              onClick={() => handleSelect("")}
            >
              {placeholder}
            </button>

            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.option} ${
                  value === option ? styles.optionActive : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option} $
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Filters({ teachers, values, onChange }: FiltersProps) {
  const languages = Array.from(
    new Set(teachers.flatMap((teacher) => teacher.languages)),
  ).sort();

  const levels = Array.from(
    new Set(teachers.flatMap((teacher) => teacher.levels)),
  );

  const handleChange = (field: FilterKey, value: string) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  return (
    <div className={styles.filters}>
      <Dropdown
        label="Languages"
        value={values.language}
        options={languages}
        placeholder="All languages"
        className={styles.languageField}
        onChange={(value) => handleChange("language", value)}
      />

      <Dropdown
        label="Level of knowledge"
        value={values.level}
        options={levels}
        placeholder="All levels"
        className={styles.levelField}
        onChange={(value) => handleChange("level", value)}
      />

      <Dropdown
        label="Price"
        value={values.price ? `${values.price} $` : ""}
        options={priceOptions}
        placeholder="All"
        className={styles.priceField}
        onChange={(value) => handleChange("price", value)}
      />
    </div>
  );
}
