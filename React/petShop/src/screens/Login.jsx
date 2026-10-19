import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginStore } from "../store/loginStore";
import apiServices from "../api/apiServices";
import { useState } from "react";

function Login({ setView }) {
  const [error, setError] = useState(null);
  const login = useLoginStore((state) => state.login);

  const onSubmit = async (values) => {
    console.log(values);
    const { email, password } = values;
    try {
      const data = await apiServices.loginUser(email, password);
      const { access_token, refresh_token } = data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      const { user } = await apiServices.getMe();
      localStorage.setItem("user", JSON.stringify(user));
      const { role, userName: name } = user;
      login({ role, userName: name });
      setView("products");
    } catch (error) {
      setError("email o contraseña incorrectos");
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("El email debe ser válido")
            .required("El email es obligatorio"),
          password: Yup.string()
            .required("La contraseña es obligatoria")
            .min(3, "La contraseña debe tener al menos 3 caracteres"),
        })}
      >
        <Form id="loginForm">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo electrónico"
            />
            <ErrorMessage name="email" component="p" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
            />
            <ErrorMessage name="password" component="p" />
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-primary">
            Ingresar
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
