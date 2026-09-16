"use client";

import Image from "next/image";
import { useEffect, type MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import Icon from "../Icon/Icon";

import type { BookingFormValues } from "../../types/booking";

import type { Teacher } from "../../types/teacher";

import { bookingSchema } from "../../schemas/bookingSchema";

import styles from "./BookingModal.module.css";

interface BookingModalProps {
  teacher: Teacher;
  onClose: () => void;
}

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

export default function BookingModal({ teacher, onClose }: BookingModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      reason: reasons[0],
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const onSubmit = () => {
    toast.success("Your trial lesson has been booked successfully!");

    onClose();
  };

  return (
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close booking modal"
        >
          <Icon name="close-icon" width={24} height={24} />
        </button>

        <h2 className={styles.title}>Book trial lesson</h2>

        <p className={styles.description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={styles.teacher}>
          <Image
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            width={44}
            height={44}
            className={styles.teacherAvatar}
          />

          <div>
            <p className={styles.teacherLabel}>Your teacher</p>

            <p className={styles.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.reasonFieldset}>
            <legend className={styles.reasonTitle}>
              What is your main reason for learning English?
            </legend>

            <div className={styles.reasons}>
              {reasons.map((reason) => (
                <label key={reason} className={styles.reason}>
                  <input type="radio" value={reason} {...register("reason")} />

                  <span className={styles.radio} />

                  <span>{reason}</span>
                </label>
              ))}
            </div>

            {errors.reason && (
              <p className={styles.error}>{errors.reason.message}</p>
            )}
          </fieldset>

          <div className={styles.fields}>
            <label className={styles.field}>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
              />

              {errors.name && (
                <span className={styles.error}>{errors.name.message}</span>
              )}
            </label>

            <label className={styles.field}>
              <input type="email" placeholder="Email" {...register("email")} />

              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </label>

            <label className={styles.field}>
              <input
                type="tel"
                placeholder="Phone number"
                {...register("phone")}
              />

              {errors.phone && (
                <span className={styles.error}>{errors.phone.message}</span>
              )}
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Book
          </button>
        </form>
      </div>
    </div>
  );
}
