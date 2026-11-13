import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import type { FormikErrors, FormikHelpers, FormikProps } from "formik";
import type { KeyboardEvent, MouseEvent } from "react";
import type { SetView } from "../App";
import {
  addExerciseForUser,
  getCurrentUser,
  getExercisesForUser,
  setCurrentUser,
  updateUser,
} from "../data/store";
import type {
  AuthUser,
  Exercise,
  RoutineEntry,
  Weekday,
} from "../types/domain";

const weekdayNames: Record<Weekday, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

const weekdays = Object.keys(weekdayNames) as Weekday[];

interface RoutineValues {
  routineName: string;
  weekday: string;
  routineExercise: string;
}

interface ExerciseValues {
  exerciseName: string;
  duration: string;
  caloriesPerMinute: string;
  distance: string;
}

function avatarName(name: string): string {
  return name
    .split(" ")
    .map((part: string): string => part[0])
    .join("")
    .toUpperCase();
}

interface DashboardProps {
  setView: SetView;
}

function Dashboard({ setView }: DashboardProps) {
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [exercises, setExercises] = useState<Exercise[]>(() =>
    user ? getExercisesForUser(user.id) : [],
  );
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  useEffect((): void => {
    if (!user) setView("login");
  }, [setView, user]);

  useEffect((): (() => void) | void => {
    if (!isExerciseModalOpen) return;

    function closeOnEscape(event: globalThis.KeyboardEvent): void {
      if (event.key === "Escape") setIsExerciseModalOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isExerciseModalOpen]);

  if (!user) return null;
  const activeUser: AuthUser = user;

  const totalCalories = exercises.reduce(
    (total: number, exercise: Exercise): number =>
      total + exercise.durationMinutes * exercise.caloriesPerMinute,
    0,
  );
  const longestExercise = exercises.reduce<Exercise | null>(
    (longest: Exercise | null, exercise: Exercise): Exercise =>
      !longest || exercise.durationMinutes > longest.durationMinutes
        ? exercise
        : longest,
    null,
  );
  const mostCaloriesExercise = exercises.reduce<Exercise | null>(
    (highest: Exercise | null, exercise: Exercise): Exercise =>
      !highest ||
      exercise.durationMinutes * exercise.caloriesPerMinute >
        highest.durationMinutes * highest.caloriesPerMinute
        ? exercise
        : highest,
    null,
  );

  function handleExerciseSubmit(values: ExerciseValues): void {
    const distanceValue = values.distance.trim();
    const distanceKm = distanceValue === "" ? undefined : Number(distanceValue);
    const exercise: Exercise = {
      id: crypto.randomUUID(),
      name: values.exerciseName.trim(),
      durationMinutes: Number(values.duration),
      caloriesPerMinute: Number(values.caloriesPerMinute),
      ...(distanceKm === undefined ? {} : { distanceKm }),
    };
    addExerciseForUser(activeUser.id, exercise);
    setExercises((currentExercises: Exercise[]): Exercise[] => [
      ...currentExercises,
      exercise,
    ]);
    setIsExerciseModalOpen(false);
  }

  function handleRoutineSubmit(
    values: RoutineValues,
    actions: FormikHelpers<RoutineValues>,
  ): void {
    const routineName = values.routineName.trim();
    const weekday = weekdays.find(
      (day: Weekday): boolean => day === values.weekday,
    );
    const exercise = exercises.find(
      (item: Exercise): boolean => item.id === values.routineExercise,
    );

    if (!weekday || !exercise) {
      actions.setStatus(
        "Completa el nombre, el día y el ejercicio de la rutina.",
      );
      return;
    }

    const updatedUser: AuthUser = {
      ...activeUser,
      routine: {
        name: routineName,
        entries: [...activeUser.routine.entries, { weekday, exercise }],
      },
    };
    updateUser(updatedUser);
    setUser(updatedUser);
    actions.resetForm({
      values: {
        routineName,
        weekday: "",
        routineExercise: "",
      },
    });
  }

  function handleLogout(): void {
    setCurrentUser(null);
    setUser(null);
    setView("login");
  }

  function handleBackdropKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Escape") setIsExerciseModalOpen(false);
  }

  return (
    <main className="dashboard">
      <header className="page-header">
        <div>
          <p className="eyebrow">FITTRACKER</p>
          <h1>Tu actividad</h1>
          <p className="page-subtitle">
            Un resumen de tu progreso y tus entrenamientos.
          </p>
        </div>
        <div className="header-actions">
          <span className="date-label">RESUMEN DE HOY</span>
          <button
            className="primary-button"
            type="button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="panel profile-panel" aria-labelledby="profile-title">
        <div className="profile-identity">
          <div className="avatar" aria-hidden="true">
            {avatarName(activeUser.name)}
          </div>
          <div>
            <p className="eyebrow">PERFIL DE USUARIO</p>
            <h2 id="profile-title">{activeUser.name}</h2>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-detail">
            <span>Edad</span>
            <strong>{activeUser.age} años</strong>
          </div>
          <div className="profile-detail">
            <span>Nivel</span>
            <strong className="level-badge">{activeUser.level}</strong>
          </div>
        </div>
      </section>

      <section
        className="panel workouts-panel"
        aria-labelledby="workouts-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">TU PROGRESO</p>
            <h2 id="workouts-title">Ejercicios registrados</h2>
          </div>
          <div className="section-actions">
            <span className="exercise-count">
              {exercises.length}{" "}
              {exercises.length === 1 ? "actividad" : "actividades"}
            </span>
            <button
              type="button"
              className="primary-button compact-button"
              onClick={(): void => {
                setIsExerciseModalOpen(true);
              }}
            >
              + Nueva actividad
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Ejercicio</th>
                <th scope="col">Duración</th>
                <th scope="col">Cal / min</th>
                <th scope="col">Distancia</th>
                <th scope="col" className="calories-heading">
                  Calorías
                </th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise: Exercise) => (
                <tr key={exercise.id}>
                  <th scope="row">
                    <span className="activity-dot" aria-hidden="true" />
                    {exercise.name}
                  </th>
                  <td>{exercise.durationMinutes} min</td>
                  <td>{exercise.caloriesPerMinute}</td>
                  <td>
                    {exercise.distanceKm === undefined ? (
                      <span className="muted">—</span>
                    ) : (
                      `${exercise.distanceKm} km`
                    )}
                  </td>
                  <td className="calories">
                    {(
                      exercise.durationMinutes * exercise.caloriesPerMinute
                    ).toLocaleString()}{" "}
                    <span>cal</span>
                  </td>
                </tr>
              ))}
              {exercises.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-table">
                    Aún no tienes ejercicios registrados. Agrega tu primera
                    actividad.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colSpan={4}>
                  Total de calorías
                </th>
                <td className="total-calories">
                  {totalCalories.toLocaleString()} <span>cal</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section
        className="panel form-panel routine-panel"
        aria-labelledby="routine-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">PLANIFICACIÓN</p>
            <h2 id="routine-title">Rutina semanal</h2>
          </div>
          <span className="exercise-count">{activeUser.routine.name}</span>
        </div>
        <div className="routine-layout">
          <Formik<RoutineValues>
            initialValues={{
              routineName: activeUser.routine.name,
              weekday: "",
              routineExercise: "",
            }}
            validate={(values: RoutineValues) => {
              const errors: FormikErrors<RoutineValues> = {};
              if (!values.routineName.trim()) {
                errors.routineName = "Ingresa un nombre para la rutina.";
              }
              if (!weekdays.some((day: Weekday) => day === values.weekday)) {
                errors.weekday = "Selecciona un día de la semana.";
              }
              if (
                !exercises.some(
                  (exercise: Exercise) =>
                    exercise.id === values.routineExercise,
                )
              ) {
                errors.routineExercise = "Selecciona un ejercicio.";
              }
              return errors;
            }}
            onSubmit={handleRoutineSubmit}
          >
            {({ isValid, status, submitCount }: FormikProps<RoutineValues>) => (
              <Form className="input-form routine-form">
                <label>
                  Nombre de la rutina
                  <Field type="text" name="routineName" required />
                </label>
                <div className="form-row">
                  <label>
                    Día de la semana
                    <Field as="select" name="weekday" required>
                      <option value="" disabled>
                        Selecciona un día
                      </option>
                      {weekdays.map((weekday: Weekday) => (
                        <option key={weekday} value={weekday}>
                          {weekdayNames[weekday]}
                        </option>
                      ))}
                    </Field>
                  </label>
                  <label>
                    Ejercicio
                    <Field as="select" name="routineExercise" required>
                      <option value="" disabled>
                        Selecciona un ejercicio
                      </option>
                      {exercises.map((exercise: Exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                          {exercise.name}
                        </option>
                      ))}
                    </Field>
                  </label>
                </div>
                {submitCount > 0 && !isValid && (
                  <p className="error-message">
                    Completa el nombre, el día y el ejercicio de la rutina.
                  </p>
                )}
                {status && <p className="error-message">{status}</p>}
                <button
                  type="submit"
                  className="secondary-button"
                  disabled={exercises.length === 0}
                >
                  + Agregar a la rutina
                </button>
              </Form>
            )}
          </Formik>

          <div className="weekly-preview">
            <p className="preview-title">{activeUser.routine.name}</p>
            {activeUser.routine.entries.length === 0 ? (
              <p className="empty-routine">
                Aún no agregas ejercicios a tu plan.
              </p>
            ) : (
              <ul className="routine-list">
                {activeUser.routine.entries.map(
                  (entry: RoutineEntry, index: number) => (
                    <li key={`${entry.weekday}-${entry.exercise.id}-${index}`}>
                      <span>{weekdayNames[entry.weekday]}</span>
                      <strong>{entry.exercise.name}</strong>
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="summary-section" aria-labelledby="summary-title">
        <div className="section-heading summary-heading">
          <div>
            <p className="eyebrow">DE UN VISTAZO</p>
            <h2 id="summary-title">Resumen comparativo</h2>
          </div>
        </div>
        <div className="summary-grid">
          <article className="panel summary-card">
            <span className="summary-icon duration-icon" aria-hidden="true">
              ◷
            </span>
            <div>
              <p className="summary-label">Mayor duración</p>
              <h3>{longestExercise?.name ?? "Sin ejercicios"}</h3>
              <p className="summary-value">
                {longestExercise?.durationMinutes ?? 0} <span>minutos</span>
              </p>
            </div>
          </article>
          <article className="panel summary-card">
            <span className="summary-icon calories-icon" aria-hidden="true">
              ✦
            </span>
            <div>
              <p className="summary-label">Más calorías</p>
              <h3>{mostCaloriesExercise?.name ?? "Sin ejercicios"}</h3>
              <p className="summary-value">
                {mostCaloriesExercise
                  ? (
                      mostCaloriesExercise.durationMinutes *
                      mostCaloriesExercise.caloriesPerMinute
                    ).toLocaleString()
                  : 0}{" "}
                <span>cal</span>
              </p>
            </div>
          </article>
        </div>
      </section>

      {isExerciseModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(event: MouseEvent<HTMLDivElement>): void => {
            if (event.target === event.currentTarget) {
              setIsExerciseModalOpen(false);
            }
          }}
          onKeyDown={handleBackdropKeyDown}
        >
          <section
            className="panel exercise-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exercise-form-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">NUEVA ACTIVIDAD</p>
                <h2 id="exercise-form-title">Registrar ejercicio</h2>
              </div>
              <button
                className="modal-close"
                type="button"
                aria-label="Cerrar"
                onClick={(): void => setIsExerciseModalOpen(false)}
              >
                ×
              </button>
            </div>
            <Formik<ExerciseValues>
              initialValues={{
                exerciseName: "",
                duration: "",
                caloriesPerMinute: "",
                distance: "",
              }}
              validate={(values: ExerciseValues) => {
                const errors: FormikErrors<ExerciseValues> = {};
                const duration = Number(values.duration);
                const caloriesPerMinute = Number(values.caloriesPerMinute);
                const distance = values.distance.trim();
                const distanceKm = Number(distance);

                if (!values.exerciseName.trim()) {
                  errors.exerciseName = "Ingresa el nombre del ejercicio.";
                }
                if (
                  !values.duration ||
                  !Number.isFinite(duration) ||
                  duration <= 0
                ) {
                  errors.duration = "Ingresa una duración válida.";
                }
                if (
                  !values.caloriesPerMinute ||
                  !Number.isFinite(caloriesPerMinute) ||
                  caloriesPerMinute < 0
                ) {
                  errors.caloriesPerMinute = "Ingresa las calorías por minuto.";
                }
                if (
                  distance !== "" &&
                  (!Number.isFinite(distanceKm) || distanceKm < 0)
                ) {
                  errors.distance = "Ingresa una distancia válida.";
                }
                return errors;
              }}
              onSubmit={handleExerciseSubmit}
            >
              {({ isValid, submitCount }: FormikProps<ExerciseValues>) => (
                <Form className="input-form">
                  <label>
                    Nombre del ejercicio
                    <Field
                      type="text"
                      name="exerciseName"
                      placeholder="Ej. Running"
                      required
                      autoFocus
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      Duración
                      <span className="input-with-unit">
                        <Field
                          type="number"
                          name="duration"
                          min="1"
                          step="1"
                          placeholder="45"
                          required
                        />
                        <span>min</span>
                      </span>
                    </label>
                    <label>
                      Calorías por minuto
                      <span className="input-with-unit">
                        <Field
                          type="number"
                          name="caloriesPerMinute"
                          min="0"
                          step="0.1"
                          placeholder="10.4"
                          required
                        />
                        <span>cal</span>
                      </span>
                    </label>
                  </div>
                  <label>
                    Distancia <span className="optional-label">Opcional</span>
                    <span className="input-with-unit">
                      <Field
                        type="number"
                        name="distance"
                        min="0"
                        step="0.1"
                        placeholder="Ej. 5.2"
                      />
                      <span>km</span>
                    </span>
                  </label>
                  {submitCount > 0 && !isValid && (
                    <p className="error-message">
                      Revisa los datos del ejercicio antes de guardarlo.
                    </p>
                  )}
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={(): void => setIsExerciseModalOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="primary-button">
                      Guardar ejercicio
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
