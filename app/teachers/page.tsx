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
      <h1>Teachers</h1>

      {user ? (
        <div>
          <p>Logged in: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}

      <TeacherList />
    </main>
  );
}
