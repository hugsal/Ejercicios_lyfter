import { Field, Form, Formik } from "formik";
import type { FormikHelpers, FormikProps } from "formik";
import type { SetView } from "../App";
import { authenticateUser, setCurrentUser } from "../data/store";

interface LoginValues {
  email: string;
  password: string;
}

interface LoginProps {
  setView: SetView;
  onLogin: () => void;
}

function Login({ setView, onLogin }: LoginProps) {
  return (
    <div className="form-container">
      <section className="panel form-panel">
        <h2>Iniciar Sesión</h2>
        <Formik<LoginValues>
          initialValues={{ email: "", password: "" }}
          validate={(values: LoginValues) => {
            const errors: Partial<Record<keyof LoginValues, string>> = {};
            if (!values.email.trim()) errors.email = "Ingresa tu correo electrónico.";
            if (!values.password) errors.password = "Ingresa tu contraseña.";
            return errors;
          }}
          onSubmit={(values: LoginValues, actions: FormikHelpers<LoginValues>) => {
            const user = authenticateUser(values.email.trim(), values.password);

            if (!user) {
              actions.setStatus("Correo electrónico o contraseña incorrectos");
              return;
            }

            setCurrentUser(user);
            onLogin();
          }}
        >
          {({ errors, status, touched }: FormikProps<LoginValues>) => (
            <Form className="input-form">
              <label>
                Correo electrónico
                <Field
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo electrónico"
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
                  placeholder="••••••••"
                  required
                  minLength={3}
                />
              </label>
              {touched.password && errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
              {status && <p className="error-message">{status}</p>}
              <button type="submit" className="primary-button">
                Ingresar
              </button>
            </Form>
          )}
        </Formik>

        <p className="auth-footer-text">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            className="link-button"
            onClick={(): void => setView("register")}
          >
            Regístrate
          </button>
        </p>
      </section>
    </div>
  );
}

export default Login;
