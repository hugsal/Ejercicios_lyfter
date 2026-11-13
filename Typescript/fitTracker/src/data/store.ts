import initialActivities from "./activities.json";
import initialUsers from "./users";
import type { AuthUser, Exercise } from "../types/domain";

const users: AuthUser[] = [...initialUsers];
const currentExercises = new Map<number, Exercise[]>([
  [
    1,
    initialActivities["1"].map(
      (exercise: Exercise): Exercise => ({ ...exercise }),
    ),
  ],
]);
let currentUser: AuthUser | null = null;

export function getUsers(): AuthUser[] {
  return [...users];
}

export function registerUser(user: AuthUser): void {
  users.push(user);
}

export function authenticateUser(email: string, password: string): AuthUser | null {
  return (
    users.find(
      (user: AuthUser): boolean =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password,
    ) ?? null
  );
}

export function getCurrentUser(): AuthUser | null {
  return currentUser;
}

export function setCurrentUser(user: AuthUser | null): void {
  currentUser = user;
}

export function getExercisesForUser(userId: number): Exercise[] {
  return [...(currentExercises.get(userId) ?? [])];
}

export function addExerciseForUser(userId: number, exercise: Exercise): void {
  const exercises: Exercise[] = currentExercises.get(userId) ?? [];
  currentExercises.set(userId, [...exercises, exercise]);
}

export function updateUser(user: AuthUser): void {
  const userIndex: number = users.findIndex(
    (savedUser: AuthUser): boolean => savedUser.id === user.id,
  );

  if (userIndex === -1) {
    throw new Error(`No se encontró el perfil con ID ${user.id}.`);
  }

  users[userIndex] = user;
  if (currentUser?.id === user.id) currentUser = user;
}
