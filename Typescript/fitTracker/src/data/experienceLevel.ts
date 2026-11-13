export const experienceLevels = [
  "principiante",
  "intermedio",
  "avanzado",
] as const;

export type ExperienceLevel = (typeof experienceLevels)[number];
