"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./TeacherCard.module.css";
import { Teacher } from "../../types/teacher";
import { useFavorites } from "../../providers/FavoritesProvider";
import { useAuth } from "../../hooks/useAuth";
import Icon from "../Icon/Icon";
import BookingModal from "../BookingModal/BookingModal";
import AuthModal from "../AuthModal/AuthModal";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(teacher.id);

  const handleFavorite = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    toggleFavorite(teacher.id);
  };

  return (
    <>
      <article className={styles.card}>
        <div className={styles.avatarWrapper}>
          <Image
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            width={96}
            height={96}
            className={styles.avatar}
          />

          <span className={styles.online} />
        </div>

        <div className={styles.content}>
          <div className={styles.top}>
            <p className={styles.category}>Languages</p>

            <div className={styles.statistics}>
              <div className={styles.statItem}>
                <Icon name="book-open" width={16} height={16} />

                <span>Lessons online</span>
              </div>

              <span className={styles.divider} />

              <span>Lessons done: {teacher.lessons_done}</span>

              <span className={styles.divider} />

              <div className={styles.statItem}>
                <Icon name="star" width={16} height={16} />

                <span>Rating: {teacher.rating}</span>
              </div>

              <span className={styles.divider} />

              <span>
                Price / 1 hour:{" "}
                <strong className={styles.price}>
                  {teacher.price_per_hour}$
                </strong>
              </span>

              <button
                type="button"
                className={`${styles.favoriteButton} ${
                  favorite ? styles.favoriteButtonActive : ""
                }`}
                onClick={handleFavorite}
                aria-label={
                  favorite
                    ? "Remove teacher from favorites"
                    : "Add teacher to favorites"
                }
              >
                <Icon name="like" width={26} height={26} />
              </button>
            </div>
          </div>

          <h2 className={styles.name}>
            {teacher.name} {teacher.surname}
          </h2>

          <div className={styles.information}>
            <p>
              <span className={styles.infoLabel}>Speaks: </span>

              <span className={styles.languages}>
                {teacher.languages.join(", ")}
              </span>
            </p>

            <p>
              <span className={styles.infoLabel}>Lesson Info: </span>

              <span>{teacher.lesson_info}</span>
            </p>

            <p>
              <span className={styles.infoLabel}>Conditions: </span>

              <span>{teacher.conditions.join(" ")}</span>
            </p>
          </div>

          {!isExpanded && (
            <button
              type="button"
              className={styles.readMore}
              onClick={() => setIsExpanded(true)}
            >
              Read more
            </button>
          )}

          {isExpanded && (
            <div className={styles.expanded}>
              <p className={styles.experience}>{teacher.experience}</p>

              <ul className={styles.reviews}>
                {teacher.reviews.map((review, index) => (
                  <li
                    key={`${review.reviewer_name}-${index}`}
                    className={styles.review}
                  >
                    <div className={styles.reviewer}>
                      <div className={styles.reviewerAvatar}>
                        {review.reviewer_name.charAt(0)}
                      </div>

                      <div>
                        <p className={styles.reviewerName}>
                          {review.reviewer_name}
                        </p>

                        <div className={styles.reviewRating}>
                          <Icon name="star" width={16} height={16} />

                          <span>{review.reviewer_rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <p className={styles.comment}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ul className={styles.levels}>
            {teacher.levels.map((level, index) => (
              <li
                key={level}
                className={`${styles.level} ${
                  index === 0 ? styles.activeLevel : ""
                }`}
              >
                #{level}
              </li>
            ))}
          </ul>

          {isExpanded && (
            <button
              type="button"
              className={styles.bookButton}
              onClick={() => setIsBookingModalOpen(true)}
            >
              Book trial lesson
            </button>
          )}
        </div>
      </article>

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
