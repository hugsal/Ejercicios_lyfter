import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginStore } from "../store/loginStore";
import apiServices from "../api/apiServices";

function Login() {
  const navigate = useNavigate();
  const login = useLoginStore((state) => state.login);

  const onSubmit = async (values) => {
    const { userName, password } = values;
    try {
      const data = await apiServices.loginUser(userName, password);
      const { access_token, refresh_token } = data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      const { user } = await apiServices.getMe();
      const { role, userName: name } = user;
      login({ role, userName: name });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/productos");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>

      <Formik
        initialValues={{
          userName: "",
          password: "",
        }}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          userName: Yup.string().required("El usuario es obligatorio"),
          password: Yup.string()
            .required("La contraseña es obligatoria")
            .min(3, "La contraseña debe tener al menos 3 caracteres"),
        })}
      >
        <Form id="loginForm">
          <div className="form-group">
            <label htmlFor="userName">Usuario</label>
            <Field
              type="text"
              id="userName"
              name="userName"
              placeholder="Ingresa tu usuario"
            />
            <ErrorMessage name="userName" component="p" />
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

          <button type="submit" className="btn-primary">
            Iniciar Sesión
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
