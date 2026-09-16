"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import Icon from "../Icon/Icon";
import AuthModal from "../AuthModal/AuthModal";

export default function Header() {
  const { user, loading, logout } = useAuth();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openLoginModal = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <Link href="/" className={styles.logo}>
            <Icon name="logo" className={styles.logoIcon} />

            <span>LearnLingo</span>
          </Link>

          <nav className={styles.navigation}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>

            <Link href="/teachers" className={styles.navLink}>
              Teachers
            </Link>

            {user && (
              <Link href="/favorites" className={styles.navLink}>
                Favorites
              </Link>
            )}
          </nav>

          {!loading && (
            <div className={styles.auth}>
              {user ? (
                <>
                  <span className={styles.userName}>
                    {user.displayName || user.email}
                  </span>

                  <button
                    type="button"
                    className={styles.logoutButton}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={styles.loginButton}
                    onClick={openLoginModal}
                  >
                    <Icon name="log-in" className={styles.loginIcon} />

                    <span>Log in</span>
                  </button>

                  <button
                    type="button"
                    className={styles.registrationButton}
                    onClick={openRegisterModal}
                  >
                    Registration
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {isAuthModalOpen && (
        <AuthModal onClose={closeAuthModal} initialMode={authMode} />
      )}
    </>
  );
}
