import type { AuthUser } from "../types/domain";

const users: AuthUser[] = [
  {
    id: 1,
    name: "Maria lopez",
    email: "maria@test.com",
    password: "12345",
    level: "intermedio",
    age: 28,
    routine: {
      name: "Mi semana activa",
      entries: [],
    },
  },
];

export default users;
