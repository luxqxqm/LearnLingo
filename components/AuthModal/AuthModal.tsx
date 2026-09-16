"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import styles from "./AuthModal.module.css";
import { useAuth } from "../../hooks/useAuth";
import { LoginFormValues, RegisterFormValues } from "../../types/auth";
import { loginSchema, registerSchema } from "../../schemas/authSchema";
import Icon from "../Icon/Icon";

interface AuthModalProps {
  onClose: () => void;
  initialMode?: "login" | "register";
}

export default function AuthModal({
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const { login, register: registerUser } = useAuth();

  const isLogin = initialMode === "login";

  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
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

  const handleLogin = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);

      toast.success("You have successfully logged in!");

      onClose();
    } catch {
      toast.error("Invalid email or password");
    }
  };

  const handleRegistration = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.name, data.email, data.password);

      toast.success("Your account has been successfully created!");

      onClose();
    } catch {
      toast.error("Failed to create account");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  return (
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close authentication modal"
        >
          <span className={styles.closeIcon} />
        </button>

        <h2 className={styles.title}>{isLogin ? "Log In" : "Registration"}</h2>

        <p className={styles.description}>
          {isLogin
            ? "Welcome back! Please enter your credentials to access your account and continue your search for an ideal teacher."
            : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information"}
        </p>

        {isLogin ? (
          <form
            className={styles.form}
            onSubmit={loginForm.handleSubmit(handleLogin)}
          >
            <label className={styles.field}>
              <input
                type="email"
                placeholder="Email"
                {...loginForm.register("email")}
              />

              {loginForm.formState.errors.email && (
                <span className={styles.error}>
                  {loginForm.formState.errors.email.message}
                </span>
              )}
            </label>

            <label className={styles.field}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...loginForm.register("password")}
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon name="eye-off" width={20} height={20} />
                </button>
              </div>

              {loginForm.formState.errors.password && (
                <span className={styles.error}>
                  {loginForm.formState.errors.password.message}
                </span>
              )}
            </label>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loginForm.formState.isSubmitting}
            >
              {loginForm.formState.isSubmitting ? "Please wait..." : "Log In"}
            </button>
          </form>
        ) : (
          <form
            className={styles.form}
            onSubmit={registerForm.handleSubmit(handleRegistration)}
          >
            <label className={styles.field}>
              <input
                type="text"
                placeholder="Name"
                {...registerForm.register("name")}
              />

              {registerForm.formState.errors.name && (
                <span className={styles.error}>
                  {registerForm.formState.errors.name.message}
                </span>
              )}
            </label>

            <label className={styles.field}>
              <input
                type="email"
                placeholder="Email"
                {...registerForm.register("email")}
              />

              {registerForm.formState.errors.email && (
                <span className={styles.error}>
                  {registerForm.formState.errors.email.message}
                </span>
              )}
            </label>

            <label className={styles.field}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...registerForm.register("password")}
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon name="eye-off" width={20} height={20} />
                </button>
              </div>

              {registerForm.formState.errors.password && (
                <span className={styles.error}>
                  {registerForm.formState.errors.password.message}
                </span>
              )}
            </label>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={registerForm.formState.isSubmitting}
            >
              {registerForm.formState.isSubmitting
                ? "Please wait..."
                : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
