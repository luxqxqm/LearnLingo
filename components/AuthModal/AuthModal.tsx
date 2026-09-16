"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { loginSchema, registerSchema } from "../../schemas/authSchema";
import { useAuth } from "../../hooks/useAuth";
import type { LoginFormValues, RegisterFormValues } from "../../types/auth";

interface AuthModalProps {
  onClose: () => void;
  initialMode?: "login" | "register";
}

export default function AuthModal({
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const { login, register } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(
    initialMode === "register",
  );
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues | RegisterFormValues>({
    resolver: yupResolver(isRegisterMode ? registerSchema : loginSchema),
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

  const onSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    setFirebaseError("");

    try {
      if (isRegisterMode && "name" in data) {
        await register(data.name, data.email, data.password);
      } else {
        await login(data.email, data.password);
      }

      reset();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setFirebaseError(error.message);
      } else {
        setFirebaseError("Something went wrong");
      }
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const toggleMode = () => {
    setFirebaseError("");
    reset();
    setIsRegisterMode((currentMode) => !currentMode);
  };

  return (
    <div onClick={handleBackdropClick}>
      <div>
        <button type="button" onClick={onClose}>
          ×
        </button>

        <h2>{isRegisterMode ? "Registration" : "Log In"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {isRegisterMode && (
            <>
              <label>
                Name
                <input type="text" {...registerField("name" as const)} />
              </label>

              {"name" in errors && errors.name && <p>{errors.name.message}</p>}
            </>
          )}

          <label>
            Email
            <input type="email" {...registerField("email")} />
          </label>

          {errors.email && <p>{errors.email.message}</p>}

          <label>
            Password
            <input type="password" {...registerField("password")} />
          </label>

          {errors.password && <p>{errors.password.message}</p>}

          {firebaseError && <p>{firebaseError}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Loading..."
              : isRegisterMode
                ? "Sign Up"
                : "Log In"}
          </button>
        </form>

        <button type="button" onClick={toggleMode}>
          {isRegisterMode
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
