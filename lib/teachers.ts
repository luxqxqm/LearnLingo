import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";

import { database } from "./firebase";
import { Teacher } from "../types/teacher";


export const getTeachers = async (
  limit: number,
  startAfterId?: string,
): Promise<Teacher[]> => {
  const teachersRef = ref(database, "teachers");

  const teachersQuery = startAfterId
    ? query(
        teachersRef,
        orderByKey(),
        startAfter(startAfterId),
        limitToFirst(limit),
      )
    : query(teachersRef, orderByKey(), limitToFirst(limit));

  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...(teacher as Omit<Teacher, "id">),
  }));
};