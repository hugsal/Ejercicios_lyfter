function Register() {
  return (
    <div className="form-container">
      <h2>Crear Cuenta</h2>
      <form id="registerForm">
        <div className="form-group">
          <label for="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tu nombre"
            required
            minlength="3"
          />
        </div>

        <div className="form-group">
          <label for="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="form-group hidden" id="role-group">
          <label for="role">Rol</label>
          <select id="role" name="role">
            <option value="" disabled selected>
              Selecciona un rol
            </option>
            <option value="client">Usuario / Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="form-group">
          <label for="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="usuario123"
            required
            minlength="3"
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
            minlength="6"
          />
        </div>
        <div id="register-message" className="message"></div>

        <button type="submit" className="btn-primary">
          Registrarse
        </button>
      </form>

      <div className="form-footer">
        <p>
          ¿Ya tienes una cuenta? <a href="login.html">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
