import type { ExperienceLevel } from "../data/experienceLevel";

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface Exercise {
  id: string;
  name: string;
  durationMinutes: number;
  caloriesPerMinute: number;
  distanceKm?: number;
}

export interface RoutineEntry {
  weekday: Weekday;
  exercise: Exercise;
}

export interface WeeklyRoutine {
  name: string;
  entries: RoutineEntry[];
}

export interface UserProfile {
  id: number;
  name: string;
  age: number;
  level: ExperienceLevel;
  routine: WeeklyRoutine;
}

export interface AuthUser extends UserProfile {
  email: string;
  password: string;
}
