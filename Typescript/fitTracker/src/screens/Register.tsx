import { Field, Form, Formik } from "formik";
import type { FormikHelpers, FormikProps } from "formik";
import type { SetView } from "../App";
import { experienceLevels } from "../data/experienceLevel";
import type { ExperienceLevel } from "../data/experienceLevel";
import { getUsers, registerUser, setCurrentUser } from "../data/store";
import type { AuthUser } from "../types/domain";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  age: string;
  level: string;
}

interface RegisterProps {
  setView: SetView;
  onRegister: () => void;
}

function Register({ setView, onRegister }: RegisterProps) {
  return (
    <div className="form-panel-page">
      <section
        className="panel form-panel"
        aria-labelledby="profile-form-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">TU CUENTA</p>
            <h2 id="profile-form-title">Registrar perfil</h2>
          </div>
        </div>
        <Formik<RegisterValues>
          initialValues={{
            name: "",
            email: "",
            password: "",
            age: "",
            level: "",
          }}
          validate={(values: RegisterValues) => {
            const errors: Partial<Record<keyof RegisterValues, string>> = {};
            if (!values.name.trim()) errors.name = "Ingresa tu nombre.";
            if (!values.email.trim()) {
              errors.email = "Ingresa tu correo electrónico.";
            }
            if (values.password.length < 3) {
              errors.password = "La contraseña debe tener al menos 3 caracteres.";
            }
            if (!Number.isFinite(Number(values.age)) || Number(values.age) <= 0) {
              errors.age = "Ingresa una edad válida.";
            }
            if (
              !experienceLevels.some(
                (level: ExperienceLevel) => level === values.level,
              )
            ) {
              errors.level = "Selecciona un nivel de experiencia válido.";
            }
            return errors;
          }}
          onSubmit={(
            values: RegisterValues,
            actions: FormikHelpers<RegisterValues>,
          ) => {
            const users = getUsers();
            const email = values.email.trim();

            if (
              users.some(
                (user: AuthUser) =>
                  user.email.toLowerCase() === email.toLowerCase(),
              )
            ) {
              actions.setStatus("Correo electrónico ya registrado");
              return;
            }

            const selectedLevel = experienceLevels.find(
              (option: ExperienceLevel) => option === values.level,
            );
            if (!selectedLevel) {
              actions.setStatus("Selecciona un nivel de experiencia válido");
              return;
            }

            const newUser: AuthUser = {
              id:
                users.reduce(
                  (highestId: number, user: AuthUser) =>
                    Math.max(highestId, user.id),
                  0,
                ) + 1,
              name: values.name.trim(),
              email,
              password: values.password,
              age: Number(values.age),
              level: selectedLevel,
              routine: {
                name: "Mi semana activa",
                entries: [],
              },
            };

            registerUser(newUser);
            setCurrentUser(newUser);
            onRegister();
          }}
        >
          {({ errors, status, touched }: FormikProps<RegisterValues>) => (
            <Form className="input-form">
              <label>
                Nombre completo
                <Field
                  type="text"
                  name="name"
                  placeholder="Ej. María López"
                  required
                />
              </label>
              {touched.name && errors.name && (
                <p className="error-message">{errors.name}</p>
              )}
              <label>
                Correo electrónico
                <Field
                  type="email"
                  name="email"
                  placeholder="Ej. you@test.com"
                  required
                />
              </label>
              {touched.email && errors.email && (
                <p className="error-message">{errors.email}</p>
              )}
              <label>
                Contraseña
                <Field
                  type="password"
                  name="password"
                  placeholder="********"
                  minLength={3}
                  required
                />
              </label>
              {touched.password && errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
              <div className="form-row">
                <label>
                  Edad
                  <Field
                    type="number"
                    name="age"
                    min="1"
                    placeholder="Ej. 28"
                    required
                  />
                </label>
                <label>
                  Nivel de experiencia
                  <Field as="select" name="level" required>
                    <option value="" disabled>
                      Selecciona tu nivel
                    </option>
                    {experienceLevels.map((level: ExperienceLevel) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </Field>
                </label>
              </div>
              {touched.age && errors.age && (
                <p className="error-message">{errors.age}</p>
              )}
              {touched.level && errors.level && (
                <p className="error-message">{errors.level}</p>
              )}
              {status && <p className="error-message">{status}</p>}
              <button type="submit" className="primary-button">
                Guardar perfil
              </button>
              <p className="auth-footer-text">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={(): void => setView("login")}
                >
                  Iniciar sesión
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default Register;
