"use client";

import TeacherList from "../../components/TeacherList/TeacherList";
import { useAuth } from "../../hooks/useAuth";
export default function TeachersPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <TeacherList />
    </main>
  );
}
