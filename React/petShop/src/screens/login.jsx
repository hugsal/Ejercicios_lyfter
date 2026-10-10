function Login() {
  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form id="loginForm">
        <div className="form-group">
          <label for="userName">Usuario</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Ingresa tu usuario"
            required
          />
        </div>

        <div className="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Iniciar Sesión
        </button>
      </form>
      <div id="login-message" className="message"></div>

      <div className="form-footer">
        <p>
          ¿No tienes cuenta? <a href="register.html">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
