"use client";

import Image from "next/image";
import { useState } from "react";
import { useFavorites } from "../../providers/FavoritesProvider";
import { useAuth } from "../../hooks/useAuth";
import { Teacher } from "../../types/teacher";
import AuthModal from "../AuthModal/AuthModal";
import BookingModal from "../BookingModal/BookingModal";
interface TeacherCardProps {
  teacher: Teacher;
}
export default function TeacherCard({ teacher }: TeacherCardProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const favorite = isFavorite(teacher.id);

  const handleFavorite = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    toggleFavorite(teacher.id);
  };

  const handleReadMore = () => {
    setIsExpanded((current) => !current);
  };

  return (
    <>
      <article>
        <Image
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width={96}
          height={96}
        />

        <h2>
          {teacher.name} {teacher.surname}
        </h2>

        <p>⭐ {teacher.rating}</p>

        <p>{teacher.reviews.length} reviews</p>

        <p>{teacher.price_per_hour}$ / hour</p>

        <p>{teacher.languages.join(", ")}</p>

        <p>{teacher.levels.join(", ")}</p>

        <p>Lessons done: {teacher.lessons_done}</p>

        <button type="button" onClick={handleFavorite}>
          {favorite ? "❤️" : "♡"}
        </button>

        <button type="button" onClick={handleReadMore}>
          {isExpanded ? "Read less" : "Read more"}
        </button>

        {isExpanded && (
          <div>
            <p>{teacher.lesson_info}</p>

            <p>{teacher.experience}</p>

            <h3>Conditions</h3>

            <ul>
              {teacher.conditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>

            <h3>Reviews</h3>

            {teacher.reviews.map((review) => (
              <div key={`${review.reviewer_name}-${review.comment}`}>
                <p>
                  {review.reviewer_name} — ⭐ {review.reviewer_rating}
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </article>
      <button type="button" onClick={() => setIsBookingModalOpen(true)}>
        Book trial lesson
      </button>
      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
      {isBookingModalOpen && (
        <BookingModal
          teacher={teacher}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </>
  );
}
    