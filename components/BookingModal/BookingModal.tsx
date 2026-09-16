"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { bookingSchema } from "../../schemas/bookingSchema";
import { Teacher } from "../../types/teacher";
import { BookingFormValues } from "../../types/booking";

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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
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

  const onSubmit = async (data: BookingFormValues) => {
    console.log(data);

    reset();
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleBackdropClick}>
      <div>
        <button type="button" onClick={onClose}>
          ×
        </button>

        <h2>Book trial lesson</h2>

        <p>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div>
          <Image
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            width={40}
            height={40}
          />

          <div>
            <span>Your teacher</span>
            <p>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <h3>What is your main reason for learning English?</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Reason</legend>

            {reasons.map((reason) => (
              <label key={reason}>
                <input type="radio" value={reason} {...register("reason")} />
                {reason}
              </label>
            ))}
          </fieldset>

          {errors.reason && <p>{errors.reason.message}</p>}

          <label>
            <input type="text" placeholder="Full Name" {...register("name")} />
          </label>

          {errors.name && <p>{errors.name.message}</p>}

          <label>
            <input type="email" placeholder="Email" {...register("email")} />
          </label>

          {errors.email && <p>{errors.email.message}</p>}

          <label>
            <input
              type="tel"
              placeholder="Phone number"
              {...register("phone")}
            />
          </label>

          {errors.phone && <p>{errors.phone.message}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
